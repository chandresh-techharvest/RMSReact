import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

function Detail() {

    const [data, setData] = useState([])

    const url = new URLSearchParams(window.location.search)

    const { whichroute } = useParams();

    const id = url.get('Id')

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://rsmapi.vercel.app/${whichroute}/${id}`)
            setData(await res.data)
            console.log(res.data);

        }

        getData();
    }, [])

    return (
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
                                        data && Object.keys(data).map((item, index) => (
                                            item != '_v' && item != 'ownerMasters' && item!='pincode' ? (
                                                <div className="col-md-6" key={index}>
                                                    <div className="form-group">
                                                        <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                        <div className="help-block">{data[item]}</div>
                                                    </div>
                                                </div>
                                            ) : (null)
                                        ))
                                    }
                                </div>
                                {/* <Link to={`/dashboard/list${whichRoute === "products" ? whichRoute.slice(0, -1) : whichRoute}`}>
                                    <button className="btn btn-primary mr-2">Back</button>
                                </Link> */}
                            </div>

                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default Detail