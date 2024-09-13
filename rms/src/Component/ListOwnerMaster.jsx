import React, { useEffect, useState } from "react";
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";
import axios from "axios";

function ListOwnerMaster() {

  const [data, setData] = useState([]);

  const [message, setMessage] = useState({
    success: '',
    danger: ''
  })

  useEffect(() => {

    const getData = async () => {
      try {
        const res = await axios.get('/ownermaster')

        if (res.statusText == 'OK') {
          setData(await res.data)
        }

      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [])

  return (
    <div class="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
              <div>
                <h4 className="mb-3">OwnerMaster List</h4>
              </div>
              <a
                className="btn btn-primary add-list"
                href="/dashboard/addsupplier"
              >
                <Link to='ownermaster'> <i className="las la-plus mr-3"></i>Add OwnerMaster</Link>
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
                    <th>EmailAddress</th>
                    <th>Password</th>
                    <th>Phone</th>
                    <th>CreatedAt</th>
                  </tr>
                </thead>
                <tbody className="ligth-body">
                  {
                    data.map((item, index) => (
                      <tr>
                        <td>
                          <Link>{item.name}</Link>
                        </td>
                        <td>{item.emailaddress}</td>
                        <td>{item.password}</td>
                        <td>{item.phone}</td>
                        <td>{item.createdAt}</td>
                        <td>
                          <div className="d-flex align-items-center list-action">
                            <Link
                              className="badge bg-success mr-2"
                              href="/dashboard/supplier/update/667eaf1e032b36eef4714754"
                            >
                              <ModeOutlinedIcon />
                            </Link >
                            <button className="badge bg-warning mr-2">
                              <DeleteOutlineOutlinedIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListOwnerMaster;
