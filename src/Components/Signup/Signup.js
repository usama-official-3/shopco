import React, { useState, useEffect } from 'react'
import Benefits from "../Benefits/Benefits"
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router'
import { FaEye, FaEyeSlash, FaRegUser, FaPhoneAlt, FaAddressBook } from 'react-icons/fa';
import { toast } from "react-toastify";

import axios from 'axios';
import "./signup.css"

const Signup = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const { title, productId } = useParams();
const [loading,setLoading]=useState(false)
    const [Error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const move = useNavigate()

    async function SignUp(data) {
        // console.log(data,'data here')
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signUp`, data);
            console.log(response.data.message)
            console.log(response.data , "here is data ")
            console.log(response.data.email,"user email is this")
            console.log(response.data._id,"user id is this")
            if (response.data.message === "User Created. Please verify your email using the OTP sent.") {                
                // if (productId) {
                //     move(`/login/${title.replace(/ /g, '-')}/${productId}`)
                // } else {
                //     move('/login')
                // }

                setLoading(false)
                move(`/enterotp/${response.data.email}`)
                toast.success("Account Created Please verify")
                reset();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('This E-mail is already registered. Please login')
                setLoading(false)
            } else {
                setError('This E-mail is already registered. Please login')
                setLoading(false)
            }
            setLoading(false)
        }
    }

    return <>
        <div className='container my-5'>
            <div className='row d-flex justify-content-center ل'>
                <div className='col-lg-6 col-md-8 col-sm-12 border rounded-3 p-lg-5 p-sm-2'>
                    <div>
                        <p className='title'>Register</p>
                    </div>
                    <div>
                        {/* <p className='m-0 fs-2 text-center fw-bolder'>Create Your Account</p> */}
                        <p className='my-3 fs-6 text-center '>Please fill in the infromation below</p>
                    </div>
                    <form className="form" action="" onSubmit={handleSubmit(SignUp)}>
                        {Error &&
                            <div className='error mb-3 py-2'>{Error}</div>
                        }
                        <div className="flex-column">
                            <label>Name *</label>
                        </div>
                        <div className="inputForm">
                            <svg className='mt-3'
                                height={40}
                                viewBox="0 0 32 32"
                                width={40}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <FaRegUser />
                            </svg>
                            <input
                                required="true"
                                autocomplete="off"
                                type="text"
                                placeholder='Enter Your Name'
                                className="input w-100" {...register('name', { required: true })} />
                        </div>
                        {errors.name ? <div className='error'>Name is required </div> : null}
                        <div className="flex-column">
                            <label>Email *</label>
                        </div>
                        <div className="inputForm">
                            <svg
                                height={20}
                                viewBox="0 0 32 32"
                                width={20}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="Layer_3" data-name="Layer 3">
                                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                                </g>
                            </svg>
                            <input
                                required="true"
                                autocomplete="off"
                                type="email"
                                placeholder='Enter Your Email'
                                className="input w-100" {...register('email', {
                                    required: true, validate: function (typedValue) {
                                        if (typedValue.match(
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        )) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                })} />
                        </div>
                        <div className="flex-column">
                            <label>Contact *</label>
                        </div>
                        <div className="inputForm">
                            <svg
                                className='mt-3'
                                height={40}
                                viewBox="0 0 32 32"
                                width={40}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <FaPhoneAlt />
                            </svg>
                            <input
                                required="true"
                                autocomplete="off"
                                type="number"
                                min={0}
                                placeholder='Enter Your Contact Number'
                                className="input w-100" {...register('number', { required: true })} />
                        </div>
                        {errors.number ? <div className='error'>Contact Number is required </div> : null}
                        <div className="flex-column">
                            <label>Shipping Address *</label>
                        </div>
                        <div className="inputForm">
                            <svg
                                className='mt-3'
                                height={20}
                                viewBox="0 0 32 32"
                                width={20}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <FaAddressBook />
                            </svg>
                            <input
                                autocomplete="off"
                                type="text"
                                placeholder='Enter Your Shipping Address'
                                className="input w-100" {...register('address')} />
                        </div>


                        <div className="flex-column">
                            <label>Password *</label>
                        </div>
                        <div className="inputForm">
                            <svg
                                height={20}
                                viewBox="-64 0 512 512"
                                width={20}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                            </svg>
                            <input
                                required="true"
                                autocomplete="off"
                                placeholder='Enter Your Password'
                                type={showPassword ? "text" : "password"}
                                className="input w-100"
                                {...register('password', { required: true })} />
                            {errors.password ? <div className='error'>Password is required </div> : null}
                            <span
                                className="password-toggle-btn fs-5"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        <button className="button-submit">
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
      Signup
      </div>
    }

      </button>
                        <p className="p">
                            Already have an account?  &nbsp;&nbsp;
                            {productId && <a href={`/login/${title}/${productId}`}>
                                <span className='register_btn'>
                                    Login
                                </span>
                            </a>}
                            {!productId && <a href="/login">
                                <span className='register_btn'>
                                    Login
                                </span>
                            </a>}
                        </p>
                    </form>
                </div>
            </div>
            <div className='row '>
                <Benefits />
            </div>
        </div>
    </>
}

export default Signup