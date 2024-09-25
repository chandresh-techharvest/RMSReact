import axios from "axios";
import React, { useState } from "react";

function AddClientMaster() {
  const ownerId = localStorage.getItem("ownerId");

  const [formData, setformData] = useState({
    name: "",
    gender: "",
    address1: "",
    address2: "",
    phone: "",
    fatherName: "",
    ownerMasters: ownerId,
  });

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  const handleData = (e) => {
    e.preventDefault();
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://rsmapi.vercel.app/clientmaster",
        formData
      );
      setformData({
        name: "",
        gender: "",
        address1: "",
        address2: "",
        phone: "",
        fatherName: "",
      });

      setMessage({
        ...message,
        success: res.data.message,
      });
    } catch (error) {
      setMessage({
        ...message,
        danger: `${error.message}, While saving PropertyMaster`,
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
      <form onSubmit={handleSubmit} data-toggle="validator" noValidate="true">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                data-errors="Please Enter Name."
                value={formData.name}
                onChange={handleData}
                required=""
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Father Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Father Name"
                name="fatherName"
                data-errors="Please Enter Name."
                value={formData.fatherName}
                onChange={handleData}
                required=""
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Gender *</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleData}
              >
                <option value="Select">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <div className="help-block with-errors"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone"
                name="phone"
                data-errors="Please Enter Name."
                value={formData.phone}
                onChange={handleData}
                required=""
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Address 1 *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address 1"
                name="address1"
                data-errors="Please Enter Name."
                value={formData.address1}
                onChange={handleData}
                required=""
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Address 2 *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address 2"
                name="address2"
                data-errors="Please Enter Name."
                value={formData.address2}
                onChange={handleData}
                required=""
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

export default AddClientMaster;
