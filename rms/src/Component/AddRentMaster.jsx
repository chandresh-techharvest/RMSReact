import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPropertyMaster, fetchClientMaster,
  selectAllClientMaster,
} from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router";
function AddRentMaster() {
  const ownerId = localStorage.getItem("userId"); // Changed from ownerId to userId
  const tenantId = localStorage.getItem("tenant_id"); // Get tenant_id from localStorage

  // Get ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("Id");

  const [formdata, setFormData] = useState({
    electricityMeterNumber: "",
    clientMaster: "",
    incrementPercentage: "",
    securityDepositAmount: "",
    monthlyRent: "",
    paymentDate: "",
    paymentMode: "",
    incrementSchedule: "",
    propertymaster: id || "",
    ownerMasters: ownerId || "",
    tenant_id: tenantId || "", // Add tenant_id to form data
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const propertymaster = useSelector(selectAllPropertyMaster);

  useEffect(() => {
    dispatch(fetchClientMaster())
  }, [])

  const clientMaster = useSelector(selectAllClientMaster);

  // Update form data when ownerId or tenantId changes
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      ownerMasters: ownerId || "",
      tenant_id: tenantId || ""
    }));
  }, [ownerId, tenantId]);

  const [message, setState] = useState({
    success: "",
    danger: "",
  });

  const handleData = (e) => {
    e.preventDefault();

    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formda ", formdata);

    // Make sure we're using the latest ownerId and tenantId
    const currentFormData = {
      ...formdata,
      ownerMasters: ownerId,
      tenant_id: tenantId
    };

    // Convert string values to Decimal128 compatible format
    // For Mongoose Decimal128, we need to send strings that can be converted
    const processedFormData = {
      ...currentFormData,
      incrementPercentage: currentFormData.incrementPercentage ? currentFormData.incrementPercentage.toString() : "0",
      securityDepositAmount: currentFormData.securityDepositAmount ? currentFormData.securityDepositAmount.toString() : "0",
      monthlyRent: currentFormData.monthlyRent ? currentFormData.monthlyRent.toString() : "0",
      incrementSchedule: currentFormData.incrementSchedule ? currentFormData.incrementSchedule.toString() : "0"
    };

    // Get token directly before making the request
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    console.log("Form data being sent:", processedFormData);

    try {
      const res = await axios.post(
        // "https://rsmapi.vercel.app/rentmaster",
        "https://rsmapi.vercel.app/rentmaster",
        processedFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setState({
        ...message,
        success: res.data.message,
      });
    } catch (error) {
      console.error("Error in rent creation:", error);
      console.error("Error response:", error.response);
      setState({
        ...message,
        danger: `${error.message}, While saving RentMaster`,
      });
    } finally {
      setFormData({
        electricityMeterNumber: "",
        clientMaster: "",
        incrementPercentage: "",
        securityDepositAmount: "",
        monthlyRent: "",
        incrementSchedule: "",
        propertymaster: id || "",
        ownerMasters: ownerId || "",
        tenant_id: tenantId || "",
      });

      setTimeout(
        () =>
          setState({
            success: "",
            danger: "",
          }),
        3000
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Electricity Meter Number *</label>
              <input
                type="Number"
                className="form-control"
                placeholder="Enter Electricity Meter Number"
                name="electricityMeterNumber"
                value={formdata.electricityMeterNumber}
                onChange={handleData}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Select Client *</label>
              <select
                className="form-control"
                name="clientMaster"
                value={formdata.clientMaster}
                onChange={handleData}
                required
              >
                <option value="">Select</option>
                {clientMaster.map((item, index) => {
                  // Check if item is valid before processing
                  if (!item) return null;

                  return (
                    <option value={item._id} key={index} required>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Increment Percentage *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Increment Percentage"
                name="incrementPercentage"
                value={formdata.incrementPercentage}
                onChange={handleData}
                required
                min="1"
                max="3"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Security Deposit Amount *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Security Deposit Amount"
                name="securityDepositAmount"
                value={formdata.securityDepositAmount}
                onChange={handleData}
                required
                min="1"
                max="10"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Monthly Rent *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Monthly Rent"
                name="monthlyRent"
                value={formdata.monthlyRent}
                onChange={handleData}
                required
                min="1"
                max="10"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Increment Schedule *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Increment Schedule"
                name="incrementSchedule"
                value={formdata.incrementSchedule}
                onChange={handleData}
                required
                min="1"
                max="10"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>PaymentDate (No of Days) *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter No of Days"
                name="paymentDate"
                value={formdata.paymentDate}
                onChange={handleData}
                required
              />
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
                required
              >
                <option value="">Select</option>
                {propertymaster &&
                  propertymaster.map((item, index) => {
                    // Check if item is valid before processing
                    if (!item) return null;

                    return item._id === id ? (
                      <option
                        key={index}
                        value={item._id}
                      >
                        {item.pincode && item.pincode.$numberDecimal ? item.pincode.$numberDecimal : item.pincode} - {item.address2} - {item.address1} - {item.city}
                      </option>
                    ) : (
                      <option key={index} value={item._id}>
                        {item.pincode && item.pincode.$numberDecimal ? item.pincode.$numberDecimal : item.pincode} - {item.address2} - {item.address1} - {item.city}
                      </option>
                    )
                  })}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>PaymentMode *</label>
              <select className="form-control" name="paymentMode" value={formdata.paymentMode} onChange={handleData} required>
                <option value="">Select</option>
                <option value='cash'>Cash</option>
                <option value='Online_Payment'>Online Payment</option>
                <option value='Any'>Any</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add
        </button>
        <button
          className="btn btn-danger mr-2"
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

export default AddRentMaster;
