import React, { useEffect, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOwnerMaster,
  selectAllOwnerMaster,
} from "../Redux/Slice/userSlice";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../assets/css/style.css"

function ListOwnerMaster() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchOwnerMaster());
  }, [dispatch]);

  const ownerMaster = useSelector(selectAllOwnerMaster);

  useEffect(() => {
    if (ownerMaster.length === 0) {
      setMessage((prev) => ({
        ...prev,
        danger: `Network error, while retrieving Owner`,
      }));

      setTimeout(() => {
        setMessage({ success: "", danger: "" });
      }, 2000);
    } else {
      setData(ownerMaster);
    }
  }, [ownerMaster]);

  const handleUpdate = (id) => {
    navigate(`/dashboard/ownermaster/update?Id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://rsmapi.vercel.app/ownermaster/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(data.filter((data) => data._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th>Name</th>
            <th className="desktop-only">Email Address</th>
            <th className="desktop-only">Phone</th>
            <th className="desktop-only">Created At</th>
            <th>Actions</th>
            <th className="mobile-only">More</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => (
              <>
                <tr key={index}>
                  <td>
                    <Link>{item.name}</Link>
                  </td>
                  <td className="desktop-only">{item.email}</td>
                  <td className="desktop-only">{item.phone}</td>
                  <td className="desktop-only">{item.createdAt.slice(0, 10)}</td>
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
                  <td className="mobile-only">
                    <button onClick={() => toggleRow(index)} className="btn btn-sm">
                      {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr className="expanded-row">
                    <td colSpan="6" style={{ textAlign: "left", paddingLeft: "12px" }}>
                      <div>Email : {item.email}</div>
                      <div>Phone : {item.phone}</div>
                      <div>Created At : {item.createdAt.slice(0, 10)}</div>
                    </td>
                  </tr>
                )}
              </>
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
