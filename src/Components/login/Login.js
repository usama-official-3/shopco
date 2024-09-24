import React, { useState, useEffect } from 'react';
import Benefits from '../Benefits/Benefits';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import "./login.css"


export const Login = () => {
 

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const { productId, title } = useParams();
  const cu = useSelector(store => store.userSection.cu);
  const [Error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const move = useNavigate();
  const dispatch = useDispatch();

  const Login = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, data);
      let loginUser = response.data;
      console.log(loginUser)
      if (loginUser) {
        localStorage.setItem('userToken', loginUser.myToken);
        dispatch({
          type: "LOGIN_USER",
          payload: loginUser.user,
        });
        toast.success("Login Successful");
        if (loginUser.user.role === "admin") {
          return move('/admin-dashboard');
        } else if (productId) {
          return move(`/product/${title.replace(/ /g, '-')}/${productId}`);
        } else if (!productId) {
          return move("/");
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setError("Invalid Credentials");
      }
    }
  };

  return (
    <>
      <div className='container my-5'>
        <div className='row d-flex justify-content-center'>
          <div className='col-lg-6 col-md-6 col-sm-12 border rounded-3 p-lg-5 p-sm-2'>
            <div>
              <p className='title'>Login</p>
            </div>
            <form className="form" onSubmit={handleSubmit(Login)}>
              {Error === "Invalid Credentials" && (
                <div className='error mb-3'> Invalid Credentials </div>
              )}
              <div className="flex-column">
                <label>Email *</label>
              </div>
              <div className="inputForm">
                <MdOutlineAlternateEmail size={20} />
                <input
                  required={true}
                  autoComplete="off"
                  type="email"
                  placeholder='Enter Your Email'
                  className="input w-100"
                  {...register('email', {
                    required: true,
                    validate: (typedValue) => {
                      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(typedValue);
                    }
                  })}
                />
              </div>
              {errors.email && <div className='error'>Valid email is required</div>}

              <div className="flex-column">
                <label>Password *</label>
              </div>
              <div className="inputForm">
                <input
                  required={true}
                  autoComplete="off"
                  placeholder='Enter Your Password'
                  type={showPassword ? "text" : "password"}
                  className="input w-100"
                  {...register('password', { required: true })}
                />
                {errors.password && <div className='error'>Password is required</div>}
                <span
                  className="password-toggle-btn fs-5"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {/* Forgot Password Link */}
              <div className="d-flex justify-content-end mb-0">
                <a href="/enteremail" className="forgot-password-link">
                  Forgot password?
                </a>
              </div>

              <button className="button-submit">Login</button>

              <p className="p">
                Don't have an account?&nbsp;&nbsp;
                {productId ? (
                  <a href={`/signup/${title}/${productId}`}>
                    <span className='register_btn'>Signup</span>
                  </a>
                ) : (
                  <a href="/signup">
                    <span className='register_btn'>Signup</span>
                  </a>
                )}
              </p>
            </form>
          </div>
        </div>
        <div className='row'>
          <Benefits />
        </div>
      </div>
    </>
  );
}
