import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientMaster, fetchrentTranscation, selectAllClientMaster, selectAllRentTranscation } from "../Redux/Slice/userSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../assets/css/style.css"

function ListRentRecipt() {
  const clientId = localStorage.getItem("clientId");

  const [rentRecipts, setRentRecipts] = useState([]);

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchClientMaster())
    dispatch(fetchrentTranscation())
  }, [dispatch])

  const clientData = useSelector(selectAllClientMaster)
  const transcation = useSelector(selectAllRentTranscation).filter(item => item.clientMaster._id === clientId)

  useEffect(() => {
    if (transcation.length === 0) {
      setMessage({
        ...message,
        danger: `Network Error`,
      });

      setTimeout(
        () =>
          setMessage({
            success: "",
            danger: "",
          }),
        3000
      );
    }
    else {
      setRentRecipts(transcation)
    }
  }, [])

  console.log("clientData ", clientData);

  console.log("recipts ", rentRecipts);


  useEffect(() => {

    const getData = async () => {
      try {

        const res = await axios.get(
          "https://rsmapi.vercel.app/rentTranscation",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          setRentRecipts(
            await res.data.filter(item => item.clientMaster && item.clientMaster._id === clientId)
          );
          if (rentRecipts.length === 0) {
            setMessage({
              ...message,
              success: `No Data Found`,
            });
          }

        }
      } catch (error) {
        setMessage({
          ...message,
          danger: `${error.message}, While retriving RentRecipt`,
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
  const [expandedRow, setExpandedRow] = useState(null);
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th className="desktop-only">ClientName</th>
            <th className="desktop-only">ClientEmail</th>
            <th>RentFrom</th>
            <th>RentTo</th>
            <th className="desktop-only">PaymentThreshold</th>
            <th>PaymentMode</th>
            <th className="desktop-only">MonthlyRent</th>
            <th className="desktop-only">PropertyDetail</th>
            <th className="desktop-only">OwnerDetail</th>
            <th className="mobile-only">More</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {rentRecipts &&
            rentRecipts.map((item, index) => {
              // Check if item is valid before processing
              if (!item) return null;

              return (
                <>
                  <tr key={index}>
                    <td className="desktop-only">
                      <Link to={`/dashboard/rentTranscation/detail?Id=${item._id}`}>
                        {item?.clientMaster && item?.clientMaster.name}
                      </Link>
                    </td>
                    <td className="desktop-only">{item?.clientMaster && item?.clientMaster.email}</td>
                    <td>{item.RentFrom && item.RentFrom.slice(0, 10)}</td>
                    <td>{item.RentTo && item.RentTo.slice(0, 10)}</td>
                    <td className="desktop-only">{item.paymentThreshold && item.paymentThreshold.slice(0, 10)}</td>
                    <td>
                      {item.paymentMode === 'cash' ? (
                        <span className="badge badge-secondary">{item.paymentMode}</span>
                      ) : (
                        <Link
                          to='/dashboard/api-gateway'
                          className="badge badge-primary"
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          {item.paymentMode}
                        </Link>
                      )}
                    </td>
                    <td className="desktop-only">{item?.rentMaster?.monthlyRent && item?.rentMaster?.monthlyRent.$numberDecimal ? item?.rentMaster?.monthlyRent.$numberDecimal : item?.rentMaster?.monthlyRent}</td>
                    <td className="desktop-only">
                      {item.propertyMaster.address1}, {item.propertyMaster.address2}, {item.propertyMaster.pincode}
                    </td>
                    <td className="desktop-only">{item?.ownerMasters && item?.ownerMasters.name}</td>
                    {/* <td>
                      <div className="d-flex align-items-center list-action">
                        <button
                        className="badge bg-warning mr-2"
                        onClick={() => handleDelete(item._id)}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </button>
                      </div>
                    </td> */}
                    <td className="mobile-only">
                      <button onClick={() => toggleRow(index)} className="btn btn-sm">
                        {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </button>
                    </td>
                  </tr>
                  {
                    expandedRow === index && (
                      <tr className="expanded-row">
                        <td colSpan="6" style={{ textAlign: "left", paddingLeft: "12px" }}>
                          <div>
                            Client Name : 
                            <Link to={`/dashboard/rentTranscation/detail?Id=${item._id}`}>
                              {item?.clientMaster && item?.clientMaster.name}
                            </Link>
                          </div>
                          <div>ClientEmail : {item?.clientMaster && item?.clientMaster.email}</div>
                          <div>PaymentThreshold : {item.paymentThreshold && item.paymentThreshold.slice(0, 10)}</div>
                          <div>MonthlyRent : {item?.rentMaster?.monthlyRent && item?.rentMaster?.monthlyRent.$numberDecimal ? item?.rentMaster?.monthlyRent.$numberDecimal : item?.rentMaster?.monthlyRent}</div>
                          <div>
                              Property Details : <addr>{item.propertyMaster.address1}, {item.propertyMaster.address2}, {item.propertyMaster.pincode}</addr>
                          </div>
                          <div>Owner Details : {item?.ownerMasters && item?.ownerMasters.name}</div>
                        </td>
                      </tr>
                    )
                  }
                </>

              );
            })}
        </tbody>
      </table>
      {message.success && (
        <div class="alert alert-success mt-3" role="alert">
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
export default ListRentRecipt;
