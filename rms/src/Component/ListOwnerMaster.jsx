import React, { useEffect, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function ListOwnerMaster() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://rsmapi.vercel.app/ownermaster");


        if (res.status == 200) {
          setData(await res.data)

        }
      } catch (error) {
        setMessage({
          ...message,
          danger: `${error.message}, While retriving PropertyMaster`,
        });
      } finally {
        setTimeout(
          () =>
            setMessage({
              success: "",
              danger: "",
            }),
          3000
        );
      }
    };

    getData();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/dashboard/ownermaster/Id?=${id}`)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://rsmapi.vercel.app/ownermaster/${id}`);

      setData(data.filter((data) => data._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
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
          {data && data.map((item, index) => (
            <tr key={index}>
              <td>
                <Link>{item.name}</Link>
              </td>
              <td>{item.emailaddress}</td>
              <td>{item.password}</td>
              <td>{item.phone}</td>
              <td>{item.createdAt.slice(0, 10)}</td>
              <td>
                <div className="d-flex align-items-center list-action">
                  <button
                    className="badge bg-success mr-2"
                    onClick={() => handleUpdate(item._id)}
                  >
                    <ModeOutlinedIcon />
                  </button>
                  <button
                    className="badge bg-warning mr-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {message.success && (
        <div className="alert alert-success" role="alert">
          {message.success}
        </div>
      )}
      {message.danger && (
        <div className="alert alert-danger mt-3">{message.danger}</div>
      )}
    </>
  );
}

export default ListOwnerMaster;
