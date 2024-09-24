import React from "react";
import ListRentMaster from "../../Component/ListRentMaster";
import { Link } from "react-router-dom";

function ListRentMasters() {
  return (
    <>
    <div className="content-page">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
            <div>
              <h4 className="mb-3">RentMaster List</h4>
            </div>
            <Link
              className="btn btn-primary add-list"
              to="/dashboard/addrentmaster"
              style={{ color: "white" }}
            >
              {" "}
              <i className="las la-plus mr-3"></i>Add RentMaster
            </Link>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="table-responsive rounded mb-3">
            <div className="container">
              <div className="row">
                <div className="col-12 d-flex">
                  <label>
                    Search:
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      placeholder=""
                      aria-controls="DataTables_Table_0"
                    />
                  </label>
                </div>
              </div>
            </div>
         <ListRentMaster/>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}

export default ListRentMasters;
