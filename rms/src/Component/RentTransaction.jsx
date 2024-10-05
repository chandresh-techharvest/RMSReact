import React, { useEffect, useState } from 'react'
import {
  selectAllPropertyMaster,
} from "../Redux/Slice/userSlice";
import { useParams } from 'react-router'
import axios from 'axios';

function RentTransaction() {

  const [formData, setFormData] = useState({
    rentFrom: '',
    rentTo: '',
    pincode: "",
    address2: "",
    city: "",
    address1: "",
    state: "",
    propertymaster: "",
    ownerMasters: '',
    monthlyRent: "",
  })
  const url = new URLSearchParams(window.location.search)

  const id = url.get('Id')

  const { whichroute } = useParams();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get(`https://rsmapi.vercel.app/${whichroute}/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if (response.status == 200) {
          setFormData(await response.data)
        }
        console.log(response);
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
    }
    getData()
  }, [id, whichroute])

  const handleData = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.name
    })
  }
  return (
    <>
      <form data-toggle="validator" noValidate="true">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Rent From*</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter Name"
                name="rentFrom"
                data-errors="Rent From."
                value={formData.rentFrom}
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
                name="rentTo"
                data-errors="Please Enter Name."
                value={formData.rentTo}
                onChange={handleData}
                required=""
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
                name="pincode"
                value={formData.propertymaster && formData.propertymaster.pincode.$numberDecimal}
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
                name="address1"
                value={formData.propertymaster && formData.propertymaster.address1}
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
                name="address2"
                value={formData.propertymaster && formData.propertymaster.address2}
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
                name="city"
                value={formData.propertymaster && formData.propertymaster.city}
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
                name="state"
                value={formData.propertymaster && formData.propertymaster.state}
                onChange={handleData}
                disabled
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
                name="monthlyRent"
                value={formData.monthlyRent.$numberDecimal}
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
                value={formData.propertymaster && formData.propertymaster.ownerMasters}
                onChange={handleData}
                disabled
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add
        </button>
      </form>
    </>
  )
}

export default RentTransaction
