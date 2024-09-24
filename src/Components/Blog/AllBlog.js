import React, { useState, useEffect } from 'react'
import Loader from "../Loader/Loader";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AllBlog = () => {
    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // }, []);

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
        <div className='container-fluid p-0 min-vh-100'>
            <div className='row my-5'>
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
            ) : blog?.length === 0 ? (
                <div className="col-12" style={{ height: "300px" }}>
                    <p className='text-center'>No Blog Uploaded yet...</p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-1 px-lg-3 px-2 g-4">
                    {blog?.map((data, index) => {
                        return <a href={"/blog_detail/" + data._id}>
                            <div className='col block_main' key={index}>
                                <div className='blog3 text-center'>
                                    <img  src={data?.image} alt="No Network" />
                                </div>
                                <p className='fw-bolder fs-5 text-center mt-4' style={{ color: "rgb(2, 2, 94)" }}>{data.title}</p>
                                {data?.introduction && <p className='text-center mt-2 mb-4'>{data?.introduction?.slice(0, 50)}...</p>}
                                <p className='text-muted text-center read'>READ MORE</p>
                            </div>
                        </a>
                    })
                    }
                </div>
            )}
        </div>
        {/* <div className='container-fluid min-vh-100 my-5'>
            <div className='row'>
                <div className='col'>
                    <h1 className='text-center fw-bolder' style={{color:"rgb(2, 2, 94)"}}>Blog Posts</h1>
                    <p className='text-center text-muted'>November 08, 2023</p>
                    <div className='d-flex flex-wrap  gap-3 justify-content-center my-5 px-4 '>
                        <div className='block_main mt-5' onClick={() => move("/single-blog/clean-sofa")}>
                            <div className='blog1'>
                                <img src="/blog1.webp" alt="No Network" />
                            </div>
                            <p className='text-muted text-center mt-4'>JULY 05 2023</p>

                            <p className='fw-bolder fs-5 text-center mt-4' style={{color:"rgb(2, 2, 94)"}}>How to clean Sofa</p>
                            <p className='text-center mt-2'>
                                Hey, We understand a sofa is often a large investment and you want
                                to make sure it lasts as long as possible. With proper care, a high-quality sofa can last...
                            </p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>
                        </div>
                        <div className='block_main mt-5' onClick={() => move("/single-blog/perfect-bed")}>
                            <div className='blog2'>
                                <img src="/blog2.jpg" alt="No Network" />
                            </div>
                            <p className='text-muted text-center mt-4'>APRIL 10 2023</p>

                            <p className='fw-bolder fs-5 text-center mt-4' style={{color:"rgb(2, 2, 94)"}}>How to choose a Perfect Bed</p>
                            <p className='text-center mt-2'>
                                Your bed is one of the most important pieces of furniture in your home,
                                and choosing the right one can make a big difference in the overall look and feel...
                            </p>
                            <p className='text-muted text-center mt-4 read' >READ MORE</p>

                        </div>
                        <div className='block_main mt-5' onClick={() => move("/single-blog/perfect-sofa")}>
                            <div className='blog3'>
                                <img src="/blog3.jpg" alt="No Network" />
                            </div>
                            <p className='text-muted text-center mt-4'>APRIL 10 2023</p>
                            <p className='fw-bolder fs-5 text-center mt-4' style={{color:"rgb(2, 2, 94)"}}>How to choose a Perfect Sofa</p>
                            <p className='text-center mt-2'>
                                A sofa is often the centerpiece of a living room and is where you and your family and friends will spend
                                countless hours lounging and relaxing. With so many different...
                            </p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>
                        </div>
                        <div className='block_main mt-5' onClick={() => move("/single-blog/perfect-mattress")}>
                            <div className='blog4'>
                                <img src="/blog4.webp" alt="No Network" />
                            </div>
                            <p className='text-muted text-center mt-4'>APRIL 10 2023</p>
                            <p className='fw-bolder fs-5 text-center mt-4' style={{color:"rgb(2, 2, 94)"}}>How to choose a Perfect Mattress</p>
                            <p className='text-center mt-2'>
                                Are you in the market for a new mattress? With so many options available, it can be overwhelming to
                                choose the perfect one for your needs. In this blog post,...
                            </p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </>
}

export default AllBlog