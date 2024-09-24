import React, { useEffect, useState } from 'react';
import {
    FaUsers, FaClipboardList, FaFirstOrder, FaCommentDots, FaBlog,
    FaTh,
    FaBars,
    FaDiscourse,
    FaServicestack,
    FaCameraRetro,
    FaHome,
    FaQq
} from "react-icons/fa";
import { AiFillFolderAdd } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi';
import { Users } from "./Users"
import { Products } from "./Products"
import { Orders } from "./Orders"
import Comments from './Comments';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css";
import Blogs from './Blogs';
import Collections from './Collections';
import AddCollections from './AddCollections';

export const Dashboard = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);

    let cu = useSelector(store => store.userSection.cu)
    const move = useNavigate()

    const [users, setUsers] = useState([])
    const [product, setProducts] = useState([])
    const [comment, setComments] = useState([])
    const [order, setOrder] = useState([])
    const [blog, setBlog] = useState([])
    const [collection, setCollection] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState('users')

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard`).then((res) => {
                setUsers(res.data.Users)
                setProducts(res.data.Products)
                setComments(res.data.comments)
                setOrder(res.data.allOrder)
                setBlog(res.data.allBlog)
                setCollection(res.data.allCollection)
            })
        } catch (e) { } finally {
            setIsLoading(false)
        }
    }, [])


    const handleItemClick = (id) => {
        setFile(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // if (cu.email != "asd@gmail.com") {
    //     return move('/')
    // } else if (cu._id === undefined) {
    //     return move('/')
    // }

    return (
        <>
            <div className='container my-3'>
                <div className='row'>
                    <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
                        <h1 className="p_head">
                            Dashboard
                        </h1>
                    </div>
                </div>
                <div className='row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-3'>
                    {isLoading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }}>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {/* Add Collection */}
                            <div className='col'>
                                <div className='p-3 admin_card' onClick={() => move('/admin-dashboard-add-collection')}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p className='admin_card_title m-0'>Add Collection</p>
                                            {/* <p className='admin_card_number'>{collection.length}</p> */}
                                        </div>
                                        <div className='card_icon'>
                                            <FaBlog />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Add Products */}
                            <div className='col'>
                                <div className='p-3 admin_card'  onClick={() => move('/admin-dashboard-add-product')}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p className='admin_card_title'>Add Product</p>
                                            {/* <p className='admin_card_number'>{collection.length}</p> */}
                                        </div>
                                        <div className='card_icon'>
                                            <AiFillFolderAdd />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Add Blog */}
                            <div className='col'>
                                <div className='p-3 admin_card'   onClick={() => move('/admin-dashboard-add-blog')}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p className='admin_card_title'>Add Blog</p>
                                            {/* <p className='admin_card_number'>{collection.length}</p> */}
                                        </div>
                                        <div className='card_icon'>
                                            <FaBlog />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Collections */}
                            <div className='col'>
                                <div className='p-3 admin_card' onClick={()=>setFile("collections")}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p className='admin_card_title'>Collections</p>
                                            <p className='admin_card_number'>{collection.length}</p>
                                        </div>
                                        <div className='card_icon'>
                                            <FaBlog />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Orders */}
                            <div className='col'>
                                <div className='p-3 admin_card' onClick={()=>setFile("orders")}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p className='admin_card_title'>Orders</p>
                                            <p className='admin_card_number'>{order.length}</p>
                                        </div>
                                        <div className='card_icon'>
                                            <FaFirstOrder />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Users */}
                            <div className='col'>
                                <div className='p-3 admin_card'onClick={()=>setFile("users")}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p className='admin_card_title'>Users</p>
                                            <p className='admin_card_number'>{users.length}</p>
                                        </div>
                                        <div className='card_icon'>
                                            <FaUsers />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Products */}
                            <div className='col'>
                                <div className='p-3 admin_card' onClick={()=>setFile("products")}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p className='admin_card_title'>Products</p>
                                            <p className='admin_card_number'>{product.length}</p>
                                        </div>
                                        <div className='card_icon'>
                                            <FaClipboardList />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Reviews */}
                            <div className='col'>
                                <div className='p-3 admin_card' onClick={()=>setFile("reviews")}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p className='admin_card_title'>Reviews</p>
                                            <p className='admin_card_number'>{comment.length}</p>
                                        </div>
                                        <div className='card_icon'>
                                            <FaCommentDots />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                    )}

                </div>

                <div className='row'>
                    {file === "collections" &&
                        <div className='col-12'>
                            <Collections />
                        </div>
                    }
                    {file === "users" &&
                        <div className='col-12'>
                            <Users />
                        </div>
                    }
                    {file === "products" &&
                        <div className='col-12'>
                            <Products />
                        </div>
                    }
                    {file === "reviews" &&
                        <div className='col-12'>
                            <Comments />
                        </div>
                    }
                    {file === "blogs" &&
                        <div className='col-12'>
                            <Blogs />
                        </div>
                    }
                    {file ==="orders" &&
                        <div className='col-12'>
                        <Orders />
                    </div>
                

                    }
                </div>
            </div>
        </>
    );
};
