import React from "react";
import AddOwnerMaster from "../../Component/AddOwnerMaster";

function AddOwnerMasters() {
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
                <AddOwnerMaster/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOwnerMasters;
