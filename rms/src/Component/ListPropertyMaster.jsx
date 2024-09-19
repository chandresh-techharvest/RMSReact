import React, { useEffect, useState } from 'react'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function ListPropertyMaster() {

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [message, setMessage] = useState({
    success: '',
    danger: ''
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://rsmapi.vercel.app/propertymaster')

        if (res.statusText == 'OK') {
          setData(await res.data)
        }

      } catch (error) {
        setMessage({
          ...message,
          danger: `${error.message}, While retriving PropertyMaster`
        })
      }
      finally {
        setTimeout(() => setMessage({
          success: '',
          danger: ''
        }), 3000);
      }
    }

    getData();
  }, [])

  const handleUpdate = (id) => {
    navigate(`/dashboard/update/${id}`)
  }

  const handleDelete = async (id) => {
    try {

      await axios.delete(`https://rsmapi.vercel.app/propertymaster/${id}`)

      setData(data.filter(data => data._id !== id))

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div class="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <div>
                  <h4 className="mb-3">PropertyMaster List</h4>
                </div>
                <Link className="btn btn-primary add-list" to='/dashboard/addownermaster' style={{ color: "white" }}> <i className="las la-plus mr-3"></i>Add PropertyMaster</Link>
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
                      <th>Address1</th>
                      <th>Address2</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Property CreatedBy</th>
                    </tr>
                  </thead>
                  <tbody className="ligth-body">
                    {
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link>{item.address1}</Link>
                          </td>
                          <td>{item.address2}</td>
                          <td>{item.city}</td>
                          <td>{item.state}</td>
                          <td>{item.owner && item.owner.name}</td>
                          <td>
                            <div className="d-flex align-items-center list-action">
                              <button className="badge bg-success mr-2" onClick={() => handleUpdate(item._id)}>
                                <ModeOutlinedIcon />
                              </button >
                              <button className="badge bg-warning mr-2" onClick={() => handleDelete(item._id)}>
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
  )
}

export default ListPropertyMaster