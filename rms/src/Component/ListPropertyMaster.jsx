import React, { useEffect, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPropertyMaster,
  deleteMaster,
} from "../Redux/Slice/userSlice";

function ListPropertyMaster() {
  const ownerId = localStorage.getItem("ownerId");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const propertymaster = useSelector(selectAllPropertyMaster);

  const propertyData = propertymaster.filter(
    (item) => item.ownerMasters._id === ownerId
  );

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

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

  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th>Address1</th>
            <th>Address2</th>
            <th>Pincode</th>
            <th>City</th>
            <th>State</th>
            <th>Property CreatedBy</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {propertyData &&
            propertyData.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/dashboard/propertymaster/detail?Id=${item._id}`}>
                    {item.address1}
                  </Link>
                </td>
                <td>{item.address2}</td>
                <td>{item.pincode && item.pincode.$numberDecimal}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.ownerMasters && item.ownerMasters.name}</td>
                <td>
                  <div className="d-flex align-items-center list-action">
                    <Button variant="contained" className="mr-2" color="success" onClick={() => navigate(`/dashboard/addrentmaster/?Id=${item._id}`)}>
                      Add Rent
                    </Button>
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
