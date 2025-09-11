import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchRentMaster, selectAllRentMaster } from "../Redux/Slice/userSlice";
import "../../src/assets/css/invoice.css"

function RentTransaction() {
  const ownerId = localStorage.getItem("userId"); // Changed from ownerId to userId
  const url = new URLSearchParams(window.location.search);

  const id = url.get("Id");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allRentMasters = useSelector(selectAllRentMaster);
  const rentMasters = allRentMasters.filter(
    (item) => item?.propertymaster && item?.propertymaster._id === id
  );

  const { whichroute } = useParams();

  const now = new Date();

  const date = new Date(now.getFullYear(), now.getMonth(), 1);

  date.setDate(date.getDate() + 5);
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 2).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split("");
  var ddChars = dd.split("");
  var newClosingDate = rentMasters[0] && rentMasters[0]?.paymentDate ||
    (yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0]));

  const [formData, setFormData] = useState({
    RentFrom: "",
    RentTo: "",
    paymentThreshold: "",
    paymentMode: "",
    propertyMaster: "",
    rentMaster: "",
    clientMaster: '',
    ownerMasters: ownerId,
  });

  const [data, setData] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchRentMaster());
  }, [dispatch]);

  useEffect(() => {
    if (rentMasters.length > 0 && rentMasters[0] && !initialized) {
      console.log("Initializing form data with:", rentMasters[0]);
      setFormData({
        RentFrom: new Date(now.getFullYear(), now.getMonth(), 1)
          .toLocaleDateString("en-GB")
          .replaceAll("/", "-")
          .split("-")
          .reverse()
          .join("-"),
        RentTo: new Date(now.getFullYear(), now.getMonth() + 1, 0)
          .toLocaleDateString("en-GB")
          .replaceAll("/", "-")
          .split("-")
          .reverse()
          .join("-"),
        rentMaster: rentMasters[0] ? rentMasters[0]._id : "",
        propertyMaster: rentMasters[0] && rentMasters[0]?.propertymaster ? rentMasters[0]?.propertymaster._id : "",
        ownerMasters: ownerId,
        paymentMode: "",
        paymentThreshold: newClosingDate,
        clientMaster: rentMasters[0] && rentMasters[0]?.clientMaster ? rentMasters[0]?.clientMaster._id : "",
      });
      setInitialized(true);
    }
  }, [allRentMasters.length, id, initialized]);

  useEffect(() => {
    if (!id || !whichroute) return;

    const getData = async () => {
      try {
        const response = await axios.get(
          `https://rsmapi.vercel.app/${whichroute}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          setData(await response.data);
        }
      } catch (error) {
        setMessage({
          ...message,
          danger: `${error.message}, While retriving RentMaster`,
        });
      } finally {
        setTimeout(
          () =>
            setMessage({
              success: "",
              danger: "",
            }),
          3000
        );
      }
    };
    getData();
  }, [id, whichroute]);

  const handleData = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before submitting
    if (!formData.paymentMode) {
      setMessage({
        ...message,
        danger: "Please select a payment mode",
      });
      return;
    }

    if (!formData.clientMaster || !formData.rentMaster || !formData.propertyMaster) {
      setMessage({
        ...message,
        danger: "Missing required data. Please ensure rent agreement has proper client and property information.",
      });
      return;
    }

    // Prepare data with proper date formatting
    const submitData = {
      ...formData,
      RentFrom: formData.RentFrom ? new Date(formData.RentFrom) : new Date(),
      RentTo: formData.RentTo ? new Date(formData.RentTo) : new Date(),
      paymentThreshold: formData.paymentThreshold ? new Date(formData.paymentThreshold) : new Date(),
      tenant_id: localStorage.getItem("tenant_id") // Add tenant_id
    };

    try {
      console.log("=== DEBUGGING RENT TRANSACTION ===");
      console.log("User role:", localStorage.getItem("role"));
      console.log("Owner ID:", localStorage.getItem("userId"));
      console.log("Form Data being sent:", submitData);
      console.log("Rent Masters array:", rentMasters);

      const res = await axios.post(
        "https://rsmapi.vercel.app/rentTranscation",
        submitData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage({
        ...message,
        success: res.data.message,
      });
    } catch (error) {
      console.error("=== ERROR DETAILS ===");
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      setMessage({
        ...message,
        danger: `${error.response?.data?.message || error.message}, While saving RentRecipt`,
      });
    } finally {
      setFormData({
        RentFrom: new Date(now.getFullYear(), now.getMonth(), 1)
          .toLocaleDateString("en-GB")
          .replaceAll("/", "-")
          .split("-")
          .reverse()
          .join("-"),
        RentTo: new Date(now.getFullYear(), now.getMonth() + 1, 0)
          .toLocaleDateString("en-GB")
          .replaceAll("/", "-")
          .split("-")
          .reverse()
          .join("-"),
        rentMaster: rentMasters[0] ? rentMasters[0]._id : "",
        propertyMaster: rentMasters[0] && rentMasters[0]?.propertymaster ? rentMasters[0]?.propertymaster._id : "",
        ownerMasters: ownerId,
        paymentMode: "",
        paymentThreshold: newClosingDate,
        clientMaster: rentMasters[0] && rentMasters[0]?.clientMaster ? rentMasters[0]?.clientMaster._id : "",
      });

      setTimeout(
        () =>
          setMessage({
            success: "",
            danger: "",
          }),
        3000
      );
    }
  };
  return (
    <>
      <section className="wrapper-invoice">
        <div className="invoice">
          <div className="invoice-information">
            <p>
              <b>Monthly Rent</b> :{" "}
              {rentMasters[0] && rentMasters[0].monthlyRent && rentMasters[0].monthlyRent.$numberDecimal ? rentMasters[0].monthlyRent.$numberDecimal : rentMasters[0]?.monthlyRent}
            </p>
            <p>
              <b>Client</b> :{" "}
              {rentMasters[0] && rentMasters[0].clientMaster && rentMasters[0].clientMaster.name}
            </p>
            <p>
              <b>Owner </b> :{" "}
              {rentMasters[0] && rentMasters[0].ownerMasters && rentMasters[0].ownerMasters.name}
            </p>
          </div>

          <div className="invoice-logo-brand">
            <img src="./assets/image/tampsh.png" alt="" />
          </div>

          <div className="invoice-head">
            <div className="head client-info">
              <p><b>Pincode</b> </p>
              <p>
                {rentMasters[0] && rentMasters[0].propertymaster &&
                  (rentMasters[0].propertymaster.pincode && rentMasters[0].propertymaster.pincode.$numberDecimal ?
                    rentMasters[0].propertymaster.pincode.$numberDecimal :
                    rentMasters[0].propertymaster.pincode)}
              </p>
              <p><b>Address1 </b></p>
              <p>{rentMasters[0] && rentMasters[0].propertymaster && rentMasters[0].propertymaster.address1}</p>
              <p><b>Address2</b></p>
              <p>{rentMasters[0] && rentMasters[0].propertymaster && rentMasters[0].propertymaster.address2}</p>
            </div>
            <div className="head client-data">
              <p><b>City</b></p>
              <p>{rentMasters[0] && rentMasters[0].propertymaster && rentMasters[0].propertymaster.city}</p>
              <p><b>State</b></p>
              <p>{rentMasters[0] && rentMasters[0].propertymaster && rentMasters[0].propertymaster.state}</p>
            </div>
          </div>
          <div className="invoice-body">
            <form onSubmit={handleSubmit}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Transcation Fields</th>
                    <th>Dates</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rent From</td>
                    <td>{formData.RentFrom}</td>
                  </tr>
                  <tr>
                    <td>Rent To</td>
                    <td>{formData.RentTo}</td>
                  </tr>
                  <tr>
                    <td>Payment Threshold</td>
                    <td>{formData.paymentThreshold}</td>
                  </tr>
                  <tr>
                    <td>Payment Mode</td>
                    <td>
                      <select
                        className="form-control"
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleData}
                        required
                      >
                        <option value="">Select Payment Mode</option>
                        <option value="cash">Cash</option>
                        <option value="Online_Payment">Online Payment</option>
                        <option value="Any">Any</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
                <button type="submit" className="btn btn-primary mr-2 mt-3">
                  Add
                </button>
                <button
                  type="reset"
                  className="btn btn-danger mt-3"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </table>
            </form>
          </div>
        </div>
        {message.success && (
          <div className="alert alert-success mt-3" role="alert">
            {message.success}
          </div>
        )}
        {message.danger && (
          <div className="alert alert-danger mt-3" role="alert">
            {message.danger}
          </div>
        )}
      </section>
    </>
  );
}

export default RentTransaction;
