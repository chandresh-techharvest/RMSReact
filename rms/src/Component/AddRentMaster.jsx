import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  selectAllPropertyMaster,
  selectAllClientMaster,
} from "../Redux/Slice/userSlice";
function AddRentMaster() {
  const ownerId = localStorage.getItem("ownerId");

  const [formdata, setformData] = useState({
    electricityMeterNumber: "",
    clientMaster: "",
    incrementPercentage: "",
    securityDepositAmount: "",
    monthlyRent: "",
    incrementSchedule: "",
    propertymaster: "",
    ownerMasters: ownerId,
  });
  const url = new URLSearchParams(window.location.search);
  const id = url.get("Id");

  const propertymaster = useSelector(selectAllPropertyMaster);

  const clientmaster = useSelector(selectAllClientMaster);

  const propertyData = propertymaster.filter(
    (item) => item.ownerMasters._id === ownerId
  );

  const clientData = clientmaster.filter(
    (item) => item.ownerMasters._id === ownerId
  );

  const [message, setMessage] = useState({
    success: "",

    danger: "",
  });

  const handleData = (e) => {
    e.preventDefault();

    setformData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://rsmapi.vercel.app/rentmaster",
        formdata,
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
        danger: `${error.message}, While saving RentMaster`,
      });
    } finally {
      setformData({
        electricityMeterNumber: "",
        clientMaster: "",
        incrementPercentage: "",
        securityDepositAmount: "",
        monthlyRent: "",
        incrementSchedule: "",
        propertymaster: "",
        ownerMasters: ownerId,
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
      <form onSubmit={handleSubmit} data-toggle="validator" novalidate="true">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Electricity Meter Number *</label>
              <input
                type="Number"
                className="form-control"
                placeholder="Enter Electricity Meter Number"
                name="electricityMeterNumber"
                data-errors="Please Enter ElectricityMeterNumber."
                value={formdata.electricityMeterNumber}
                onChange={handleData}
                required=""
                min="1"
                max="10"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Client Id *</label>
              <select
                className="form-control"
                name="clientMaster"
                value={formdata.clientMaster}
                onChange={handleData}
                required
              >
                <option value="">Select</option>
                {clientData.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Increment Percentage *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Increment Percentage"
                data-errors="Please Enter IncrementPercentage."
                name="incrementPercentage"
                value={formdata.incrementPercentage}
                onChange={handleData}
                required=""
                min="1"
                max="3"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Security Deposit Amount *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Security Deposit Amount"
                data-errors="Please Enter SecurityDepositAmount."
                name="securityDepositAmount"
                value={formdata.securityDepositAmount}
                onChange={handleData}
                required=""
                min="1"
                max="10"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Monthly Rent *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Monthly Rent"
                data-errors="Please Enter MonthlyRent."
                name="monthlyRent"
                value={formdata.monthlyRent}
                onChange={handleData}
                required=""
                min="1"
                max="10"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Increment Schedule *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Increment Schedule"
                data-errors="Please Enter IncrementSchedule."
                name="incrementSchedule"
                value={formdata.incrementSchedule}
                onChange={handleData}
                required=""
                min="1"
                max="10"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Select your property *</label>
              <select
                className="form-control"
                name="propertymaster"
                value={
                  id ? (formdata.propertymaster = id) : formdata.propertymaster
                }
                onChange={handleData}
              >
                <option value="">Select</option>
                {propertyData &&
                  propertyData.map((item, index) =>
                    item._id === id ? (
                      <option
                        key={index}
                        value={item._id}
                        selected="true"
                        disabled
                      >
                        {item.pincode.$numberDecimal} - {item.address2} - {item.address1} - {item.city}
                      </option>
                    ) : (
                      <>
                        <option key={index} value={item._id}>
                          {item.pincode.$numberDecimal} - {item.address2} - {item.address1} - {item.city}
                        </option> 
                      </>
                    )
                  )}
              </select>
              <div className="help-block with-errors"></div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add
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

export default AddRentMaster;
