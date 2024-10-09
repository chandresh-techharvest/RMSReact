import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminRegister() {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  const handleValue = (e) => {
    e.preventDefault();

    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://rsmapi.vercel.app/register",
        formdata
      );

      setMessage({
        ...message,
        success: res.data.message,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage({
        ...message,
        danger: "Error, While submitting form",
      });
    } finally {
      setFormData({
        email: "",
        password: "",
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
  };

  return (
    <section className="login-content">
      <div className="container">
        <div className="row align-items-center justify-content-center height-self-center">
          <div className="col-lg-8">
            <div className="card auth-card">
              <div className="card-body p-0">
                <div className="d-flex align-items-center auth-content">
                  <div className="col-lg-7 align-self-center">
                    <div className="p-3">
                      <h2 className="mb-2">Sign Up</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="floating-label form-group">
                              <input
                                className="floating-input form-control"
                                type="text"
                                name="email"
                                required
                                value={formdata.email}
                                onChange={handleValue}
                              />
                              <label>Email</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="floating-label form-group">
                              <input
                                className="floating-input form-control"
                                type="password"
                                name="password"
                                required
                                value={formdata.password}
                                onChange={handleValue}
                              />
                              <label>Password</label>
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Sign Up
                        </button>
                        <p className="mt-3">
                          Already have an Account <a href="/">Sign In</a>
                        </p>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-5 content-right">
                    <img
                      src="/static/media/01.06d3e2b9b8d4d8eb8a6d.png"
                      className="img-fluid image-right"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {message.success && (
        <div class="alert alert-success" role="alert">
          {message.success}
        </div>
      )}
      {message.danger && (
        <div class="alert alert-danger mt-3" role="alert">
          {message.danger}
        </div>
      )}
    </section>
  );
}

export default AdminRegister;
