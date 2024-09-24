import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useDispatch } from "react-redux";
import userPanel from "../Animations/userPanel.json"
import axios from 'axios';
import "./userPanel.css"    

const UserPanel = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const cu = useSelector((store) => store.userSection.cu);
    const move = useNavigate();
    const { userid } = useParams();
    const [order, setOrder] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            axios.get(`https://backend-web-phi.vercel.app/order`).then((res) => {
                if (res.data) {
                    setOrder(res.data);
                    setLoading(false);
                }
            });
        } catch (e) {
        }
    }, []);

    const filterOrder = order.filter((item) => item.userId === cu._id);

    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    function Logout() {
        dispatch({
            type: "LOGOUT_USER",
        });
        move("/login");
    }

    return (
        <section style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
            <div className="container py-5">
                <div className="row">
                    {loading ? (
                        <div className='col-lg col-sm-12 d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                            <Loader />
                        </div>

                    ) : (
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src="/profile.png"
                                        alt="avatar"
                                        className="rounded-circle img-fluid"
                                        style={{ width: 150 }}
                                    />
                                    <h5 className="my-3">{cu.name}</h5>
                                    <p className="text-muted mb-1">{cu.number}</p>
                                    <p className="text-muted mb-4">{cu.email}</p>

                                    <button type="button" className="button-submit px-5 ms-1 my-3" style={{ width: "100%" }} onClick={Logout}>
                                        Logout
                                    </button>
                                </div>

                            </div>
                        </div>
                    )
                    }

                    <div className='col-lg-8 col-md-8 col-sm-12'>
                        {loading ? (
                            <div className='col-lg col-sm-12 d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                                <Loader />
                            </div>
                        ) : filterOrder.length > 0 ? (
                            <>
                                    <p className='fs-5 fw-bolder m-0' style={{ color: "#1b2950" }}>Orders : {filterOrder?.length}</p>
                           <div className='row row-cols-lg-2 row-cols-md-3 row-cols-sm-2 gap-2'>
                                    {filterOrder?.map((item, index) => {
                                        const orderItemsLength = item.orderItems.length;
                                        let totalFprice = 0;
                                        item.orderItems.forEach((data) => {
                                            totalFprice += parseFloat(data?.total);
                                        });
                                        return <>
                                            <div className='col my-2 p-3' key={index} style={{ backgroundColor: "white", position: "relative" }}>
                                                <div className='row'>
                                                <p className='panel_index'>{index + 1}</p>
                                                <div className='col-4'>
                                                    <img src={item?.orderItems[0]?.image} style={{ maxHeight: '180px' }} className='rounded-3 img-fluid' alt="" />
                                                </div>
                                                <div className='col-8 ' style={{ position: "relative" }}>
                                                    <p className='m-0'>
                                                        Tracking ID: {item?.orderId}
                                                    </p>
                                                    {/* <p className='m-0'>
                                                        Contact: {item?.number1}
                                                    </p> */}
                                                    {/* <p className='m-0'>
                                                        Items: {orderItemsLength}
                                                    </p> */}
                                                    <p className='m-0'>
                                                        Total: &pound;{item?.total?.toFixed()}
                                                    </p>
                                                    <p className='m-0'>
                                                        Date: {formatDateTime(item?.date)}
                                                    </p>
                                                    <p className='m-0'>
                                                        <a href={`/order-detail/${item?._id}`}>Detail</a>
                                                    </p>
                                                    </div>
                                                    </div>

                                            </div>
                                        </>
                                    })}
                                </div>                                
                            

                            </>
                        ) : (
                            <div className='py-0 my-5 d-flex flex-column align-items-center justify-content-center gap-3' style={{ height: '50vh', backgroundColor: '#eee' }}>
                                <p className='fw-bolder text-muted'>No Order Placed yet</p>
                                <Lottie animationData={userPanel} loop={true} style={{ width: "100%", height: "100%" }} />
                                <button className='button-submit px-5 py-3 w-100' onClick={() => move('/Products/all')}>
                                    Shop our products
                                </button>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </section >
    );
};

export default UserPanel;
