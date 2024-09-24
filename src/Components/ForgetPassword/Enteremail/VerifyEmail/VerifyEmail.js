import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Optional, for user notifications

export const VerifyEmail = () => {
  const [loading,setLoading]=useState(false)

  const [isVerified, setIsVerified] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Get token from URL params
  const navigate = useNavigate();

  // Function to verify the token
  const verifyEmailToken = async () => {
    try {
      const response = await axios.get(`https://backend-web-phi.vercel.app/reset-password/${token}`);
      if (response.status === 200) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
        setError('Invalid or expired token.');
      }
    } catch (err) {
      setIsVerified(false);
      setError('An error occurred during verification.');
    }
  };

  // Function to handle password reset submission
  const handlePasswordSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (newPassword !== reEnterPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`https://backend-web-phi.vercel.app/reset-password/${token}`, {
        password: newPassword,
      });
      if (response.status === 200) {
        setLoading(false)
        toast.success('Password changed successfully.');
        navigate('/login');
      }
    } catch (err) {
      setLoading(false)
      setError('Error resetting password.');
    }
  };

  // Verify the email token when the component mounts
  useEffect(() => {
    verifyEmailToken();
  }, [token]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#212529',
        color: 'white',
      }}
    >
      {isVerified === null && <p>Verifying token...</p>}

      {isVerified === true && (
        <>
          <p style={{ fontSize: '24px', marginBottom: '20px' }}>Your token is valid, please reset your password.</p>
          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
              }}
              required
            />
            <input
              type="password"
              placeholder="Re-enter New Password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              style={{
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
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
          width: "2rem",
          height: "2rem",
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
        </>
      )}

      {isVerified === false && (
        <p style={{ color: 'red', fontSize: '24px', marginBottom: '20px' }}>{error || 'Verification failed. Please try again.'}</p>
      )}
    </div>
  );
};
