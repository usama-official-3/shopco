import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Lottie from 'lottie-react';
import celebration from "../Animations/celebration.json"


const Orderplaced = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const move = useNavigate();
    const cu = useSelector((store) => store.userSection.cu);
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        try {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BASE_URL}/order`)
                .then((res) => {
                    if (res.data && res.data.length > 0) {
                        setOrder(res.data);
                        setLoading(false);
                    }
                });
        } catch (e) {
        }
    }, []);

    const filterOrder = order.filter((item) => userId === item.userId);

    return (
        <div className="container my-4">
            <div className="row">
                {loading ? (
                    <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                        <Loader />
                    </div>

                ) : filterOrder.length > 0 ? (
                    <div className="col-12 d-flex flex-column  align-items-center mb-5">
                        <img src="/express.png" className='img-fluid' style={{ width: "250px" }} alt="" />

                        <p className='text-center mt-3' style={{ lineHeight: "35px" }}>
                            <span className='fs-1 fw-bolder' style={{ fontFamily: "Times New Roman" }}>Thank you for placing an order</span><br />
                            <span className='fs-5' style={{ fontFamily: "Times New Roman" }}>Order Tracking ID is: <b>{filterOrder[0].orderId}</b></span>  <br />
                            <span className='fs-5' style={{ fontFamily: "Times New Roman" }}>Order will be delivered within 05-07 working days. We will update you soon.</span>
                        </p>
                        <div className='order_btns'>
                            <a href={`/order-detail/${filterOrder[0]._id}`}>
                                <button className="button-submit cursor px-5" type='button'>
                                    Order Detail
                                </button>
                            </a>

                            <a href="/Products/all">
                                <button className="button-submit cursor px-5" type='button'>
                                    Shop our products
                                </button>
                            </a>

                        </div>
                    </div>
                ) : (
                    <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "80vh" }}>
                        <img src="/cart.png" alt="" style={{ width: "150px" }} />
                        <p className="fw-bolder mt-3">Your Cart is Empty</p>
                        <a href="/Products/all">
                            <button
                                className="button-submit px-5"
                            >
                                Shop our products
                            </button>
                        </a>
                    </div >
                )

                }
            </div >
        </div >
    );
};

export default Orderplaced;
