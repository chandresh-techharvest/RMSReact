import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function RentTransaction() {
  const url = new URLSearchParams(window.location.search);

  const id = url.get("Id");

  const navigate = useNavigate();

  const { whichroute } = useParams();

  const [formData, setFormData] = useState({
    RentFrom: "",
    RentTo: "",
    propertyMaster: "",
    ownerMasters: "",
    rentMaster: "",
    paymentMode: "",
    paymentThreshold: "",
  });

  const [data, setData] = useState([]);

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
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

          setFormData({
            ...formData,
            rentMaster: response.data._id,
            propertyMaster: response.data.propertymaster._id,
            ownerMasters: response.data.ownerMasters._id,
          });
        }
        console.log("formData  ", formData);
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
    try {
      const res = await axios.post(
        "https://rsmapi.vercel.app/rentTranscation",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage({
        ...message,
        success: res.data.message,
      });
    } catch (error) {
      setMessage({
        ...message,
        danger: `${error.message}, While saving RentRecipt`,
      });
    } finally {
      setFormData({
        RentFrom: "",
        RentTo: "",
        propertyMaster: data.propertymaster._id,
        ownerMasters: data.ownerMasters._id,
        rentMaster: data._id,
        paymentMode: "",
        paymentThreshold: "",
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
                data-errors="Rent From."
                value={formData.RentFrom}
                onChange={handleData}
                required=""
              />
              <div className="help-block with-errors"></div>
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
                data-errors="Please Enter Name."
                value={formData.RentTo}
                onChange={handleData}
                required=""
              />
              <div className="help-block with-errors"></div>
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
                data-errors="paymentThreshold."
                value={formData.paymentThreshold}
                onChange={handleData}
                required=""
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>MonthlyRent*</label>
              <input
                type="text"
                className="form-control"
                value={data.monthlyRent && data.monthlyRent.$numberDecimal}
                onChange={handleData}
                disabled
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Pincode*</label>
              <input
                type="text"
                className="form-control"
                value={
                  data.propertymaster &&
                  data.propertymaster.pincode.$numberDecimal
                }
                onChange={handleData}
                required=""
                disabled
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address1*</label>
              <input
                type="text"
                className="form-control"
                value={data.propertymaster && data.propertymaster.address1}
                onChange={handleData}
                disabled
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address2*</label>
              <input
                type="text"
                className="form-control"
                value={data.propertymaster && data.propertymaster.address2}
                onChange={handleData}
                disabled
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>City*</label>
              <input
                type="text"
                className="form-control"
                value={data.propertymaster && data.propertymaster.city}
                onChange={handleData}
                disabled
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>State*</label>
              <input
                type="text"
                className="form-control"
                value={data.propertymaster && data.propertymaster.state}
                onChange={handleData}
                disabled
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>OwnerMaster*</label>
              <input
                type="text"
                className="form-control"
                name="ownermaster"
                value={data.ownerMasters && data.ownerMasters.name}
                onChange={handleData}
                disabled
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>PaymentMode*</label>
              <select
                className="form-control"
                name="paymentMode"
                value={formData.paymentMode}
                required
                onChange={handleData}
              >
                <option value="Select">Select</option>
                <option value="cash">Cash</option>
                <option value="online payment">Online Payment</option>
              </select>
              <div className="help-block with-errors"></div>
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
        <div class="alert alert-success" role="alert">
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
