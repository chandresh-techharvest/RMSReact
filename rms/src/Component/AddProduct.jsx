import React, {useState, useEffect } from "react";
import axios from 'axios'


function AddProduct() {



  const [formdata, setformData] = useState({
    name: '',
    email: '',
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
      const res = await axios.post('https://rsmapi.vercel.app/ownermaster', formdata)

      console.log("res ", res);

      setformData({
        name: '',
        email: '',
        password: '',
        phone: ''
      })

    } catch (error) {

    }
  }


  return (
    <div className="content-page">
      <div className="container-fluid add-form-list">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Add Product</h4>
                </div>
              </div>
              <div className="card-body">
                <form
                  onSubmit={handleSubmit}
                  data-toggle="validator"
                  novalidate="true"
                >
                  <div className="row">
                    <div className="col-md-12">

                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
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
                          value={formdata.email}
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
                          value={formdata.phone}
                          onChange={handleData}
                          required=""
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>

                  </div>
                  <button type="submit" className="btn btn-primary mr-2 disabled">
                    Add Product
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
  );
}

export default AddProduct;
