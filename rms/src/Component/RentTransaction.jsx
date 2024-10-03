import React from 'react'

function RentTransaction() {
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
            name="name"
            data-errors="Rent From."
            // value={formData.name}
            // onChange={handleData}
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
            name="fatherName"
            data-errors="Please Enter Name."
            // value={formData.fatherName}
            // onChange={handleData}
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
    </>
  )
}

export default RentTransaction
