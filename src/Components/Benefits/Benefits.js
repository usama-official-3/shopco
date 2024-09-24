import React from 'react'
import { FaSyncAlt, FaShuttleVan, FaRegCreditCard, FaArrowRight } from "react-icons/fa"
import "./benefit.css"
const Benefits = () => {
    return <>
        <div className='container main_container mb-5' id='benefit'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-5'>
                    <div className='my-4 text-center'>
                        <h1 className='fw-bolder' style={{ color: "" }}>100% Satisfaction is Guaranteed</h1>
                        <p >Over 10,000 Happy Customers!</p>
                    </div>
                    <div className='benefit_main_box mt-5 px-lg-5 px-sm-0 gap-5'>
                        <div className='benefit_box'>
                            <div className='benefit_icon'><FaSyncAlt /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600",  }}>12 Months Warranty</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>The Most of the U.K</p></div>
                        </div>
                        <div className='benefit_box'>
                            <div className='benefit_icon'><FaRegCreditCard /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600",  }}>Flexible Payments</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>100% Secure Payments</p></div>
                        </div>
                        <div className='benefit_box'>
                            <div className='benefit_icon'><FaShuttleVan /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600",  }}>Fast Delivery</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>Delivery in as little as 5-7  days</p></div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-12 my-4 d-flex justify-content-center'>

                    <a href="/Products/all">
                        <button className='button-submit px-5'>Browse Our Products</button>
                    </a>
                </div>

            </div>
        </div>
    </>
}

export default Benefits