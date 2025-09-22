import React, { useEffect, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPropertyMaster, fetchPropertyMaster,
  deleteMaster,
  fetchRentMaster,
  selectAllRentMaster,
  fetchClientMaster,
} from "../Redux/Slice/userSlice";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../assets/css/style.css"

function ListPropertyMaster() {

  const [data, setData] = useState([])

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchRentMaster())
    dispatch(fetchClientMaster())
    dispatch(fetchPropertyMaster())
  }, [dispatch])

  const propertyMaster = useSelector(selectAllPropertyMaster);
  const rentmaster = useSelector(selectAllRentMaster)

  useEffect(() => {
    if (propertyMaster.length === 0) {
      setMessage({
        ...message,
        danger: `Network error, while retriving Property`,
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
      setData(propertyMaster)
    }
  }, [propertyMaster])

  const handleUpdate = (id) => {
    navigate(`/dashboard/propertymaster/update?Id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteMaster(id));
    } catch (error) {
      setMessage({
        ...message,
        danger: `${error.message}`,
      });
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
            <th>Address1</th>
            <th className="desktop-only">Address2</th>
            <th className="desktop-only">Pincode</th>
            <th className="desktop-only">City</th>
            <th className="desktop-only">State</th>
            <th className="desktop-only">Owner</th>
            <th>Actions</th>
            <th className="mobile-only">More</th>

          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => {
              // Check if item is valid before processing
              if (!item) return null;

              const rentItem = rentmaster.find(subItem => item._id === subItem?.propertymaster?._id);

              return (
                <>
                <tr key={index}>
                  <td>
                    {item.address1}
                  </td>
                  <td className="desktop-only">{item.address2}</td>
                  <td className="desktop-only">{item.pincode && item.pincode.$numberDecimal ? item.pincode.$numberDecimal : item.pincode}</td>
                  <td className="desktop-only">{item.city}</td>
                  <td className="desktop-only">{item.state}</td>
                  <td className="desktop-only">{item.ownerMasters && item.ownerMasters.name}</td>
                  <td>
                    <div className="d-flex align-items-center list-action">
                      {rentItem ? (
                        <>
                          <Link
                            to={`/dashboard/propertymaster/detail?Id=${item._id}`}
                            className="badge bg-danger mr-2"
                          >
                            Created
                          </Link>
                          <Button
                            variant="contained"
                            className="mr-2"
                            color="success"
                            onClick={() =>
                              navigate(
                                `/dashboard/rentmaster/transcation?Id=${item._id}`
                              )
                            }
                            style={{ textTransform: "none" }}
                            size="small"
                          >
                            Rent Reciept
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            className="mr-2"
                            color="success"
                            size="small"
                            textTransform
                            onClick={() => navigate(`/dashboard/addrentmaster/?Id=${item._id}`)}
                          >
                            Add Rents
                          </Button>
                        </>
                      )}
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
                    <div>Address 2: {item.address2}</div>
                    <div>Pincode : {item.pincode && item.pincode.$numberDecimal ? item.pincode.$numberDecimal : item.pincode}</div>
                    <div>City : {item.city}</div>
                    <div>State : {item.state}</div>
                    <div>Owner : {item.ownerMasters && item.ownerMasters.name}</div>
                  </td>
                </tr>
              )}
              </>
              )
          })
          }
        </tbody>
      </table>
      {message.success && (
        <div class="alert alert-success" role="alert">
          {message.success}
        </div>
      )}
      {message.danger && (
        <div class="alert alert-danger mt-3" role="alert">
          {message.danger}
        </div>
      )}
    </>
  );
}

export default ListPropertyMaster;