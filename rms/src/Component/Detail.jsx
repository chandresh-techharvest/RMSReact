import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

function Detail() {

    const [data, setData] = useState([])

    const url = new URLSearchParams(window.location.search)

    const { whichroute } = useParams();

    const navigate = useNavigate()

    const id = url.get('Id')

    const [message, setMessage] = useState({
        success: '',
        danger: ''
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`https://rsmapi.vercel.app/${whichroute}/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                setData(await res.data)
            } catch (error) {
                setMessage({
                    ...message,
                    danger: `${error.message}, While retriving Data`,
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
    }, [id])

    return (
        <>
            <div className="content-page">
                <div className="container-fluid add-form-list">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">{whichroute.charAt(0).toUpperCase() + whichroute.slice(1)}Detail</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className='row'>
                                        {
                                            whichroute === 'propertymaster' ? (
                                                data && Object.keys(data).map((item, index) => (
                                                    (item !== '__v' && item !== 'ownerMasters' && item !== 'pincode') ? (
                                                        <div className="col-md-6" key={index}>
                                                            <div className="form-group">
                                                                <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                <div className="help-block">{data[item]}</div>
                                                            </div>
                                                        </div>
                                                    ) : (item !== '__v' && item !== 'ownerMasters') ? (
                                                        <div className="col-md-6" key={index}>
                                                            <div className="form-group">
                                                                <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                <div className="help-block">{data[item].$numberDecimal}</div>
                                                            </div>
                                                        </div>
                                                    ) : (item !== 'ownerMasters' && item === 'createdAt' || item === 'updatedAt') ? (
                                                        item !== '__v' && (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-group">
                                                                    <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                    <div className="help-block">{data[item]}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    ) : item === 'ownerMasters' && (
                                                        <div className="col-md-6" key={index}>
                                                            <div className="form-group">
                                                                <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                <div className="help-block">{data[item].name}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                ))
                                            ) : whichroute === 'clientmaster' ? (
                                                data && Object.keys(data).map((item, index) => (
                                                    (item !== '__v' && item !== 'ownerMasters') ? (
                                                        <div className="col-md-6" key={index}>
                                                            <div className="form-group">
                                                                <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                <div className="help-block">{data[item]}</div>
                                                            </div>
                                                        </div>
                                                    ) : (item !== 'ownerMasters' && item === 'createdAt' || item === 'updatedAt') ? (
                                                        item !== '__v' && (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-group">
                                                                    <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                    <div className="help-block">{data[item]}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    ) : item === 'ownerMasters' && (
                                                        <div className="col-md-6" key={index}>
                                                            <div className="form-group">
                                                                <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                <div className="help-block">{data[item].name}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            ) : whichroute === 'rentmaster' ? (
                                                data && Object.keys(data).map((item, index) => (
                                                    (item === 'electricityMeterNumber' || item === 'clientId') ? (
                                                        <div className="col-md-6" key={index}>
                                                            <div className="form-group">
                                                                <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                <div className="help-block">{data[item]}</div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        item === 'incrementPercentage' || item === 'securityDepositAmount' || item === 'monthlyRent' || item === 'incrementSchedule' ?
                                                            (
                                                                (item !== '__v' && item !== 'propertymaster') && (
                                                                    <div className="col-md-6" key={index}>
                                                                        <div className="form-group">
                                                                            <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                            <div className="help-block">{data[item].$numberDecimal}</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            ) : item === 'propertymaster' ? (
                                                                <div className="col-md-6" key={index}>
                                                                    <div className="form-group">
                                                                        <h5>Property</h5>
                                                                        <div className="help-block">{data[item].address1},{data[item].address2},{data[item].pincode.$numberDecimal},{data[item].city},{data[item].state}</div>
                                                                    </div>
                                                                </div>
                                                            ) : (item === 'createdAt' || item === 'updatedAt') && (
                                                                <div className="col-md-6" key={index}>
                                                                    <div className="form-group">
                                                                        <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                        <div className="help-block">{data[item].slice(0, 10)}</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                    )
                                                ))
                                            ) : (null)
                                        }
                                    </div>
                                    <button className="btn btn-primary mr-2" onClick={() => navigate(-1)}>Back</button>
                                </div>

                            </div>
                        </div>
                    </div >
                </div >
                {
                    message.danger && (
                        <div className="alert alert-danger mt-3">
                            {message.danger}
                        </div>
                    )
                }
            </div >

        </>
    )
}

export default Detail