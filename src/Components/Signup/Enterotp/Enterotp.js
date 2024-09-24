import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const EnterOTP = () => {
  const [loading,setLoading]=useState(false)
  const [otp, setOtp] = useState('');
  const { email } = useParams();
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
      const data = {
        email: email,
        otp: otp,
      };

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/verify-email`, data);

      if (response.data.message === "User not found") {
        toast.error("User not found");
        setLoading(false)
        return;
      }

      if (response.data.message === "Email verified successfully") {
        toast.success("Verified successfully, please login!");
        setLoading(false)
        navigate('/login');
      }
setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Error occurred');
        setLoading(false)
      } else {
        setLoading(false)
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Check Your Email</h2>
      <p style={textStyle}>We have sent an <b>OTP</b> to your provided email. Please enter it below:</p>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter OTP"
          maxLength="6"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
        {loading ?
                                <>

                            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          margin:'auto',  
          width: "1.5rem",
          height: "1.5rem",
          borderTop: "4px solid white",
        //   borderBottom: "4px solid white",
        //   borderRight: "4px solid white",
          borderLeft: "4px solid white",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",  // Applying the spin animation
        }}
      ></div>
    </>
      :
      <div>
      Submit
      </div>
    }
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f7f7f7',
  padding: '20px',
};

const headingStyle = {
  color: '#333',
  fontSize: '24px',
  marginBottom: '10px',
};

const textStyle = {
  color: '#555',
  fontSize: '16px',
  textAlign: 'center',
  marginBottom: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  padding: '10px',
  width: '200px',
  fontSize: '16px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default EnterOTP;
