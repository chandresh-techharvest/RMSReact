import React from "react";
import { Link } from "react-router-dom";

function DashboardHome() {
    const role = localStorage.getItem("role");
    const userName = localStorage.getItem("userName") || "User";

    return (
        <div className="content-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                            <div>
                                <h4 className="mb-3">Welcome to Rent Management System</h4>
                                <p className="mb-0">Hello {userName}, welcome back!</p>
                            </div>
                        </div>
                    </div>

                    {role === "SuperAdmin" && (
                        <>
                            <div className="col-lg-4 col-md-6">
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="iq-icon mr-3">
                                                <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Manage Owners</h5>
                                                <p className="mb-0">View and manage property owners</p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/dashboard/listownermaster"
                                            className="btn btn-primary btn-block"
                                        >
                                            View Owners List
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="iq-icon mr-3">
                                                <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 className="mb-0">System Admin</h5>
                                                <p className="mb-0">Manage system-wide settings</p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/dashboard/addownermaster"
                                            className="btn btn-outline-primary btn-block"
                                        >
                                            Add New Owner
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {role === "Owner" && (
                        <>
                            <div className="col-lg-4 col-md-6">
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="iq-icon mr-3">
                                                <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                    <polyline points="9,22 9,12 15,12 15,22"></polyline>
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Properties</h5>
                                                <p className="mb-0">Manage your properties</p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/dashboard/listpropertymaster"
                                            className="btn btn-primary btn-block"
                                        >
                                            View Properties
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="iq-icon mr-3">
                                                <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Clients</h5>
                                                <p className="mb-0">Manage your tenants</p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/dashboard/listclientmaster"
                                            className="btn btn-primary btn-block"
                                        >
                                            View Clients
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="iq-icon mr-3">
                                                <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Rent Management</h5>
                                                <p className="mb-0">Track rent payments</p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/dashboard/listrentmaster"
                                            className="btn btn-primary btn-block"
                                        >
                                            View Rents
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {role === "ClientMaster" && (
                        <div className="col-lg-4 col-md-6">
                            <div className="card card-block card-stretch card-height">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="iq-icon mr-3">
                                            <svg
                                                width="40"
                                                height="40"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Rent Receipts</h5>
                                            <p className="mb-0">View your rent payment history</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/dashboard/listrentrecipt"
                                        className="btn btn-primary btn-block"
                                    >
                                        View Receipts
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">System Information</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Role:</strong> {role}</p>
                                        <p><strong>Authentication:</strong> {localStorage.getItem("authType") || "Traditional"}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Email:</strong> {localStorage.getItem("userEmail") || "Not Available"}</p>
                                        <p><strong>Last Login:</strong> {new Date().toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;