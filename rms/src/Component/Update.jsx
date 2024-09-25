import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

function Update() {

    const url = new URLSearchParams(window.location.search)

    const { whichroute } = useParams();

    const id = url.get('Id')

    console.log(whichroute);
    

    const navigate = useNavigate();

    const [formdata, setformData] = useState({
        name: '',
        emailaddress: '',
        gender: 'Select',
        password: '',
        phone: '',
        pincode: '',
        address1: '',
        address2: '',
        fatherName: '',
        city: '',
        state: '',
        electricityMeterNumber: '',
        incrementPercentage: '',
        securityDepositAmount: '',
        monthlyRent: '',
        incrementSchedule: ''
    })

    const [message, setMessage] = useState({
        success: '',
        danger: ''
    })

    useEffect(() => {

        const retriveData = async () => {
            try {
                const res = await axios.get(`https://rsmapi.vercel.app/${whichroute}/${id}`)

                setformData(await res.data)

            } catch (error) {
                console.log(error);
            }
        }
        retriveData();
    }, [id])

    const handleData = (e) => {
        e.preventDefault();

        setformData({
            ...formdata,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://rsmapi.vercel.app/${whichroute}/${id}`, formdata)

            setMessage({
                ...message,
                success: 'Update Successfully'
            })
        } catch (error) {
            setMessage({
                ...message,
                success: 'Error! while Updating'
            })
        }
        finally {
            setTimeout(() => setMessage({
                success: '',
                danger: ''
            }), 3000);
        }

    }

    return (
        <>
            <div className="content-page">
                <div className="container-fluid add-form-list">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Update</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form
                                        onSubmit={handleSubmit}
                                        data-toggle="validator"
                                        novalidate="true"
                                    >
                                        {
                                            whichroute === 'ownermaster' ? (
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Id *</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formdata._id}
                                                                onChange={handleData}
                                                                required=""
                                                                disabled
                                                            />
                                                            <div className="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Name *</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Name"
                                                                name="name"
                                                                data-errors="Please Enter Name."
                                                                value={formdata.name}
                                                                onChange={handleData}
                                                                required=""
                                                            />
                                                            <div className="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Email *</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="Enter Email"
                                                                data-errors="Please Enter Email."
                                                                name="emailaddress"
                                                                value={formdata.email}
                                                                onChange={handleData}
                                                                required=""
                                                            />
                                                            <div className="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Password *</label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="Enter Password"
                                                                data-errors="Please Enter Password."
                                                                name="password"
                                                                value={formdata.password}
                                                                onChange={handleData}
                                                                required=""
                                                            />
                                                            <div className="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Phone *</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Phone"
                                                                data-errors="Please Enter Phone."
                                                                name="phone"
                                                                value={formdata.phone}
                                                                onChange={handleData}
                                                                required=""
                                                            />
                                                            <div className="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) :
                                                whichroute === 'propertymaster' ? (
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Id *</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={formdata._id}
                                                                    onChange={handleData}
                                                                    required=""
                                                                    disabled
                                                                />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Pincode *</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Pincode"
                                                                    name="pincode"
                                                                    data-errors="Please Enter Pincode."
                                                                    value={formdata.pincode.$numberDecimal}
                                                                    onChange={handleData}
                                                                    required=""
                                                                />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Address1 *</label>
                                                                <input
                                                                    type="address1"
                                                                    className="form-control"
                                                                    placeholder="Enter Address1"
                                                                    data-errors="Please Enter Address1."
                                                                    name="address1"
                                                                    value={formdata.address1}
                                                                    onChange={handleData}
                                                                    required=""
                                                                />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Address2 *</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Address2"
                                                                    data-errors="Please Enter Address2."
                                                                    name="address2"
                                                                    value={formdata.address2}
                                                                    onChange={handleData}
                                                                    required=""
                                                                />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>City *</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter City"
                                                                    data-errors="Please Enter City."
                                                                    name="city"
                                                                    value={formdata.city}
                                                                    onChange={handleData}
                                                                    required=""
                                                                />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>State *</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter state"
                                                                    data-errors="Please Enter state."
                                                                    name="state"
                                                                    value={formdata.state}
                                                                    onChange={handleData}
                                                                    required=""
                                                                />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>CreatedAt *</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={formdata.createdAt && formdata.createdAt.slice(0, 10)}
                                                                    onChange={handleData}
                                                                    required=""
                                                                    disabled
                                                                />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>CreatedBy *</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={formdata.ownerMasters && formdata.ownerMasters.name}
                                                                    onChange={handleData}
                                                                    required=""
                                                                    disabled
                                                                />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) :
                                                    whichroute === 'clientmaster' ? (
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Id *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={formdata._id}
                                                                        onChange={handleData}
                                                                        required=""
                                                                        disabled
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Name *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Client Name"
                                                                        name="name"
                                                                        data-errors="Please Enter Client Name."
                                                                        value={formdata.name}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>FatherName *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter FatherName"
                                                                        data-errors="Please Enter FatherName."
                                                                        name="fatherName"
                                                                        value={formdata.fatherName}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Gender *</label>
                                                                    <select className='form-control' name='gender' value={formdata.gender} onChange={handleData} required>
                                                                        <option value="Male">Male</option>
                                                                        <option value="Female">Female</option>
                                                                    </select>
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Phone *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Phone"
                                                                        data-errors="Please Enter Phone."
                                                                        name="phone"
                                                                        value={formdata.phone}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Address1 *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Address1"
                                                                        data-errors="Please Enter Address1."
                                                                        name="address1"
                                                                        value={formdata.address1}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Address2 *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Address2"
                                                                        data-errors="Please Enter Address2."
                                                                        name="address2"
                                                                        value={formdata.address2}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>CreatedAt *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={formdata.createdAt}
                                                                        onChange={handleData}
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>CreatedBy *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={formdata.ownerMasters && formdata.ownerMasters.name}
                                                                        onChange={handleData}
                                                                        disabled
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : whichroute === 'rentmaster' && (
                                                        <div className='row'>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Id *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={formdata._id}
                                                                        onChange={handleData}
                                                                        disabled
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>ElectricityMeterNumber *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter ElectricityMeterNumber"
                                                                        name="electricityMeterNumber"
                                                                        data-errors="Please Enter ElectricityMeterNumber."
                                                                        value={formdata.electricityMeterNumber}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>IncrementPercentage *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter IncrementPercentage"
                                                                        data-errors="Please Enter IncrementPercentage."
                                                                        name="incrementPercentage"
                                                                        value={formdata.incrementPercentage}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>SecurityDepositAmount *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter SecurityDepositAmount"
                                                                        data-errors="Please Enter SecurityDepositAmount."
                                                                        name="securityDepositAmount"
                                                                        value={formdata.securityDepositAmount}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>MonthlyRent *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter MonthlyRent"
                                                                        data-errors="Please Enter MonthlyRent."
                                                                        name="monthlyRent"
                                                                        value={formdata.monthlyRent}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>IncrementSchedule *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter IncrementSchedule"
                                                                        data-errors="Please Enter IncrementSchedule."
                                                                        name="incrementSchedule"
                                                                        value={formdata.incrementSchedule}
                                                                        onChange={handleData}
                                                                        required=""
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>CreatedAt *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={formdata.createdAt}
                                                                        onChange={handleData}
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>ClientId - ClientName *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={formdata.clientId && formdata.clientId}
                                                                        onChange={handleData}
                                                                        disabled
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>CreatedBy *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={formdata.propertymaster && formdata.propertymaster.name}
                                                                        onChange={handleData}
                                                                        disabled
                                                                    />
                                                                    <div className="help-block with-errors"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                        }
                                        <button type="submit" className="btn btn-primary mr-2">
                                            Update
                                        </button>
                                        <button type="reset" className="btn btn-danger" onClick={() => navigate(-1)}>
                                            Back
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                message.success && (
                    <div class="alert alert-success" role="alert">
                        {message.success}
                    </div>
                )
            }
            {
                message.danger && (
                    <div class="alert alert-danger mt-3" role="alert">
                        {message.danger}
                    </div>
                )
            }
        </>
    )
}

export default Update