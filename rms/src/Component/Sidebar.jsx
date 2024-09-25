import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem('role');
  return (
    <div className="iq-sidebar  sidebar-default ">
      <div className="iq-sidebar-logo d-flex align-items-center justify-content-between">
        <a href="../backend/index.html" className="header-logo">
          <img
            src="../assets/images/logo.png"
            className="img-fluid rounded-normal light-logo"
            alt="logo"
          />
          <h5 className="logo-title light-logo ml-3">POSDash</h5>
        </a>
        <div className="iq-menu-bt-sidebar ml-0">
          <i className="las la-bars wrapper-menu"></i>
        </div>
      </div>
      <div
        className="data-scrollbar"
        data-scroll="1"
        data-scrollbar="true"
        tabindex="-1"
      // style="overflow: hidden; outline: none;"
      >
        <div className="scroll-content">
          <nav className="iq-sidebar-menu">
            <ul id="iq-sidebar-toggle" className="iq-menu">
              <li className="active">
                <a href="../backend/index.html" className="svg-icon">
                  <svg
                    className="svg-icon"
                    id="p-dash1"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  <span className="ml-4">Dashboards</span>
                </a>
              </li>
              {
                role === "SuperAdmin" ? (
                  <li className=" ">
                    <a
                      href="#ownermaster"
                      className="collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <svg
                        className="svg-icon"
                        id="p-dash2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span className="ml-4">OwnerMaster</span>
                      <svg
                        className="svg-icon iq-arrow-right arrow-active"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="10 15 15 20 20 15"></polyline>
                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                      </svg>
                    </a>
                    <ul
                      id="ownermaster"
                      className="iq-submenu collapse"
                      data-parent="#iq-sidebar-toggle"
                    >
                      <li className="">
                        <a href="../backend/page-list-product.html">
                          <i className="las la-minus"></i>
                          <Link to="listownermaster">List OwnerMaster</Link>
                        </a>
                      </li>
                      <li className="">
                        <a href="../backend/page-add-product.html">
                          <i className="las la-minus"></i>
                          <Link to="addownermaster">Add OwnerMaster</Link>
                        </a>
                      </li>

                      
                    </ul>
                  </li>
                ) : (
                  <>
                  <li className=" ">
                    <a
                      href="#propertymaster"
                      className="collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <svg
                        className="svg-icon"
                        id="p-dash2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span className="ml-4">PropertyMaster</span>
                      <svg
                        className="svg-icon iq-arrow-right arrow-active"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="10 15 15 20 20 15"></polyline>
                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                      </svg>
                    </a>
                    <ul
                      id="propertymaster"
                      className="iq-submenu collapse"
                      data-parent="#iq-sidebar-toggle"
                    >
                      <li className="">
                        <a href="../backend/page-list-product.html">
                          <i className="las la-minus"></i>
                          <Link to="listpropertymaster">List PropertyMaster</Link>
                        </a>
                      </li>
                      <li className="">
                        <a href="../backend/page-add-product.html">
                          <i className="las la-minus"></i>
                          <Link to="addpropertymaster">Add PropertyMaster</Link>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className=" ">
                    <a
                      href="#rentmaster"
                      className="collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <svg
                        className="svg-icon"
                        id="p-dash2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span className="ml-4">RentMaster</span>
                      <svg
                        className="svg-icon iq-arrow-right arrow-active"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="10 15 15 20 20 15"></polyline>
                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                      </svg>
                    </a>
                    <ul
                      id="rentmaster"
                      className="iq-submenu collapse"
                      data-parent="#iq-sidebar-toggle"
                    >
                      <li className="">
                        <a href="../backend/page-list-product.html">
                          <i className="las la-minus"></i>
                          <Link to="listrentmaster">List RentMaster</Link>
                        </a>
                      </li>
                      <li className="">
                        <a href="../backend/page-add-product.html">
                          <i className="las la-minus"></i>
                          <Link to="addrentmaster">Add RentMaster</Link>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className=" ">
                    <a
                      href="#clientmaster"
                      className="collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <svg
                        className="svg-icon"
                        id="p-dash2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span className="ml-4">ClientMaster</span>
                      <svg
                        className="svg-icon iq-arrow-right arrow-active"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="10 15 15 20 20 15"></polyline>
                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                      </svg>
                    </a>
                    <ul
                      id="clientmaster"
                      className="iq-submenu collapse"
                      data-parent="#iq-sidebar-toggle"
                    >
                      <li className="">
                        <a href="../backend/page-list-product.html">
                          <i className="las la-minus"></i>
                          <Link to="listclientmaster">List ClientMaster</Link>
                        </a>
                      </li>
                      <li className="">
                        <a href="../backend/page-add-product.html">
                          <i className="las la-minus"></i>
                          <Link to="addclientmaster">Add ClientMaster</Link>
                        </a>
                      </li>
                    </ul>
                  </li>
                  </>
                )
              }
            </ul>
          </nav>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;
