import React from 'react'
import { FaTwitter, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
const Footer = () => {
    return <>
        <>
            {/* Footer */}
            <footer className="text-center text-lg-start" style={{ backgroundColor: "#F0EEED" }} >
                {/* Section: Social media */}
                <section className="container d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block fw-bold">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div className='fs-4'>
                        <a href="" className="me-4 text-reset">
                            <FaFacebook />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <FaTwitter />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <FaInstagram />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <FaTiktok />
                        </a>
                    </div>
                    {/* Right */}
                </section>
                {/* Section: Social media */}
                {/* Section: Links  */}
                <section className="">
                    <div className="container  text-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <img src="logo.png" alt="" />
                                <p className='mt-3'>
                                    We have clothes that suits your style and which you’re proud to wear.
                                    From women to men.
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Information</h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Shop Now
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Reviews
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        New Arrival
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Top Selling
                                    </a>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Products
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Special Offers
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Terms & Conditions
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        FAQ's
                                    </a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <i className="fas fa-home " /> Faisalabad, Punjab, Pakistan
                                </p>
                                <p>
                                    <i className="fas fa-envelope" />
                                    sharjeelakhtar245@gmail.com
                                </p>
                                <p>
                                    <i className="fas fa-phone" /> +923067208343
                                </p>
                                <p>
                                    <i className="fas fa-print" /> +923419285604
                                </p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}
                {/* Copyright */}
                <div
                    className="text-center p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                >
                    © 2024 Copyright:
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
                        Excellence Institute
                    </a>
                </div>
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </>

    </>
}

export default Footer