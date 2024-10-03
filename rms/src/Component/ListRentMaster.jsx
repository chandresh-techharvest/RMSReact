import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function ListRentMaster() {

  const [data, setData] = useState([])
  const navigate = useNavigate();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://rsmapi.vercel.app/rentmaster", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if (res.status == 200) {
          setData(await res.data)
        }
      } catch (error) {
        setMessage({
          ...message,
          danger: `${error.message}, While retriving RentMaster`,
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
    }
    getData();
  }, [])

  const handleUpdate = (id) => {
    navigate(`/dashboard/rentmaster/update?Id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://rsmapi.vercel.app/rentmaster/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setData(data.filter((data) => data._id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th>ElectricityMeterNumber</th>
            <th>ClientId</th>
            <th>IncrementPercentage</th>
            <th>SecurityDepositAmount</th>
            <th>MonthlyRent</th>
            <th>IncrementSchedule</th>
            <th>Rent CreatedFror</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/dashboard/rentmaster/detail?Id=${item._id}`}>{item.electricityMeterNumber}</Link>
                </td>
                <td>{item.clientId}</td>
                <td>{item.incrementPercentage.$numberDecimal}%</td>
                <td>{item.securityDepositAmount.$numberDecimal}%</td>
                <td>{item.monthlyRent.$numberDecimal}%</td>
                <td>{item.incrementSchedule.$numberDecimal}%</td>
                <td>{item.propertymaster && item.propertymaster.pincode.$numberDecimal}</td>
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
      {message.danger && (
        <div class="alert alert-danger mt-3" role="alert">
          {message.danger}
        </div>
      )}
    </>
  )
}

export default ListRentMaster