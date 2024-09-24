import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa"
import Loader from "../Loader/Loader";
import { useNavigate } from 'react-router-dom'
import "./blog.css"

const Blog = () => {


    const [blog, setBlog] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState([])
    const move = useNavigate()
    useEffect(() => {
        setLoading(true);
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/blog`).then((res) => {
                setBlog(res?.data);
            }).finally(() => {
                setLoading(false);
            });
        } catch (e) {
        }
    }, []);


    return <>
        {blog.length !== 0 &&
            <div className='container-fluid p-0 min-vh-100'>
                <div className='row mb-4'>
                    <div className='col'>
                        <h1 className='text-center fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Our Blog</h1>
                        <p className='text-center'>We prepared some helpful tips for you</p>
                    </div>
                </div>
                {loading ? (
                    <div
                        className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                        style={{ height: "50vh" }}
                    >
                        <Loader />
                    </div>
                ) : blog.length === 0 ? (
                    <div className="col-12" style={{ height: "300px" }}>
                        <p className='text-center'>No Blog Uploaded yet...</p>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-1 px-lg-3 px-2 g-4">
                        {blog?.slice(0, 3).map((data, index) => {
                            return <a href={"/blog_detail/" + data._id}>
                            <div className='col block_main' key={index}>
                                <div className='blog3 text-center'>
                                    <img src={data?.image} alt="No Network" />
                                </div>
                                <p className='fw-bolder fs-5 text-center my-4' style={{ color: "rgb(2, 2, 94)", height:"70px", overflow:"hidden" }}>{data.title}</p>
                                <p className='text-muted text-center read'>READ MORE</p>
                            </div>
                            </a> 
                        })
                        }
                    </div>
                )}
                <div className='col-lg-12 my-5 d-flex justify-content-center'>
                    <a href="/all-blog">
                        <button className='review_btn'>VIEW ALL POSTS <FaArrowRight /></button>
                    </a>
                </div>
            </div>
        }
        {/* <div className='d-flex flex-wrap  gap-3 justify-content-center my-5 px-4 '>
                        <div className='block_main ' onClick={() => move("/single-blog/clean-sofa")}>
                            <div className='blog1 text-center'>
                                <img src="/blog1.webp" alt="No Network" />
                            </div>
                            <p className='fw-bolder fs-5 text-center mt-4' style={{color:"rgb(2, 2, 94)"}}>How to clean Sofa</p>
                            <p className='text-muted text-center mt-4 read'>READ MORE</p>
                        </div>
                        <div className='block_main ' onClick={() => move("/single-blog/perfect-bed")}>
                            <div className='blog2'>
                                <img src="/blog2.jpg" alt="No Network" />
                            </div>
                            <p className='fw-bolder fs-5 text-center mt-4' style={{color:"rgb(2, 2, 94)"}}>How to choose a Perfect Bed</p>
                            <p className='text-muted text-center mt-4 read' >READ MORE</p>

                        </div>
                        <div className='block_main ' onClick={() => move("/single-blog/perfect-sofa")}>
                            <div className='blog3'>
                                <img src="/blog3.jpg" alt="No Network" />
                            </div>
                            <p className='fw-bolder fs-5 text-center mt-4' style={{color:"rgb(2, 2, 94)"}}>How to choose a Perfect Sofa</p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>

                        </div>
                    </div> */}


    </>
}

export default Blog