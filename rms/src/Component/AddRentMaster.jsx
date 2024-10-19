import React, { useState, useEffect, useId } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CreatableSelect from 'react-select/creatable';
import ObjectId from 'bson-objectid'
import {
  selectAllPropertyMaster, fetchClientMaster,
  selectAllClientMaster,
} from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router";
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
  const [clientData, setclientData] = useState([])
  const url = new URLSearchParams(window.location.search);
  const id = url.get("Id");
  const dispatch = useDispatch()
  const Id = ObjectId()
  const navigate = useNavigate();
  const propertymaster = useSelector(selectAllPropertyMaster);

  useEffect(() => {
    dispatch(fetchClientMaster())
  }, [])

  const clientMaster = useSelector(selectAllClientMaster);

  useEffect(() => {
    const formattedData = clientMaster.map(item => ({
      label: item.name,
      value: item._id
    }))
    setclientData(formattedData)
  }, [fetchClientMaster])

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

  // const handleSelection = (e) => {
  //   if (e && e.__isNew__) {
  //     const newOption = { label: e.label, value: e.label };
  //     setclientData(prevData => [...prevData, newOption]);
  //     setformData({
  //       ...formdata,
  //       clientMaster: Id
  //     })
  //   }
  //   else {
  //     setformData({
  //       ...formdata,
  //       clientMaster: e?.value
  //     })
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formda ", formdata);

    try {
      // const res = await axios.post(
      //   "https://rsmapi.vercel.app/rentmaster",
      //   formdata,
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
      <form onSubmit={handleSubmit} >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>ElectricityMeterNumber *</label>
              <input
                type="Number"
                className="form-control"
                placeholder="Enter ElectricityMeterNumber"
                name="electricityMeterNumber"
                value={formdata.electricityMeterNumber}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Select Client *</label>
              {/* <CreatableSelect
                isClearable
                value={clientData.find(option => option.value === formdata.clientMaster) || null}
                onChange={handleSelection}
                options={clientData} required/> */}
              <select
                className="form-control"
                name="clientMaster"
                value={formdata.clientMaster}
                onChange={handleData}
                required
              >
                <option value="">Select</option>
                {clientMaster.map((item, index) => (
                  <option value={item._id} key={index} required>
                    {item.name}
                  </option>
                ))}
              </select>
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
                name="incrementPercentage"
                value={formdata.incrementPercentage}
                onChange={handleData}
                required
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
                name="securityDepositAmount"
                value={formdata.securityDepositAmount}
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
              <label>MonthlyRent *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter MonthlyRent"
                name="monthlyRent"
                value={formdata.monthlyRent}
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
              <label>IncrementSchedule *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter IncrementSchedule"
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
              <label>Select your property *</label>
              <select
                className="form-control"
                name="propertymaster"
                value={
                  id ? (formdata.propertymaster = id) : formdata.propertymaster
                }
                onChange={handleData}
                required
              >
                <option value="">Select</option>
                {propertymaster &&
                  propertymaster.map((item, index) =>
                    item._id === id ? (
                      <option
                        key={index}
                        value={item._id}
                        selected="true"
                        disabled
                      >
                        {item.pincode.$numberDecimal} - {item.address2}
                      </option>
                    ) : (
                      <>
                        <option key={index} value={item._id}>
                          {item.pincode.$numberDecimal} - {item.address2}
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
