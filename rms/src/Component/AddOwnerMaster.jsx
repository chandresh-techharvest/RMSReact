import React, { useState, useEffect } from "react";
import axios from 'axios'


function AddOwnerMaster() {

  const [formdata, setformData] = useState({
    name: '',
    emailaddress: '',
    password: '',
    phone: ''
  })

  const [message, setMessage] = useState({
    success: '',
    danger: ''
  })

  const handleData = (e) => {
    e.preventDefault();

    setformData({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/ownermaster', formdata)

      setformData({
        name: '',
        emailaddress: '',
        password: '',
        phone: ''
      })

      setMessage({
        ...message,
        success: res.data.message
      })


    } catch (error) {
      setMessage({
        ...message,
        danger: 'Error, While saving ownermaster'
      })
    }
  }


  return (
    <>
      <div className="content-page">
        <div className="container-fluid add-form-list">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Add OwnerMaster</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form
                    onSubmit={handleSubmit}
                    data-toggle="validator"
                    novalidate="true"
                  >
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
                            value={formdata.name}
                            onChange={handleData}
                            required=""
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            data-errors="Please Enter Email."
                            name="emailaddress"
                            value={formdata.emailaddress}
                            onChange={handleData}
                            required=""
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Pssword *</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            data-errors="Please Enter Password."
                            name="password"
                            value={formdata.password}
                            onChange={handleData}
                            required=""
                          />
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
                            data-errors="Please Enter Phone."
                            name="phone"
                            value={formdata.phone}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        message.success && (
          <div class="alert alert-success" role="alert">
            {message.success}
          </div>
        )
      }
      {
        message.danger && (
          <div class="alert alert-danger mt-3" role="alert">
            {message.danger}
          </div>
        )
      }
    </>
  );
}

export default AddOwnerMaster;
