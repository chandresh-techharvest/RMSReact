import React, { useState, useEffect } from "react";
import axios from "axios";

function AddPropertyMaster() {
  const ownerId = localStorage.getItem("userId"); // Changed from ownerId to userId
  const tenantId = localStorage.getItem("tenant_id"); // Get tenant_id from localStorage

  const [formdata, setFormData] = useState({
    pincode: "",
    address2: "",
    city: "",
    address1: "",
    state: "",
    ownerMasters: ownerId,
    tenant_id: tenantId, // Add tenant_id to form data
  });

  // Update form data when ownerId or tenantId changes
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      ownerMasters: ownerId,
      tenant_id: tenantId
    }));
  }, [ownerId, tenantId]);

  const [message, setMessage] = useState({
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

    // Debug: Check if token exists
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    // Debug: Check if ownerId exists
    console.log("OwnerId from localStorage:", ownerId);
    console.log("TenantId from localStorage:", tenantId);

    // Make sure we're using the latest ownerId and tenantId
    const currentFormData = {
      ...formdata,
      ownerMasters: ownerId,
      tenant_id: tenantId
    };

    // Debug: Check form data
    console.log("Form data being sent:", currentFormData);

    try {
      const res = await axios.post(
        // "https://rsmapi.vercel.app/propertymaster",
        "https://rsmapi.vercel.app/propertymaster",
        currentFormData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage({
        ...message,
        success: res.data.message,
      });
    } catch (error) {
      console.error("Error in property creation:", error);
      console.error("Error response:", error.response);
      setMessage({
        ...message,
        danger: "Error, While saving Property",
      });
    } finally {
      setFormData({
        pincode: "",
        address2: "",
        city: "",
        address1: "",
        state: "",
        ownerMasters: ownerId,
        tenant_id: tenantId,
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
      <form onSubmit={handleSubmit} data-toggle="validator">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Pincode"
                data-errors="Please Enter Pincode."
                name="pincode"
                value={formdata.pincode}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address1 *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address1"
                data-errors="Please Enter Address1."
                name="address1"
                value={formdata.address1}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address2 *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address2"
                data-errors="Please Enter Address2."
                name="address2"
                value={formdata.address2}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
                data-errors="Please Enter City."
                name="city"
                value={formdata.city}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter State"
                data-errors="Please Enter State."
                name="state"
                value={formdata.state}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add
        </button>
        <button type="reset" className="btn btn-danger">
          Reset
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

export default AddPropertyMaster;