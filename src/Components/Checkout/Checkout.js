import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../Loader/Loader';
import Lottie from 'lottie-react';
import CartAnimation from "../Animations/CartAnimation.json"
import { FaArrowRight, FaAngleDown } from "react-icons/fa"
import TagManager from 'react-gtm-module';
import "./checkout.css"

const Checkout = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);

    const cu = useSelector(store => store.userSection.cu)
    const allCartItems = useSelector((store) => store.Cart.cart);
    const { userId } = useParams();
    const dispatch = useDispatch()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const move = useNavigate()
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([])
    const [expandedItems, setExpandedItems] = useState({});
    const [payment, setPayment] = useState(false)

    const togglePayment = () => {
        setPayment(!payment)
    }

    const sendWhatsAppMessage = () => {
        const message = `I want to place this order \n\n${window.location.href}`;
        const whatsappURL = `https://wa.me/+447392608087?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    };

    const toggleDetails = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/checkout?userId=${userId}`).then((res) => {
            try {
                if (res) {
                    // dispatch({
                    //     type: "BEGIN_CHECKOUT",
                    //     payload: res.data,
                    // });
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: res.data,
                    });
                    setLoading(false);
                    const totalSum = res.data.reduce((accumulator, item) => {
                        return accumulator + item.total;
                    }, 0);
                    const totalQuantity = res.data.reduce((accumulator, item) => {
                        return accumulator + item.quantity;
                    }, 0);
                    const shippingFee = () => {
                        if (totalQuantity === 1) {
                            return 50;
                        } else if (totalQuantity === 2) {
                            return 70;
                        } else {
                            return 99;
                        }
                    };
                    const shippingFeeAmount = shippingFee();
                    const total = totalSum + shippingFeeAmount;
                }
            } catch (e) {
                // console.log(e);
            } finally {
                setLoading(false);
            }
        });
    }, []);

    useEffect(() => {
        if (allCartItems) {
            setCart(allCartItems);
        }

    }, [allCartItems]);

    const filterCart = cart.filter((item) => item.userId === userId)

    const DeleteCartItem = async (itemId, userId) => {
        try {
            setLoading(true);
            const response = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/chkdeleteCart?userId=${userId}&id=${itemId}`
            );
            if (response.data.status === "success") {

                dispatch({
                    type: "ADD_TO_CART",
                    payload: response.data.alldata,
                });

                setLoading(false);
                // toast.success("Item Removed");
            }
        } catch (e) {
            // console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const totalSum = filterCart.reduce((accumulator, item) => {
        return accumulator + item.total;
    }, 0);
    const totalQuantity = filterCart.reduce((accumulator, item) => {
        return accumulator + item.quantity;
    }, 0);

    const shippingFee = () => {
        if (totalQuantity === 1) {
            return 50;
        } else if (totalQuantity === 2) {
            return 70;
        } else {
            return 99;
        }
    };
    const shippingFeeAmount = shippingFee();

    const total = totalSum + shippingFeeAmount;

    async function Order(data) {

        window.scrollTo({
            top: 0
        });

        try {
            setLoading(true);
            const orderItems = [];
            const orderId = uuidv4().replace(/\D/g, '').substr(0, 10);
            filterCart.forEach((item) => {
                const itemData = {
                    title: item.title,
                    productId: item.productId,
                    sn: item.sn,
                    category: item.category,
                    image: item.image,
                    subCategory: item.subCategory,
                    price: parseFloat(item.price).toString(),
                    total: parseFloat(item.total).toString(),
                    quantity: parseInt(item.quantity).toString(),
                    discount: item.discount,
                    size: item.size,
                    color: item.color,
                    fabric: item.fabric,
                    detail: item.detail,
                    base: item.base,
                    headboard: item.headboard,
                    ottoman: item.ottoman,
                    mattress: item.mattress,
                };
                orderItems.push(itemData);
            });
            const totalSum = filterCart.reduce((accumulator, item) => {
                return accumulator + item.total;
            }, 0);
            const totalQuantity = filterCart.reduce((accumulator, item) => {
                return accumulator + item.quantity;
            }, 0);

            const shippingFee = () => {
                if (totalQuantity === 1) {
                    return 50;
                } else if (totalQuantity === 2) {
                    return 70;
                } else {
                    return 99;
                }
            };
            const shippingFeeAmount = shippingFee();

            const Ordertotal = totalSum + shippingFeeAmount;
            const orderItemsJSON = JSON.stringify(orderItems);
            data.orderItems = orderItemsJSON;
            data.orderId = orderId;
            data.total = Ordertotal;
            data.userId = userId;
            data.street = data.street;
            data.shipping = shippingFeeAmount;
            data.appartment = data.appartment;

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Order`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data === "Order is Placed") {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: response.data.alldata,
                });
                setLoading(false);
                move(`/order-placed/${userId}`)
            }

        } catch (e) {
            // console.log(e);
        }
    };

    if (loading) {
        return (
            <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <Loader />
            </div>
        );
    }
    return <>

        <div className='container-fluid '>
            {/* <div className="row">
                <div className="col px-0" style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden" }}>
                    <img src="/chk.jpeg" alt="No Network" className='all_img' style={{ width: "100%", height: "100%" }} />
                    <div
                        className='d-flex align-items-center justify-content-center'
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            top: '0',
                            left: '0',
                            backgroundColor: 'rgb(27, 41, 80,0.5)',
                            color: '#fff',
                            padding: '10px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <p
                            className="fs-2 fw-bolder text-center"
                            style={{ color: "white" }}
                        >
                            Checkout !
                        </p>
                    </div>
                </div>
            </div> */}
            <div className='row checkout_display d-flex justify-content-center my-lg-3'>
                {loading ? (
                    <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                        <Loader />
                    </div>
                ) : filterCart?.length > 0 ? (
                    <>
                        <div className='col-lg-6 col-md-6 col-sm-12 py-3 px-3 mt-3 mt-lg-0 ' style={{ backgroundColor: "white", borderRight: "1px solid lightgray" }}>
                            <h4 className="mb-3 fw-bolder" style={{ color: "rgb(27, 41, 80)" }}>Delivery Details</h4>
                            <form action="" onSubmit={handleSubmit(Order)}>
                                <div className="row py-3">
                                    <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Personal Information</p>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" placeholder='First Name*' className="form-control py-2 border" {...register('name1', { required: true })} />
                                        {errors.name1 ? <div className='error'>This Field is required</div> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" placeholder='Last Name *' className="form-control py-2 border"{...register('name2', { required: true })} />
                                        {errors.name2 ? <div className='error'>This Field is required</div> : null}

                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="number" placeholder='Contact Number*' min={0} className="form-control py-2 border" {...register('number1', { required: true })} />
                                        {errors.number1 ? <div className='error'>This Field is required</div> : null}
                                    </div>
                                </div>
                                <hr />
                                <div className="row py-3">
                                    <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Shipping Address</p>
                                    <div className="col-md-12 mb-3">
                                        <input type="text" placeholder='House Number & Street Name*' className="form-control py-2 border" {...register('street', { required: true })} />
                                        {errors.street ? <div className='error'>This Field is required</div> : null}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <input type="text" placeholder='Appartment, Suite, Unit, etc' className="form-control py-2 border" {...register('appartment')} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" placeholder='Country*' className="form-control py-2 border" {...register('country', { required: true })} />
                                        {errors.country ? <div className='error'>This Field is required</div> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" placeholder='Town/City*' className="form-control py-2 border" {...register('city', { required: true })} />
                                        {errors.city ? <div className='error'>This Field is required</div> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" placeholder='Postcode*' min={0} className="form-control py-2 border" {...register('postal', { required: true })} />
                                        {errors.postal ? <div className='error'>This Field is required</div> : null}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <input type="email" placeholder='E-mail' className="form-control py-2 border" {...register('email')} />
                                   </div>
                                    <div className="col-md-12 mt-3">
                                        <p className='mb-0 fw-bold' style={{ fontSize: "16px" }}>Note: Remember all orders are delivered on ground floor.
                                            Extra charges for uplift or desired room.</p>
                                    </div>
                                </div>

                                <hr className="mb-4" />
                                <div className="col-md-12 mb-3">
                                    <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Shipping Charges</p>
                                    <div className='px-3 py-2 d-flex justify-content-between align-items-center  rounded-3'
                                        style={{ border: "1px solid lightgray" }}>
                                        <p className='m-0'>Standard Delivery</p>
                                        <p className='m-0' >&pound;50</p>
                                    </div>
                                </div>
                                <div className='py-3'>
                                    <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Payment Method</p>
                                    <div className="col-md-12 mb-3">
                                        <>
                                            <div className="d-flex gap-2" >
                                                <input
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault1"
                                                    defaultChecked="true"
                                                    onClick={()=>setPayment(false)}
                                                />
                                                <p className="m-0" htmlFor="flexRadioDefault1">
                                                    Cash on delivery
                                                </p>
                                            </div>
                                           
                                            <div className="d-flex gap-2 mt-1" >
                                                <input
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault2"
                                                    onClick={togglePayment}
                                                />
                                                <p className="m-0" htmlFor="flexRadioDefault2">
                                                    Credit Card
                                                </p>
                                            </div>
                                        </>
                                        {payment &&
                                            <div className='mt-4 d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: "#FAFAF9", height: "200px", borderRadius: "5px" }}>
                                                <img src="/payment.png" className='img-fluid' style={{ height: "80px" }} alt="" />
                                                <p className='text-muted text-center mt-2'>This store can't accept payment right now.</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <div className='py-3'>
                                    <p className='fs-5' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Order notes</p>
                                    <div className="col-md-12 mb-3">
                                        <textarea type="text" placeholder='Notes about your order, e.g. special notes for delivery.'
                                            className="form-control py-2 rounded" rows={7} {...register('note')}
                                            style={{ border: "1px solid lightgray" }}
                                        />
                                    </div>
                                </div>
                                <hr className="mb-4" />

                                {filterCart?.length > 0 &&
                                    <div className='chk_btns chk_btns1 mt-5'>
                                        <button className="fw-bolder btn btn-lg" style={{ width: "100%", backgroundColor: "black", color: "white" }}>
                                            COMPLETE ORDER
                                        </button>
                                        <p className='my-4 text-center fs-3' style={{ fontWeight: "600" }}>---OR---</p>

                                        <button className="w-100 btn btn-lg chk_btn"
                                            style={{ backgroundColor: "rgb(38,211,103)" }}
                                            onClick={sendWhatsAppMessage}>
                                            Order Via WhatsApp
                                        </button>
                                    </div>
                                }
                            </form>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12 px-4 pt-5 pt-lg-3'>
                            <div className='row'>
                                <div className='col-12 d-flex justify-content-between' style={{ color: "rgb(27, 41, 80)" }}>
                                    <p className='fw-bolder fs-4'>ORDER SUMMARY</p>
                                    <p className='fw-bolder fs-4'>{filterCart?.length}</p>
                                </div>
                            </div>
                            {filterCart?.map((item, index) => {
                                return <>
                                    <div className='row border mb-1 py-3' key={index}>
                                        <div className='col-3' style={{ position: "relative" }}>
                                            <img className='img-fluid' src={item?.image} alt="No Internet" />
                                            <p className='m-0 cart_number' style={{
                                                top: "-4px",
                                                right: "4px,"
                                            }}>
                                                {item?.quantity}
                                            </p>
                                        </div>
                                        <div className='col-9 d-flex justify-content-between'>
                                            <div>
                                                <p className='m-0'>{item?.title.slice(0, 50)}</p>
                                            </div>
                                            <div className="d-flex justify-content-between flex-column">
                                                <div>
                                                    <p className='text-center fw-bolder'>{`£${item?.total?.toFixed()}`}</p>
                                                </div>
                                                {/* <div>
                                                    <button className='btn btn-outline-secondary text-muted'
                                                        style={{ backgroundColor: "transparent" }} onClick={() => DeleteCartItem(item._id, userId)}>remove</button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            })
                            }

                            <div className='row mt-3 py-3 border' style={{ backgroundColor: "white" }}>
                                <div className='px-3 pt-3 col-12  d-flex justify-content-between align-items-center'>
                                    <p className='fs-6'>Subtotal</p>
                                    <p className='fs-6'>{`£${totalSum?.toFixed()}`}.00</p>
                                </div>
                                <div className='px-3 col-12 d-flex justify-content-between align-items-center'>
                                    <p className=' fs-6'>Shipping</p>
                                    <p className=' fs-6'>{`£${shippingFeeAmount}`}.00</p>
                                </div>
                                <div className='px-3 col-12 d-flex justify-content-between align-items-center' style={{ fontWeight: "600" }}>
                                    <p className='fs-5'>Total</p>
                                    <p className='fs-5'>{`£${total?.toFixed()}`}.00</p>
                                </div>
                            </div>
                            {/* <div className='chk_btns chk_btns2 mt-5'>
                            <button className="fw-bolder btn btn-lg"
                                style={{ width: "100%", backgroundColor: "rgb(27, 41, 80)", color: "white" }}
                            >
                                COMPLETE ORDER
                            </button>
                            <p className='my-4 text-center fs-3' style={{ fontWeight: "600" }}>---OR---</p>
    
                            <a href="https://wa.me/+923067208343" target='blank'>
                                <button className="w-100 btn btn-lg chk_btn"
                                    style={{ backgroundColor: "rgb(38,211,103)" }}>
                                    Order Via WhatsApp
                                </button>
                            </a>
                        </div> */}
                        </div>
                    </>
                ) : (
                    <div className='col-lg-4 col-md-6 col-sm-12 px-4 pt-5 pt-lg-3 d-flex flex-column justify-content-center align-items-center' style={{ height: "50vh" }}>
                        <img src="/cart.png" alt="" style={{ width: "150px" }} />
                        <p className="fw-bolder mt-3" style={{ color: "rgb(2,2,94)" }}>Your Cart is Empty</p>
                        <a href="/Products/all">
                            <button
                                className="button-submit px-4"
                            >
                                Shop our products
                            </button>
                        </a>
                    </div >
                )}


            </div>

            <div className='row d-flex justify-content-center my-5'>
                <div className='col-lg-10 col-sm-12 mt-5'>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12 chk_secure1'>
                            <div className=''>
                                <p>Secure Shopping</p>
                            </div>
                            <div className='d-flex gap-3'>
                                <img src="/chk1.png" className='img-fluid' alt="No Network" />
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12 chk_secure2'>
                            <div className=''>
                                <p>Reason to buy from us</p>
                            </div>
                            <div className='d-flex gap-3'>
                                <img src="/chk2.png" className='img-fluid' alt="No Network" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* <div className='my-5 d-flex gap-3 justify-content-center flex-wrap checout_display2'>
                    <a href=""><p style={{ borderBottom: "1px solid rgb(10,88,211)" }}>Refund policy</p></a>
                    <a href=""><p style={{ borderBottom: "1px solid rgb(10,88,211)" }}>Privacy policy</p></a>
                    <a href=""><p style={{ borderBottom: "1px solid rgb(10,88,211)" }}>Terms of service</p></a>
                </div> */}
            </div>
        </div >

    </>

}

export default Checkout