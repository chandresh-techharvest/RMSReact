import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchRentMaster, selectAllRentMaster } from "../Redux/Slice/userSlice";
import store from "../Redux/Store/store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../assets/css/style.css"

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
  const [expandedRow, setExpandedRow] = useState(null);
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th className="desktop-only"> ElectricityMeterNumber</th>
            <th>ClientName</th>
            <th className="desktop-only">IncrementPercentage</th>
            <th className="desktop-only">SecurityDepositAmount</th>
            <th className="desktop-only">MonthlyRent</th>
            <th className="desktop-only">IncrementSchedule</th>
            <th className="desktop-only">PropertyDetail</th>
            <th className="desktop-only">OwnerDetail</th>
            <th>Actions</th>
            <th className="mobile-only">More</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => {
              // Check if item is valid before processing
              if (!item) return null;

              return (
                <>
                  <tr key={index}>
                    <td>
                      <Link to={`/dashboard/rentmaster/detail?Id=${item._id}`}>
                        {item.electricityMeterNumber}
                      </Link>
                    </td>
                    <td className="desktop-only">{item.clientMaster && item.clientMaster.name}</td>
                    <td className="desktop-only">{item.incrementPercentage && item.incrementPercentage.$numberDecimal ? item.incrementPercentage.$numberDecimal : item.incrementPercentage}%</td>
                    <td className="desktop-only">{item.securityDepositAmount && item.securityDepositAmount.$numberDecimal ? item.securityDepositAmount.$numberDecimal : item.securityDepositAmount}</td>
                    <td className="desktop-only">{item.monthlyRent && item.monthlyRent.$numberDecimal ? item.monthlyRent.$numberDecimal : item.monthlyRent}</td>
                    <td className="desktop-only">{item.incrementSchedule && item.incrementSchedule.$numberDecimal ? item.incrementSchedule.$numberDecimal : item.incrementSchedule}%</td>
                    <td className="desktop-only">
                      {item.propertymaster &&
                        (item.propertymaster.pincode && item.propertymaster.pincode.$numberDecimal
                          ? item.propertymaster.pincode.$numberDecimal
                          : item.propertymaster.pincode)}
                    </td>
                    <td className="desktop-only">{item.ownerMasters && item.ownerMasters.name}</td>
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
                    <td className="mobile-only">
                      <button onClick={() => toggleRow(index)} className="btn btn-sm">
                        {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="expanded-row">
                      <td colSpan="6" style={{ textAlign: "left", paddingLeft: "12px" }}>
                        <div>ClientName : {item.clientMaster && item.clientMaster.name}</div>
                        <div>IncrementPercentage : {item.incrementPercentage && item.incrementPercentage.$numberDecimal ? item.incrementPercentage.$numberDecimal : item.incrementPercentage}%</div>
                        <div>SecurityDepositAmount : {item.securityDepositAmount && item.securityDepositAmount.$numberDecimal ? item.securityDepositAmount.$numberDecimal : item.securityDepositAmount}</div>
                        <div>MonthlyRent : {item.monthlyRent && item.monthlyRent.$numberDecimal ? item.monthlyRent.$numberDecimal : item.monthlyRent}</div>
                        <div>IncrementSchedule : {item.incrementSchedule && item.incrementSchedule.$numberDecimal ? item.incrementSchedule.$numberDecimal : item.incrementSchedule}%</div>
                        <div> PropertyMaster : {item.propertymaster &&
                            (item.propertymaster.pincode && item.propertymaster.pincode.$numberDecimal
                              ? item.propertymaster.pincode.$numberDecimal
                              : item.propertymaster.pincode)}
                        </div>
                        <div>Owner :  {item.ownerMasters && item.ownerMasters.name}</div>

                      </td>
                    </tr>
                  )}
                </>
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
