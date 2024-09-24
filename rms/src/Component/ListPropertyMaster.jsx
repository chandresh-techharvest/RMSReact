import React, { useEffect, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectAllPropertyMaster,
  deleteMaster,
} from "../Redux/Slice/userSlice";

function ListPropertyMaster() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const propertymaster = useSelector(selectAllPropertyMaster);

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  const handleUpdate = (id) => {
    navigate(`/dashboard/update/${id}`);
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
          {propertymaster &&
            propertymaster.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link>{item.address1}</Link>
                </td>
                <td>{item.address2}</td>
                <td>{item.pincode && item.pincode.$numberDecimal}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.ownerMasters && item.ownerMasters.name}</td>
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