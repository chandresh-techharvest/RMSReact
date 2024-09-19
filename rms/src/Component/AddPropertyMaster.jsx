import React,{useState} from 'react'
import axios from 'axios'

function AddPropertyMaster() {

    const ownerId = localStorage.getItem('ownerId')

    const [formdata, setformData] = useState({
        propertyId: '',
        pincode: '',
        address2: '',
        city: '',
        address1: '',
        state: '',
        ownerMasters: ownerId
    })

    const [message, setMessage] = useState({
        success: '',
        danger: ''
    })

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
            const res = await axios.post('/ownermaster', formdata)

            setformData({
                propertyId: '',
                pincode: '',
                address2: '',
                city: '',
                address1: '',
                state: '',
            })

            setMessage({
                ...message,
                success: res.data.message
            })


        } catch (error) {
            setMessage({
                ...message,
                danger: 'Error, While saving ownermaster'
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
                                        <h4 className="card-title">Add PropertyMaster</h4>
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
                                                    <label>PropertyId *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter PropertyId"
                                                        name="propertyId"
                                                        data-errors="Please Enter PropertyId."
                                                        value={formdata.propertyId}
                                                        onChange={handleData}
                                                        required=""
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
                                                        data-errors="Please Enter Pincode."
                                                        name="pincode"
                                                        value={formdata.pincode}
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
                                                        name="phone"
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
                                                        name="phone"
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
                                                        placeholder="Enter State"
                                                        data-errors="Please Enter State."
                                                        name="phone"
                                                        value={formdata.state}
                                                        onChange={handleData}
                                                        required=""
                                                    />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>

                                        </div>
                                        <button type="submit" className="btn btn-primary mr-2">
                                            Add
                                        </button>
                                        <button type="reset" className="btn btn-danger">
                                            Reset
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

export default AddPropertyMaster