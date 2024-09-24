import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // For better user notifications
import { useNavigate } from 'react-router-dom';

const Enteremail = () => {
  const [loading,setLoading]=useState(false)

  const [email, setEmail] = useState('');
const navigate = useNavigate()
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await axios.post(`https://backend-web-phi.vercel.app/forgot-password`, { email });

      // If the request was successful
      toast.success('Password reset email sent successfully!');
      setEmail(''); // Clear the email input
      navigate('/checkinbox');
       // Navigate to the next step
       setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('No user found with that email.');
        setLoading(false);
      } else {
        toast.error('Failed to send reset email. Please try again later.');
        setLoading(false);

      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Enter Your Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" className="btn" style={styles.button}>
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
      </div>
    </div>
  );
};

// Custom styles using inline CSS
const styles = {
  container: {
    backgroundColor: '#212529',
    color: 'white',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#343a40',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    marginBottom: '20px',
    width: '100%',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '4px',
    backgroundColor: '#4caf50',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Enteremail;
