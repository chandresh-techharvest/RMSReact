import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import signup from '../assets/images/login/01.png'
import axios from "axios";
import '../styles/floating-animations.css';

function AdminRegister() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registrationType = searchParams.get('type') || 'admin';
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = registrationType === 'owner' ? 4 : 1;

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [formData, setFormData] = useState({
    // Authentication
    email: "",
    password: "",
    // Personal Information
    name: "",
    phone: "",
    alternatePhone: "",
    aadharNumber: "",
    panNumber: "",
    // Address Information
    address: "",
    city: "",
    state: "",
    pincode: "",
    // Business Information
    companyName: "",
    businessType: "Individual",
    gstNumber: "",
    // Banking Information
    bankAccountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  const [errors, setErrors] = useState({});

  // OTP countdown effect
  useEffect(() => {
    let interval = null;
    if (otpCountdown > 0) {
      interval = setInterval(() => {
        setOtpCountdown(otpCountdown => otpCountdown - 1);
      }, 1000);
    } else if (otpCountdown === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpCountdown]);

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) { // Personal Information
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.aadharNumber) newErrors.aadharNumber = "Aadhar number is required";
      if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber)) {
        newErrors.aadharNumber = "Aadhar number must be 12 digits";
      }
      if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
      }
      // For owner registration, require email OTP verification
      if (registrationType === 'owner' && !otpVerified) {
        newErrors.email = "Please verify your email with OTP";
      }
    } else if (step === 2) { // Address Information
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
      if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Pincode must be 6 digits";
      }
    } else if (step === 3) { // Business Information (optional step)
      if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
        newErrors.gstNumber = "Invalid GST number format";
      }
    } else if (step === 4) { // Authentication
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password && formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP function
  const sendOTP = async () => {
    if (!formData.email) {
      setMessage({
        success: "",
        danger: "Please enter your email address first"
      });
      setTimeout(() => {
        clearMessage();
      }, 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        success: "",
        danger: "Please enter a valid email address"
      });
      setTimeout(() => {
        clearMessage();
      }, 3000);
      return;
    }

    setSendingOtp(true);
    try {
      await axios.post("https://rsmapi.vercel.app/owner/send-otp", {
        email: formData.email
      });

      setOtpSent(true);
      setOtpCountdown(300); // 5 minutes countdown
      setMessage({
        success: "OTP sent to your email successfully!",
        danger: ""
      });
      // Clear message after 3 seconds
      setTimeout(() => {
        clearMessage();
      }, 3000);
    } catch (error) {
      setMessage({
        success: "",
        danger: error.response?.data?.message || "Failed to send OTP"
      });
      // Clear message after 3 seconds
      setTimeout(() => {
        clearMessage();
      }, 3000);
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP function
  const verifyOTP = async () => {
    if (!otp) {
      setMessage({
        success: "",
        danger: "Please enter the OTP"
      });
      setTimeout(() => {
        clearMessage();
      }, 3000);
      return;
    }

    setVerifyingOtp(true);
    try {
      const response = await axios.post("https://rsmapi.vercel.app/owner/verify-otp", {
        email: formData.email,
        otp: otp
      });

      if (response.data.verified) {
        setOtpVerified(true);
        setMessage({
          success: "Email verified successfully!",
          danger: ""
        });
        // Clear message after 2 seconds
        setTimeout(() => {
          clearMessage();
        }, 2000);
      }
    } catch (error) {
      setMessage({
        success: "",
        danger: error.response?.data?.message || "Invalid OTP"
      });
      // Clear message after 3 seconds
      setTimeout(() => {
        clearMessage();
      }, 3000);
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Format countdown time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Personal Information";
      case 2: return "Address Details";
      case 3: return "Business Information";
      case 4: return "Account Setup";
      default: return "Registration";
    }
  };

  // Clear messages function
  const clearMessage = () => {
    setMessage({
      success: "",
      danger: ""
    });
  };

  // Handle value change with message clearing
  const handleValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
    // Clear messages when user starts typing
    if (message.success || message.danger) {
      clearMessage();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registrationType === 'owner' && currentStep < totalSteps) {
      nextStep();
      return;
    }

    // Final validation for owner registration
    if (registrationType === 'owner' && !validateStep(currentStep)) {
      return;
    }

    try {
      let endpoint = "";
      let requestData = {};

      if (registrationType === 'owner') {
        // Owner self-registration
        endpoint = "https://rsmapi.vercel.app/owner/self-register";
        requestData = {
          // Personal Information
          name: formData.name,
          phone: formData.phone,
          alternatePhone: formData.alternatePhone || null,
          aadharNumber: formData.aadharNumber,
          panNumber: formData.panNumber || null,
          // Address Information
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          // Business Information
          companyName: formData.companyName || null,
          businessType: formData.businessType,
          gstNumber: formData.gstNumber || null,
          // Banking Information
          bankAccountNumber: formData.bankAccountNumber || null,
          ifscCode: formData.ifscCode || null,
          bankName: formData.bankName || null,
          // Authentication
          email: formData.email,
          password: formData.password
        };
      } else {
        // Admin registration
        endpoint = "https://rsmapi.vercel.app/register";
        requestData = {
          email: formData.email,
          password: formData.password
        };
      }

      const res = await axios.post(endpoint, requestData);

      setMessage({
        success: res.data.message,
        danger: "",
      });

      // Store auth data if owner registration successful
      if (registrationType === 'owner' && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.owner._id);
        localStorage.setItem('userEmail', res.data.owner.email);
        localStorage.setItem('userName', res.data.owner.name);
        localStorage.setItem('role', res.data.owner.role);
        localStorage.setItem('tenant_id', res.data.tenant_id);
        localStorage.setItem('authType', 'traditional');

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }

    } catch (error) {
      setMessage({
        success: "",
        danger: error.response?.data?.message || error.message,
      });
      // Clear message after 5 seconds
      setTimeout(() => {
        clearMessage();
      }, 5000);
    }
  };

  // Render step content
  const renderStepContent = () => {
    if (registrationType !== 'owner') {
      // Admin registration - single step
      return (
        <>
          <div className="col-lg-12">
            <div className="floating-label form-group">
              <input
                className="floating-input form-control"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleValue}
                required
              />
              <label>Email *</label>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="floating-label form-group">
              <input
                className="floating-input form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleValue}
                required
              />
              <label>Password *</label>
            </div>
          </div>
        </>
      );
    }

    // Owner registration - multi-step
    switch (currentStep) {
      case 1: // Personal Information
        return (
          <>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.name ? 'is-invalid' : ''}`}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleValue}
                  required
                />
                <label>Full Name *</label>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.email ? 'is-invalid' : ''}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleValue}
                  required
                  disabled={otpVerified}
                />
                <label>Email Address *</label>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={sendOTP}
                    disabled={sendingOtp || !formData.email || otpVerified}
                    style={{ minWidth: '120px' }}
                  >
                    {sendingOtp ? 'Sending...' : otpVerified ? '✓ Verified' : 'Send OTP'}
                  </button>
                  {otpVerified && (
                    <span className="text-success ms-2">
                      <i className="fas fa-check-circle"></i> Email Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {otpSent && !otpVerified && (
              <div className="col-lg-12">
                <div className="floating-label form-group">
                  <input
                    className="floating-input form-control"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                    required
                  />
                  <label>Enter OTP *</label>
                  <div className="mt-2">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={verifyOTP}
                      disabled={verifyingOtp || !otp}
                      style={{ minWidth: '120px' }}
                    >
                      {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    {otpCountdown > 0 && (
                      <small className="text-muted ms-3">Expires in {formatTime(otpCountdown)}</small>
                    )}
                    {otpCountdown === 0 && (
                      <small className="text-danger ms-3">OTP expired. Please send a new one.</small>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.phone ? 'is-invalid' : ''}`}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleValue}
                  required
                />
                <label>Phone Number *</label>
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className="floating-input form-control"
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleValue}
                />
                <label>Alternate Phone (Optional)</label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.aadharNumber ? 'is-invalid' : ''}`}
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleValue}
                  maxLength="12"
                  required
                />
                <label>Aadhar Number *</label>
                {errors.aadharNumber && <div className="invalid-feedback">{errors.aadharNumber}</div>}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.panNumber ? 'is-invalid' : ''}`}
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleValue}
                  maxLength="10"
                  style={{ textTransform: 'uppercase' }}
                />
                <label>PAN Number (Optional)</label>
                {errors.panNumber && <div className="invalid-feedback">{errors.panNumber}</div>}
              </div>
            </div>
          </>
        );

      case 2: // Address Information
        return (
          <>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <textarea
                  className={`floating-input form-control ${errors.address ? 'is-invalid' : ''}`}
                  name="address"
                  value={formData.address}
                  onChange={handleValue}
                  required
                  rows="3"
                />
                <label>Complete Address *</label>
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.city ? 'is-invalid' : ''}`}
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleValue}
                  required
                />
                <label>City *</label>
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.state ? 'is-invalid' : ''}`}
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleValue}
                  required
                />
                <label>State *</label>
                {errors.state && <div className="invalid-feedback">{errors.state}</div>}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.pincode ? 'is-invalid' : ''}`}
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleValue}
                  maxLength="6"
                  required
                />
                <label>Pincode *</label>
                {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
              </div>
            </div>
          </>
        );

      case 3: // Business Information
        return (
          <>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className="floating-input form-control"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleValue}
                />
                <label>Company Name (Optional)</label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <select
                  className="floating-input form-control"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleValue}
                >
                  <option value="Individual">Individual</option>
                  <option value="Company">Company</option>
                  <option value="Partnership">Partnership</option>
                  <option value="LLP">LLP</option>
                </select>
                <label>Business Type</label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.gstNumber ? 'is-invalid' : ''}`}
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleValue}
                  maxLength="15"
                  style={{ textTransform: 'uppercase' }}
                />
                <label>GST Number (Optional)</label>
                {errors.gstNumber && <div className="invalid-feedback">{errors.gstNumber}</div>}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className="floating-input form-control"
                  type="text"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleValue}
                />
                <label>Bank Account Number (Optional)</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="floating-label form-group">
                <input
                  className="floating-input form-control"
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleValue}
                  maxLength="11"
                  style={{ textTransform: 'uppercase' }}
                />
                <label>IFSC Code (Optional)</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="floating-label form-group">
                <input
                  className="floating-input form-control"
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleValue}
                />
                <label>Bank Name (Optional)</label>
              </div>
            </div>
          </>
        );

      case 4: // Authentication
        return (
          <>
            <div className="col-lg-12">
              <div className="floating-label form-group">
                <input
                  className={`floating-input form-control ${errors.password ? 'is-invalid' : ''}`}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleValue}
                  required
                />
                <label>Password *</label>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>
          </>
        );

      default:
        return null;
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
                      <h2 className="mb-2">
                        {registrationType === 'owner' ? 'Owner Registration' : 'Admin Sign Up'}
                      </h2>

                      {registrationType === 'owner' && (
                        <>
                          <div className="mb-3">
                            <small className="text-muted">Step {currentStep} of {totalSteps}: {getStepTitle()}</small>
                            <div className="progress mt-2" style={{ height: '4px' }}>
                              <div
                                className="progress-bar"
                                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </>
                      )}

                      <p>
                        {registrationType === 'owner'
                          ? `${getStepTitle()} - Please fill in your details.`
                          : 'Create Your Rent Management System.'}
                      </p>

                      {/* Message Display */}
                      {message.success && (
                        <div className="alert alert-success alert-dismissible" role="alert">
                          <i className="fas fa-check-circle me-2"></i>
                          {message.success}
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={clearMessage}
                          ></button>
                        </div>
                      )}
                      {message.danger && (
                        <div className="alert alert-danger alert-dismissible" role="alert">
                          <i className="fas fa-exclamation-triangle me-2"></i>
                          {message.danger}
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={clearMessage}
                          ></button>
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          {renderStepContent()}

                          {registrationType !== 'owner' && (
                            <div className="col-lg-6 justify-content-end">
                              <Link to="/forgotPassword">Forgot Password?</Link>
                            </div>
                          )}
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                          {registrationType === 'owner' && currentStep > 1 && (
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                              Previous
                            </button>
                          )}

                          <button type="submit" className="btn btn-primary">
                            {registrationType === 'owner'
                              ? (currentStep === totalSteps ? 'Complete Registration' : 'Next')
                              : 'Sign Up'
                            }
                          </button>
                        </div>

                        <p className="mt-3">
                          Already have an Account{" "}
                          <Link className="text-primary" to="/">
                            Sign In
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-5 content-right">
                    <img
                      src={signup}
                      className="img-fluid image-right floating-image"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminRegister;