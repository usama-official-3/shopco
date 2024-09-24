import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { useForm } from 'react-hook-form';
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';
import Loader from "../Loader/Loader"
import { FaStar } from "react-icons/fa"
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

import "./review.css"

const Review = () => {

    const cu = useSelector((store) => store.userSection.cu);
    const allComments = useSelector((store) => store.Comment.comment);
    const dispatch = useDispatch()

    const [comments, setComments] = useState([])
    const [sucess, setSucess] = useState(false)
    const [loading, setLoading] = useState(false);

    let { register, handleSubmit, reset, formState: { errors } } = useForm();

    const toggleVerify = () => {
        setSucess(!sucess);
    };


    const Comment = async (cmnt) => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, cmnt);
            if (response.data.message === "Comment Added") {
                dispatch({
                    type: "ADD_COMMENT",
                    payload: response.data.alldata,
                });
                setComments(response.data.alldata)
                setLoading(false)
                reset();
                toggleVerify();
                // toast.success("Feedback submitted");
            } else {
                // toast.error("Error occurred");
            }
        } catch (e) {
        }
    };
    useEffect(() => {

        setLoading(true);
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
                if (res) {
                    dispatch({ type: "ADD_COMMENT", payload: res.data });
                    setLoading(false)
                }
            });
        } catch (e) {
        }
    }, []);

    useEffect(() => {
        if (allComments) {
            setComments(allComments);
            setLoading(false);
        }
    }, [allComments]);

    useEffect(() => {
        if (sucess) {
            const timeoutId = setTimeout(() => {
                toggleVerify();
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [sucess]);

    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    return <>
        <div className='container-fluid p-0 ' id='review'>
            <div className='row pt-lg-0 pt-1'>
                <div className='col-lg-6 col-md-6 col-sm-12 pt-5' style={{ backgroundColor: "rgb(2, 2, 94)" }}>
                    <h1 className='text-center fs-1 fw-bolder' style={{ color: "white" }}>Our Customers</h1>
                    <p className='text-center fs-6' style={{ color: "white" }}>Over 10,000 happy customers!</p>
                    {loading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
                            <Loader />
                        </div>
                    ) : comments.length === 0 ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <h2 style={{ color: "white" }}>No Review available</h2>
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{ delay: 3000 }}
                                modules={[Autoplay]}
                                className="mySwiper"
                            >
                                {comments?.map((item, index) => {
                                    return <SwiperSlide className='review_slide' key={index}>
                                        <div className='px-3 py-2'>
                                            <p className='review_detail text-center' >
                                                {item.comment}
                                            </p>
                                            <p className='text-center' style={{ color: "white" }}>{item.name}</p>
                                            <p className='text-center' style={{ fontWeight: "700", color:"#F7EEDD" }}>{formatDateTime(item.date1 ? item.date1 : item.date)}</p>
                                        </div>
                                    </SwiperSlide>
                                })}

                            </Swiper>
                        </div>
                    )}
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12 px-lg-5 px-4  pt-5' style={{ position: "relative" }}>
                    {sucess && (
                        <div className={`succes_box px-3${sucess === "comment" ? "showVerify" : ""}`}>
                            <div className="text-end">
                                <button className="btn fw-bolder fs-3"
                                    style={{ position: "absolute", top: "0px", right: "10px", color: "red" }}
                                    onClick={() => setSucess(false)}> <RxCross1 /></button>
                            </div>
                            <img src="/verified.gif" alt="No Network" style={{ width: "70px" }} />
                            <p className="fw-bolder text-center" style={{ color: "rgb(2, 2, 94)" }}>Feedback Submitted</p>
                        </div>
                    )}
                    <h1 className='text-center fw-bolder mt-lg-2 mt-sm-5 mb-5' style={{ color: 'rgb(2, 2, 94)' }} >
                        Leave Your Feedback</h1>
                    <form action="" onSubmit={handleSubmit(Comment)}>
                        <div className="input-group mb-3">
                            <input required="true"
                                autocomplete="off"
                                type="text"
                                className="input w-100"
                                {...register('name', { required: true })}
                            />
                            <label class="user-label">Name *</label>
                            {errors.name ? <div className='error'>Name is required </div> : null}
                        </div>
                        <div className="input-group mb-3">
                            <input required="true"
                                autocomplete="off"
                                type="email"
                                className="input w-100"
                                {...register('email', { required: true })}
                            />
                            <label class="user-label">Email *</label>
                            {errors.email ? <div className='error'>E-mail is required </div> : null}
                        </div>
                        {cu.email === "asd@gmail.com" &&
                            < div className="input-group mb-3">
                                <input
                                    autocomplete="off"
                                    type="date"
                                    className="input w-100"
                                    {...register('date1')}
                                />
                            </div>
                        }
                        <div className="input-group mb-3">
                            <textarea required="true"
                                type="text"
                                autocomplete="off"
                                className="input w-100"
                                rows={7}
                                {...register('comment', { required: true })}
                            />
                            <label class="user-label">Write a Review *</label>
                            {errors.comment ? <div className='error'>Cannot submit empty comment</div> : null}
                        </div>
                        <button type="submit" className="btn mt-2 review_btn w-100" >
                            Submit
                        </button>
                    </form>

                </div>
            </div >

        </div >
    </>
}

export default Review