import React from "react";

function Product() {
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
                action="page-list-product.html"
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
                        required=""
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        data-errors="Please Enter Code."
                        required=""
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Pssword *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        data-errors="Please Enter Cost."
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
                        data-errors="Please Enter Price."
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

export default Product;
