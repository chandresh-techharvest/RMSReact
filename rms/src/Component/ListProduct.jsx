import React from "react";

function ListProduct() {
  return (
    <div class="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
              <div>
                <h4 className="mb-3">Suppliers List</h4>
                <p className="mb-0">
                  Create and manage your vendor list, send and receive purchase
                  orders – your online
                  <br />
                  Dashboard is your new back of house.
                </p>
              </div>
              <a
                className="btn btn-primary add-list"
                href="/dashboard/addsupplier"
              >
                <i className="las la-plus mr-3"></i>Add Supplier
              </a>
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
              <table className="data-table table mb-0 tbl-server-info">
                <thead className="bg-white text-uppercase">
                  <tr className="ligth ligth-data">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>GST No</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="ligth-body">
                  <tr>
                    <td>
                      <div>
                        <a href="/dashboard/supplier/detail/667eaf1e032b36eef4714754">
                          Supplier1
                        </a>
                      </div>
                    </td>
                    <td>sup1@gmail.com</td>
                    <td>1234567890</td>
                    <td>gst1</td>
                    <td>Supplier1 address</td>
                    <td>Satna</td>
                    <td>M.P</td>
                    <td>India</td>
                    <td>
                      <div className="d-flex align-items-center list-action">
                        <a
                          className="badge bg-success mr-2"
                          href="/dashboard/supplier/update/667eaf1e032b36eef4714754"
                        >
                          <svg
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="ModeOutlinedIcon"
                          >
                            <path d="m14.06 9.02.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"></path>
                          </svg>
                        </a>
                        <button className="badge bg-warning mr-2">
                          <svg
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="DeleteOutlineOutlinedIcon"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <a href="/dashboard/supplier/detail/668bb40b3544c9d80ba7882c">
                          dasdasd
                        </a>
                      </div>
                    </td>
                    <td>tes@gmail.com</td>
                    <td>7894561230</td>
                    <td>12355666</td>
                    <td>daad</td>
                    <td>mumbai</td>
                    <td>M.H</td>
                    <td>India</td>
                    <td>
                      <div className="d-flex align-items-center list-action">
                        <a
                          className="badge bg-success mr-2"
                          href="/dashboard/supplier/update/668bb40b3544c9d80ba7882c"
                        >
                          <svg
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="ModeOutlinedIcon"
                          >
                            <path d="m14.06 9.02.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"></path>
                          </svg>
                        </a>
                        <button className="badge bg-warning mr-2">
                          <svg
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="DeleteOutlineOutlinedIcon"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <a href="/dashboard/supplier/detail/668e1b7107e6cccc3b5c72f5">
                          Kanishk Singh
                        </a>
                      </div>
                    </td>
                    <td>kanishk.singh@thetechharvest.com</td>
                    <td>08103323545</td>
                    <td>n1</td>
                    <td>satna</td>
                    <td>Satna</td>
                    <td>&lt; Select &gt;</td>
                    <td>India</td>
                    <td>
                      <div className="d-flex align-items-center list-action">
                        <a
                          className="badge bg-success mr-2"
                          href="/dashboard/supplier/update/668e1b7107e6cccc3b5c72f5"
                        >
                          <svg
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="ModeOutlinedIcon"
                          >
                            <path d="m14.06 9.02.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"></path>
                          </svg>
                        </a>
                        <button className="badge bg-warning mr-2">
                          <svg
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="DeleteOutlineOutlinedIcon"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
