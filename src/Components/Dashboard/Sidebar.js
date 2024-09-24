import React, { useState, useEffect } from 'react';
import {
  FaTh,
  FaBars,
  FaDiscourse,
  FaServicestack,
  FaCameraRetro,
  FaHome,
  FaQq
} from 'react-icons/fa';
import { FaBlog } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { AiFillFolderAdd } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi';
import { Dashboard } from './Dashboard';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Products } from './Products';
import { Users } from './Users';
import Comments from './Comments';
import { Orders } from './Orders';
import "./sidebar.css"


const Sidebar = () => {
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const toggle = () => setIsOpen(!isOpen);
  let cu = useSelector(store => store.userSection.cu)
  let dispatch = useDispatch()

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  let move = useNavigate()

  function Logout() {
    dispatch({
      type: 'LOGOUT_USER'
    });
    toast.success("Logout")
    move('/login');
  }

  return (
    <div className="container-fluid p-0 m-0">
      <div className='d-flex flex-nowrap'>
        <div style={{ width: isOpen ? '220px' : '50px' }} className="sidebar">
         
          <div className={`link mt-3 ${activeComponent === 'dashboard' ? 'active' : ''}`} onClick={() => handleMenuClick('dashboard')}>
            <div className="icon">
              <FaTh />
            </div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              Dashboard
            </div>
          </div>

          <div className={`link ${activeComponent === 'product' ? 'active' : ''}`} onClick={() => handleMenuClick('product')}>
            <div className="icon">
              <FaDiscourse />
            </div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              Products
            </div>
          </div>


          <div className={`link ${activeComponent === 'users' ? 'active' : ''}`} onClick={() => handleMenuClick('users')}>
            <div className="icon">
              <FaServicestack />
            </div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              Users
            </div>
          </div>

          <div className={`link ${activeComponent === 'comments' ? 'active' : ''}`} onClick={() => handleMenuClick('comments')}>
            <div className="icon">
              <FaCameraRetro />
            </div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              Comments
            </div>
          </div>

          <div className={`link ${activeComponent === 'addProduct' ? 'active' : ''}`}
            onClick={() => move('/admin-dashboard-add-product')}>
            <div className="icon">
              <AiFillFolderAdd />
            </div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              Add Product
            </div>
          </div>

          <div className={`link ${activeComponent === 'addBlog' ? 'active' : ''}`}
            onClick={() => move('/admin-dashboard-add-blog')}>
            <div className="icon">
              <FaBlog />
            </div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              Add Blog
            </div>
          </div>

          <div className="link" onClick={() => {
            move("/")
          }}>
            <div className="icon">
              <FaHome />
            </div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text" >
              Home
            </div>
          </div>

          <div className="link mb-1" onClick={Logout}>
            <div className="icon">
              <BiLogOut />
            </div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text" >
              Logout
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="bars">
              {isOpen ? (
                <div onClick={toggle}>
                  <IoIosArrowBack />
                </div>
              ) : (
                <div onClick={toggle}>
                  <IoIosArrowForward />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="dashboard">
          {activeComponent === 'dashboard' && 
          <Dashboard />
          }
          {activeComponent === 'orders' && 
          <Orders />
          }
          {activeComponent === 'users' && 
          <Users />
          }
          {activeComponent === 'product'
           && <Products />
           }
          {activeComponent === 'comments' &&
           <Comments />
           }
        </div>
      </div>

    </div>
  );
};

export default Sidebar;