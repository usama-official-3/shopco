import React, { useState, useEffect } from "react";
import {
  FaAngleRight,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaArrowDown,
  FaArrowUp,
  FaShareAlt,
  FaShareSquare,
  FaPinterestP,
  FaInstagram,
  FaTiktok,
  FaFacebook,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import TagManager from 'react-gtm-module'
import { RxCross1 } from "react-icons/rx"
import { useNavigate, useParams } from "react-router-dom";
import Benefits from "../Benefits/Benefits";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { toast } from "react-toastify";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import axios from "axios";
import { Link } from "react-scroll";
import "./single.css";


const SingleAdd = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  let cu = useSelector((store) => store.userSection.cu);

  let move = useNavigate();

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const allComments = useSelector((store) => store.Comment.comment);

  const { productId, title } = useParams();
  const [comments, setComments] = useState([])
  const [product, setProduct] = useState({});
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sucess, setSucess] = useState("")
  const [timeoutId, setTimeoutId] = useState(null);
  const dispatch = useDispatch();


  const sendWhatsAppMessage = () => {
    const message = `I'm interested in product\n${window.location.href}\n\nCan you provide more details?`;
    const whatsappURL = `https://wa.me/+923067208343?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };


  useEffect(() => {

    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        setLoading(true)
        const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/singleProduct?id=${productId}`, { cancelToken: source.token })
        setProduct(resp?.data)
        setLoading(false)
      } catch (error) {
        if (axios.isCancel(error)) {
        } else { }
      }
    };
    fetchData();
    return () => {
      source.cancel();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [productId]);

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`);
            setData(response.data);
        } catch (error) {
            setError("Failed to fetch products. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
}, []);

  const totalImages = product?.images?.length || 0;


  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    setScrollPosition(index * 23);
  };

  const handleLeftArrowClick = () => {
    setSelectedImage(
      (prevSelectedImage) => (prevSelectedImage - 1 + totalImages) % totalImages
    );
  };

  const handleRightArrowClick = () => {
    setSelectedImage(
      (prevSelectedImage) => (prevSelectedImage + 1) % totalImages
    );
  };
  const copyUrlToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error("Error copying URL to clipboard:", error);
      return false;
    }
  };

  const handleShare = async (platform) => {
    const shareUrl = window.location.href;
    const copiedSuccessfully = await copyUrlToClipboard(shareUrl);
    if (copiedSuccessfully) {
      toast.success("URL copied to clipboard");
    } else {
      toast.error("Failed to copy URL. Please try again or manually copy the URL.");
    }
    switch (platform) {
      case "general":
        break;
      case "instagram":
        window.open(`https://www.instagram.com/`);
        break;
      case "tiktok":
        window.open(`https://www.tiktok.com/`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/`);
        break;
      case "pint":
        window.open(`https://www.pinterest.com/`);
        break;
      default:
        console.log("Unsupported platform:", platform);
        break;
    }
  };




  const handleScroll = (direction) => {
    const container = document.querySelector(".small_images");
    if (container) {
      const scrollAmount = 50;

      if (direction === "up") {
        container.scrollBy({
          top: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "down") {
        container.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "left") {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
      setScrollPosition(
        direction === "left" || direction === "right"
          ? container.scrollLeft
          : container.scrollTop
      );
    }
  };

  const Increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const Decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const calculateTotalPrice = (
    quantity,

  ) => {

    let updatedFprice = product?.Fprice || 0;

    let totalPrice = updatedFprice * quantity;

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice(
    quantity,
  );

  async function AddToCart(
    product,
    totalPrice,
  ) {
    if (cu._id === undefined) {
      move(`/login/${product.title}/${productId}`);
      // toast.success("Login to Place Your Order");
    } else if (cu.role === "admin") {
      dispatch({
        type: "LOGOUT_USER",
      });
      move("/login");
      // toast.success("Login with different account");
    } else {

      try {
        product.userId = cu?._id;
        product.productId = product?._id;
        product.total = totalPrice;
        // product.price = product?.price;
        product.quantity = quantity;
        product.image = product?.images[0];
        product.discount = product?.discount;
        
        let response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/addToCart`,
          product
        );
        
        if (response.data.message === "Product Added") {
          dispatch({
            type: "ADD_TO_CART",
            payload: response.data.alldata,

          });
          setSucess("cart")
        }
      } catch (error) {
        // toast.warning("Server Error Try Again Later...")
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (sucess) {
      const timeoutId = setTimeout(() => {
        setSucess('')
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
    if (Error) {
      const timeoutId = setTimeout(() => {
        setError('')
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [sucess, Error]);

  async function Order() {
    await AddToCart(
      product,
      totalPrice,
    )
    if (cu._id && cu.role !== "admin") {
      move(`/cart-checkout/${cu._id}`);
    } else {
      move("/login/" + productId);
    }

  }



  const Comment = async (cmnt) => {
    setLoading(true)
    try {
      const commentWithProductId = { ...cmnt, productId };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, commentWithProductId);
      if (response.data.message === "Comment Added") {
        dispatch({
          type: "ADD_COMMENT",
          payload: response.data.alldata,
        });
        setLoading(false)
        setComments(response.data.alldata)
        reset();
        setSucess("comment")
        // toast.success("Feedback submitted");
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

  const formatDateTime = (dateStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", options);
  };

  return <>
    {loading ? (
      <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
        <Loader />
      </div >
    ) : product && product.images ? (
      <div className="container-fluid min-vh-100">
        <div className="row">
          <div className="col-lg-12 col-sm-12 mt-4 mb-2 s_categories_P d-flex align-items-center">
            {product?.subCategory != "three-&-two-seater-sofas" &&
              <p style={{ textTransform: "capitalize", fontFamily: "Times New Roman", fontSize: "15px" }}>
                home <FaAngleRight />
                product <FaAngleRight /> {
                  product?.category
                } <FaAngleRight /> {product?.subCategory}
              </p>}
            {product?.subCategory === "three-&-two-seater-sofas" &&
              <p style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                Home <FaAngleRight />
                Product <FaAngleRight /> <span style={{ textTransform: "capitalize" }}>{product?.category}</span>
                <FaAngleRight /> 3 and 2 Seater Sofas
              </p>}
          </div>

          <div className="col-lg-1 col-md-2 col-sm-12 order-lg-1 order-md-1 order-2 p-0 m-0 d-flex flex-column align-items-center" style={{ position: "relative" }}>
            <div className="small_images">
              {product?.images &&
                product?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="No Network"
                    onClick={() => handleThumbnailClick(index)}
                    className={`rounded-3 ${index === selectedImage ? "activeImg" : ""}`}
                  />
                ))}
            </div>
            {product?.images && product?.images.length > 3 && (
              <>
                {/* <div className="mt-3 arrow_display1 text-center">
                  <button
                    className="plus_btn"
                    onClick={() => handleScroll("up")}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    className="plus_btn"
                    onClick={() => handleScroll("down")}
                  >
                    <FaArrowDown />
                  </button>
                </div> */}
                {/* <div className="arrow_display2">
                      <button
                        className="plus_btn plus_btn1 mx-2"
                        onClick={() => handleScroll("left")}
                      >
                        <IoIosArrowBack />
                      </button>
                      <button
                        className="plus_btn plus_btn2"
                        onClick={() => handleScroll("right")}
                      >
                        <IoIosArrowForward />
                      </button>
                    </div> */}
              </>
            )}
          </div>

          <div className="col-lg-5 col-md-8 col-sm-12 order-lg-2 order-md-2 order-1 mb-lg-5 mb-2" style={{ height: "fit-content" }}>
            {loading || product.length === 9 ? (
              <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                <Loader />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ transition: "opacity 0.5s ease-in-out", position: "relative" }}>
                <InnerImageZoom
                  zoomScale={1}
                  className="rounded-3"
                  src={
                    product?.images && product.images[selectedImage]
                      ? product.images[selectedImage]
                      : "/loader.jpg"
                  }
                  zoomSrc={
                    product?.images && product.images[selectedImage]
                      ? product.images[selectedImage]
                      : "/loader.jpg"
                  }
                />
                {product?.discount && product?.discount > 0 ? (
                  <div className="discount">{`-${product?.discount}%`}</div>
                ) : null}

                {product?.images && product?.images.length > 1 && (
                  <>
                    <div
                      className="single_arrow1"
                      onClick={handleLeftArrowClick}
                    >
                      <IoIosArrowBack />
                    </div>
                    <div
                      className="single_arrow2"
                      onClick={handleRightArrowClick}
                    >
                      <IoIosArrowForward />
                    </div>
                  </>
                )}
              </div>
            )
            }

          </div>

          <div className="col-lg-5 col-sm-12 order-3" style={{ position: "relative", height: "fit-content" }}>
            {sucess === "cart" && (
              <div className={`succes_box  px-3 ${sucess === "cart" ? "showVerify" : ""}`}>
                <div className="text-end">
                  <button className="btn fw-bolder fs-3"
                    style={{ position: "absolute", top: "0px", right: "10px", color: "red", width:"fit-content" }}
                    onClick={() => setSucess("")}> <RxCross1 /></button>
                </div>
                <img src="/verified.gif" alt="No Network" style={{ width: "70px" }} />
                <p className="fw-bolder text-center">Added to Cart</p>
              </div>
            )}
            <div className={`s_content ${product?.category === "bed" ? "bed_class" : ""}`}>
              <h1
                className="text-center fs-1 "
                style={{ color: "#1b2950" }}
              >
                {product?.title}
              </h1>
              {comments.filter((item) => item.productId === productId)
                .length > 0 && (
                  <div className="text-center my-2 cursor" style={{ color: "#1b2950" }}>
                    <Link to="review">
                      ({comments.filter(
                        (item) => item.productId === productId
                      ).length
                      }{" "}
                      Customer Review)
                    </Link>
                  </div>
                )}
              {/* <p className="fs-6 fw-bolder " style={{ color: "#1b2950" }}>
                    Product code: {product?.sn}
                  </p> */}
              <div className="">
                <span
                  className="fw-bold fs-5"
                  style={{ color: "red" }}
                >{`£${totalPrice?.toFixed()}`}.00</span>
                {product.discount > 0 &&
                  <span className="fs-6 text-muted">
                    <s className="mx-2">{`£${product?.price.toFixed()}`}.00</s>
                  </span>}
              </div>
              <div className="sigle_quatity_main mt-3">
                <div className="">
                  <p
                    className="m-0"
                    style={{
                      fontSize: "17px",
                      color: "#1b2950",
                      fontWeight: "600",
                    }}
                  >
                    Quantity{" "}
                  </p>
                </div>
                <div className="sigle_quatity">
                  <button className="plus_btn fs-6" onClick={Decrement}>
                    <FaMinus />
                  </button>
                  <p className="input_single text-center m-0 p-0">
                    {quantity}
                  </p>
                  <button className="plus_btn fs-6" onClick={Increment}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 d-flex flex-wrap gap-3">
              <p className="m-0 d-flex align-items-center cursor" style={{
                fontSize: "17px",
                color: "#1b2950",
                fontWeight: "600",
              }}>Share Product</p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("general")} style={{ width: "30px", height: "30px", borderRadius: "100%" }}><FaShareAlt /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("instagram")} style={{ width: "30px", height: "30px", background: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)", color: "rgb(255, 255, 255)", borderRadius: "100%" }}><FaInstagram /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("tiktok")} style={{ width: "30px", height: "30px", background: "black", color: "white", borderRadius: "100%" }}><FaTiktok /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("facebook")} style={{ width: "30px", height: "30px", backgroundColor: "rgb(24, 119, 242)", color: "rgb(255, 255, 255)", borderRadius: "100%" }}><FaFacebook /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("pint")} style={{ width: "30px", height: "30px", backgroundColor: "#E60023", color: "#FFFFFF", borderRadius: "100%" }}><FaPinterestP /></p>
            </div>

            {Error === "options" && (
              <div className="error">All fields are required</div>
            )}

            <div className="s_btn my-3">
              <button
                className="button-submit px-5 py-3 fw-bolder"
                onClick={() =>
                  AddToCart(
                    product,
                    totalPrice,
                  )
                }
              >
                Add to Cart
              </button>
              <button className="button-submit px-5 py-3 fw-bolder" onClick={Order}>
                Order Now
              </button>
            </div>
            <button className="s_whatsapp fw-bolder" onClick={sendWhatsAppMessage}>
              Buy via WhatsApp
            </button>
          </div>

        </div>

        <div className="row mt-5 mb-3 d-flex justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12">
            <p
              className="fs-2 fw-bolder"
              style={{
                color: "#1b2950",
                borderBottom: "1px solid #1b2950",
                width: "fit-content"

              }}
            >
              Product Detail
            </p>
            {product?.descriptionHead1 && (
              <p
                className="fs-6 my-3 fw-bolder "
                style={{ color: "#1b2950" }}
              >
                {product.descriptionHead1}
              </p>
            )}
            {product?.description && (
              <p className="fs-6" style={{ textAlign: "justify" }}>{product.description}</p>
            )}
            {product?.descriptionHead2 && (
              <p
                className="fs-6 my-3 fw-bolder"
                style={{ color: "#1b2950" }}
              >
                {product.descriptionHead2}
              </p>
            )}
            {product?.description2 && (
              <p className="fs-6" style={{ textAlign: "justify" }}>{product.description2}</p>
            )}
            {product?.descriptionHead3 && (
              <p
                className="fs-6 my-3 fw-bolder"
                style={{ color: "#1b2950" }}
              >
                {product.descriptionHead3}
              </p>
            )}
            {product?.description3 && (
              <p className="fs-6 " style={{ textAlign: "justify" }}>{product.description3}</p>
            )}
            {product?.descriptionHead4 && (
              <p
                className="fs-6 my-3 fw-bolder"
                style={{ color: "#1b2950" }}
              >
                {product.descriptionHead4}
              </p>
            )}
            {product?.description4 && (
              <p className="fs-6" style={{ textAlign: "justify" }}>{product.description4}</p>
            )}

            {product?.dimensionHead && (
              <p className="fs-6 fw-bolder" style={{ color: "#1b2950" }}>
                {product.dimensionHead}
              </p>
            )}
            {product?.images &&
              product.images.length > 0 &&
              product?.description && (
                <>
                  <div className="my-4 row row-cols-lg-2 row-cols-1 g-4">
                    <div className="cols">
                      {product.images[0] && (
                        <img
                          src={product.images[0]}
                          className="img-fluid rounded-3"
                          alt="No Network"
                        />
                      )}
                    </div>
                    <div>
                      {product.images[1] && (
                        <img
                          src={product.images[1]}
                          className="img-fluid rounded-3"
                          alt="No Network"
                        />
                      )}
                    </div>
                  </div>
                </>
              )}

          </div>
        </div>

        <div className="row mt-5 mb-3 d-flex justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12 mb-5">
            <p
              className="fs-2 fw-bolder"
              style={{
                color: "#1b2950",
                borderBottom: "1px solid #1b2950",
                width: "fit-content"
              }}
            >
              Related Products
            </p>
            {loading ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "80vh" }}
              >
                <Loader />
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4">
                {data?.map((item, index) => (
                  <div className="col card" key={index}>
                  <a href={`/product/${item.title.replace(/ /g, '-')}/${item._id}`}>
                      <div className="card_img">
                          <img src={item?.images[0]} className="text-center" alt={item?.title} />
                      </div>
                      <p className="card_title">{item?.title}</p>
                      <p className="final_price">
                          ${item?.Fprice}
                          {item?.discount > 0 && (
                              <>
                                  <span className="mx-2 text-muted discounted_price"><s>${item?.price}</s></span>
                                  <span className="mx-2 discount">-{item?.discount}%</span>
                              </>
                          )}
                      </p>
                  </a>
              </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="row mb-5" id="review">
          <div
            className="col-lg-6 col-md-6 col-sm-12 py-5"
            style={{ backgroundColor: "rgb(2, 2, 94)" }}
          >
            <h1
              className="text-center fs-1 fw-bolder"
              style={{ color: "white" }}
            >
              Product Reviews
            </h1>
            {loading ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "80vh" }}
              >
                <Loader />
              </div>
            ) : comments.filter((item) => item.productId === productId)
              .length === 0 ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "50vh" }}
              >
                <h2 style={{ color: "white" }}>No Review available</h2>
              </div>
            ) : (
              <div className="mt-5">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={30}
                  autoplay={{ delay: 3000 }}
                  modules={[Autoplay]}
                  className="mySwiper"
                >
                  {comments
                    .filter((item) => item.productId === productId)
                    .map((item, index) => {
                      return (
                        <SwiperSlide className="review_slide">
                          <div className="px-3 py-2" key={index}>
                            <p className="review_detail text-center">
                              {item.comment}
                            </p>
                            <p
                              className="text-center"
                              style={{ color: "white" }}
                            >
                              {item.name}
                            </p>
                            <p
                              className="text-center"
                              style={{
                                fontWeight: "700",
                                fontWeight: "700",
                                color: "#F7EEDD",
                              }}
                            >
                              {formatDateTime(item.date1 ? item.date1 : item.date)}
                            </p>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            )}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 px-lg-5 px-3 pt-lg-0 pt-5 order-1 order-lg-2 order-md-2 order-xl-2" style={{ position: "relative" }}>
            {sucess === "comment" && (
              <div className={`succes_box  px-3 ${sucess === "comment" ? "showVerify" : ""}`}>
                <div className="text-end">
                  <button className="btn fw-bolder fs-3"
                    style={{ position: "absolute", top: "0px", right: "10px", color: "red" }}
                    onClick={() => setSucess("")}> <RxCross1 /></button>
                </div>
                <img src="/verified.gif" alt="No Network" style={{ width: "70px" }} />
                <p className="fw-bolder text-center">Feedback Submitted</p>
              </div>
            )}
            <p
              className="fw-bolder fs-2 text-center"
              style={{ color: "rgb(2, 2, 94)" }}
            >
              Product Feedback
            </p>
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
              <button type="submit" className="btn review_btn w-100">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <Benefits />
          </div>
        </div>
      </div >
    ) : (
      <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
        <Loader />
      </div >
    )
    }

  </>
};

export default SingleAdd;
