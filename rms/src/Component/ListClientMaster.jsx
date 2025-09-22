import React, { useEffect, useMemo, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchClientMaster, selectAllClientMaster } from "../Redux/Slice/userSlice";

	
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../assets/css/style.css"

function ListClientMaster() {
  const ownerId = localStorage.getItem("userId"); // Changed from ownerId to userId

  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchClientMaster())
  }, [])

  const clientmaster = useSelector(selectAllClientMaster);

  useEffect(() => {
    if (clientmaster.length === 0) {
      setMessage({
        ...message,
        danger: `Network error, while retriving Client`,
      });

      setTimeout(
        () =>
          setMessage({
            success: "",
            danger: "",
          }),
        2000
      );
    }
    else {
      setData(clientmaster.filter((item) => item.ownerMasters._id === ownerId))
    }
  }, [clientmaster])

  const handleUpdate = (id) => {
    navigate(`/dashboard/clientmaster/update?Id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        // `https://rsmapi.vercel.app/clientmaster/${id}`,
        `https://rsmapi.vercel.app/clientmaster/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
            <th className="desktop-only">Father Name</th>
            <th className="desktop-only">Gender</th>
            <th className="desktop-only">Phone</th>
            <th className="desktop-only">Address1</th>
            <th className="desktop-only">Address2</th>
            <th className="desktop-only">Created At</th>
            <th>Action</th>
            <th className="mobile-only">More</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => (
              <>
                <tr key={index}>
                  <td>
                    <Link to={`/dashboard/clientmaster/detail?Id=${item._id}`}>
                      {item.name}
                    </Link>
                  </td>
                  <td className="desktop-only">{item.fatherName}</td>
                  <td className="desktop-only">{item.gender}</td>
                  <td className="desktop-only">{item.mobileNumber}</td>
                  <td className="desktop-only">{item.address1}</td>
                  <td className="desktop-only">{item.address2}</td>
                  <td className="desktop-only">{item.ownerMasters.name}</td>
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
                      <div>Father Name : {item.fatherName}</div>
                      <div>Gender : {item.gender}</div>
                      <div>Phone : {item.mobileNumber}</div>
                      <div>Address1 : {item.address1}</div>
                      <div>Address2 : {item.address2}</div>
                      <div>Owner : {item.ownerMasters.name}</div>
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

export default ListClientMaster;
