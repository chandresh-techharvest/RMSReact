import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchRentMaster, selectAllRentMaster } from "../Redux/Slice/userSlice";

function RentTransaction() {
  const ownerId = localStorage.getItem("ownerId");
  const url = new URLSearchParams(window.location.search);

  const id = url.get("Id");

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { whichroute } = useParams();

  const now = new Date();

  const date = new Date(now.getFullYear(), now.getMonth(), 1)

  date.setDate(date.getDate() + 5)
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 2).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');
  var newClosingDate = yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);

  const [formData, setFormData] = useState({

    RentFrom: '',
    RentTo: '',
    paymentThreshold: '',
    paymentMode: "",
    propertyMaster: "",
    rentMaster: "",
    ownerMasters: ownerId,
  });

  const [data, setData] = useState([]);

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  const rentMasters = useSelector(selectAllRentMaster).filter(item => item?.propertymaster._id === id)

  useEffect(() => {
    dispatch(fetchRentMaster())
    setFormData({
      ...rentMasters[0],
      RentFrom: new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString('en-GB').replaceAll('/', "-").split("-").reverse().join("-"),
      RentTo: new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString('en-GB').replaceAll('/', "-").split("-").reverse().join("-"),
      paymentThreshold: newClosingDate,
      rentMaster: rentMasters[0]._id,
      propertyMaster: rentMasters[0]?.propertymaster._id
    })
    console.log("data ", formData);

  }, [])
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://rsmapi.vercel.app/${whichroute}/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         setData(await response.data);

  //         setFormData({
  //           ...formData,
  //           rentMaster: response.data._id,
  //           propertyMaster: response.data.propertymaster._id,
  //         });
  //       }
  //       console.log("formData  ", formData);
  //     } catch (error) {
  //       setMessage({
  //         ...message,
  //         danger: `${error.message}, While retriving RentMaster`,
  //       });
  //     } finally {
  //       setTimeout(
  //         () =>
  //           setMessage({
  //             success: "",
  //             danger: "",
  //           }),
  //         3000
  //       );
  //     }
  //   };
  //   getData();
  // }, [id, whichroute]);

  const handleData = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sub ", formData);

    try {
      // const res = await axios.post(
      //   "https://rsmapi.vercel.app/rentTranscation",
      //   formData,
      //   {
      //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      //   }
      // );
      // setMessage({
      //   ...message,
      //   success: res.data.message,
      // });
    } catch (error) {
      setMessage({
        ...message,
        danger: `${error.message}, While saving RentRecipt`,
      });
    } finally {
      setFormData({
        RentFrom: new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString('en-GB').replaceAll('/', "-").split("-").reverse().join("-"),
        RentTo: new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString('en-GB').replaceAll('/', "-").split("-").reverse().join("-"),
        rentMaster: rentMasters[0]._id,
        propertyMaster: rentMasters[0]?.propertymaster._id,
        ownerMasters: ownerId,
        paymentMode: "",
        paymentThreshold: newClosingDate,
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
      <form data-toggle="validator" noValidate="true" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Rent From*</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter Name"
                name="RentFrom"
                value={formData.RentFrom}
                onChange={handleData}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Rent To *</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter Rent To"
                name="RentTo"
                value={formData.RentTo}
                onChange={handleData}
                required=""
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Payment Threshold*</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter Payment Threshold"
                name="paymentThreshold"
                value={formData.paymentThreshold}
                onChange={handleData}
                required=""
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>MonthlyRent*</label>
              <input
                type="text"
                className="form-control"
                value={formData?.monthlyRent && formData?.monthlyRent?.$numberDecimal}
                onChange={handleData}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Pincode*</label>
              <input
                type="text"
                className="form-control"
                value={
                  formData?.propertymaster &&
                  formData?.propertymaster.pincode.$numberDecimal
                }
                onChange={handleData}
                required=""
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address1*</label>
              <input
                type="text"
                className="form-control"
                value={formData?.propertymaster && formData?.propertymaster.address1}
                onChange={handleData}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address2*</label>
              <input
                type="text"
                className="form-control"
                value={formData?.propertymaster && formData?.propertymaster.address2}
                onChange={handleData}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>City*</label>
              <input
                type="text"
                className="form-control"
                value={formData?.propertymaster && formData?.propertymaster.city}
                onChange={handleData}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>State*</label>
              <input
                type="text"
                className="form-control"
                value={formData?.propertymaster && formData?.propertymaster.state}
                onChange={handleData}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>OwnerMaster*</label>
              <input
                type="text"
                className="form-control"
                name="ownermaster"
                value={formData?.ownerMasters && formData?.ownerMasters.name}
                onChange={handleData}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>PaymentMode*</label>
              <select
                className="form-control"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleData}
                required
              >
                <option value="">Select</option>
                <option value="cash">Cash</option>
                <option value="online payment">Online Payment</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add
        </button>
        <button
          type="reset"
          className="btn btn-danger"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </form>
      {message.success && (
        <div class="alert alert-success mt-3" role="alert">
          {message.success}
        </div>
      )}
      {message.danger && (
        <div class="alert alert-danger mt-3" role="alert">
          {message.danger}
        </div>
      )}
    </>
  );
}

export default RentTransaction;
