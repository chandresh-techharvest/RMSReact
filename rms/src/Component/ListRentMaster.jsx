import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchRentMaster, selectAllRentMaster } from "../Redux/Slice/userSlice";
import store from "../Redux/Store/store";

function ListRentMaster() {

  const ownerId = localStorage.getItem("userId"); // Changed from ownerId to userId

  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchRentMaster())
  }, [dispatch])

  const rent = useSelector(selectAllRentMaster)

  useEffect(() => {
    if (rent.length === 0) {
      setMessage({
        ...message,
        danger: `Network error, while retriving Property Rent`,
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
      setData(rent.filter((item) => item.ownerMasters && item.ownerMasters._id === ownerId))
    }
  }, [rent]);

  const handleUpdate = (id) => {
    navigate(`/dashboard/rentmaster/update?Id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://rsmapi.vercel.app/rentmaster/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

      setData(data.filter((data) => data && data._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th>ElectricityMeterNumber</th>
            <th>ClientName</th>
            <th>IncrementPercentage</th>
            <th>SecurityDepositAmount</th>
            <th>MonthlyRent</th>
            <th>IncrementSchedule</th>
            <th>PropertyDetail</th>
            <th>OwnerDetail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => {
              // Check if item is valid before processing
              if (!item) return null;

              return (
                <tr key={index}>
                  <td>
                    <Link to={`/dashboard/rentmaster/detail?Id=${item._id}`}>
                      {item.electricityMeterNumber}
                    </Link>
                  </td>
                  <td>{item.clientMaster && item.clientMaster.name}</td>
                  <td>{item.incrementPercentage && item.incrementPercentage.$numberDecimal ? item.incrementPercentage.$numberDecimal : item.incrementPercentage}%</td>
                  <td>{item.securityDepositAmount && item.securityDepositAmount.$numberDecimal ? item.securityDepositAmount.$numberDecimal : item.securityDepositAmount}</td>
                  <td>{item.monthlyRent && item.monthlyRent.$numberDecimal ? item.monthlyRent.$numberDecimal : item.monthlyRent}</td>
                  <td>{item.incrementSchedule && item.incrementSchedule.$numberDecimal ? item.incrementSchedule.$numberDecimal : item.incrementSchedule}%</td>
                  <td>
                    {item.propertymaster &&
                      (item.propertymaster.pincode && item.propertymaster.pincode.$numberDecimal
                        ? item.propertymaster.pincode.$numberDecimal
                        : item.propertymaster.pincode)}
                  </td>
                  <td>{item.ownerMasters && item.ownerMasters.name}</td>
                  <td>
                    <div className="d-flex align-items-center list-action">
                      <Button
                        variant="contained"
                        className="mr-2"
                        color="primary"
                        size="small"
                        onClick={() =>
                          navigate(
                            item.propertymaster ? `/dashboard/rentmaster/transcation?Id=${item.propertymaster._id}` : '#'
                          )
                        }
                        style={{ textTransform: "none", marginRight: "8px" }}
                        disabled={!item.propertymaster}
                      >
                        Transaction
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
              );
            })}
        </tbody>
      </table>
      {message.danger && (
        <div class="alert alert-danger mt-3" role="alert">
          {message.danger}
        </div>
      )}
    </>
  );
}

export default ListRentMaster;
