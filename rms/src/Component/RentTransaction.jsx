import React, { useState } from 'react'

function RentTransaction() {

  const [formData, setFormData] = useState({
    rentFrom: '',
    rentTo: ''
  })

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
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add
        </button>
      </form>
    </>
  )
}

export default RentTransaction
