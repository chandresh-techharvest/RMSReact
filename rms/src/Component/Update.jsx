import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

function Update() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formdata, setformData] = useState({
        name: '',
        emailaddress: '',
        password: '',
        phone: ''
    })

    const [message, setMessage] = useState({
        success: '',
        danger: ''
    })

    useEffect(() => {

        const retriveData = async () => {
            try {
                const res = await axios.get(`https://rsmapi.vercel.app/ownermaster/${id}`)

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
            await axios.put(`/ownermaster/${id}`, formdata)

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
                                        <h4 className="card-title">Update OwnerMaster</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form
                                        onSubmit={handleSubmit}
                                        data-toggle="validator"
                                        novalidate="true"
                                    >
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
                                                        value={formdata.emailaddress}
                                                        onChange={handleData}
                                                        required=""
                                                    />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Pssword *</label>
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
                                        <button type="submit" className="btn btn-primary mr-2">
                                            Update
                                        </button>
                                        <button type="reset" className="btn btn-danger" onClick={()=>navigate(-1)}>
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