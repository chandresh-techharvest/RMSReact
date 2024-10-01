import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function ListRentMaster() {

  const[data,setData] = useState([])

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

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
            <th>Rent CreatedBy</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {/* {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/dashboard/propertymaster/detail?Id=${item._id}`}>{item.address1}</Link>
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
            ))} */}
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