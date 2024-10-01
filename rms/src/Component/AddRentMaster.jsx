import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAllPropertyMaster } from "../Redux/Slice/userSlice";
import { useParams } from "react-router";
function AddRentMaster() {
  const [formdata, setformData] = useState({
    electricityMeterNumber: "",
    clientId: "",
    incrementPercentage: "",
    securityDepositAmount: "",
    monthlyRent: "",
    incrementSchedule: "",
    propertymaster: "",
  });
  const url = new URLSearchParams(window.location.search)
  const id = url.get('Id')
  console.log(id);

  const propertymaster = useSelector(selectAllPropertyMaster);

  const propertyData = propertymaster.filter(
    (item) => item.ownerMasters._id === localStorage.getItem('ownerId')
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
        "https://rsmapi.vercel.app/ownermaster",
        formdata, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
      );

      setformData({
        electricityMeterNumber: "",
        clientId: "",
        incrementPercentage: "",
        securityDepositAmount: "",
        monthlyRent: "",
        incrementSchedule: "",
        propertymaster: "",
      });

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
              <label>ElectricityMeterNumber *</label>
              <input
                type="Number"
                className="form-control"
                placeholder="Enter ElectricityMeterNumber"
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
              <label>ClientId *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter ClientId"
                data-errors="Please Enter ClientId."
                name="clientId"
                value={formdata.clientId}
                onChange={handleData}
                required=""
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>IncrementPercentage *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter IncrementPercentage"
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
              <label>SecurityDepositAmount *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter SecurityDepositAmount"
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
              <label>MonthlyRent *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter MonthlyRent"
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
              <label>IncrementSchedule *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter IncrementSchedule"
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
                value={formdata.propertymaster}
                onChange={handleData}
              >
                {
                  propertyData && propertyData.map((item, index) => (
                    item._id === id ? (
                      <option key={index} value={item._id} selected='true' disabled>{item.pincode.$numberDecimal} - {item.address2}</option>
                    ) : (
                      <>
                        <option value="Select">Select</option>
                        <option key={index} value={item.id}>
                          {item.pincode.$numberDecimal} - {item.address2}
                        </option>
                      </>
                    )
                  ))
                }
                {/* <option value="Select">Select</option>
                {propertyData &&
                  propertyData.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.pincode.$numberDecimal} - {item.address2}
                    </option>
                  ))} */}
              </select>
              {/* <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone"
                            data-errors="Please Enter Phone."
                            name="propertymaster"
                            value={formdata.propertymaster}
                            onChange={handleData}
                            required=""
                          /> */}
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
