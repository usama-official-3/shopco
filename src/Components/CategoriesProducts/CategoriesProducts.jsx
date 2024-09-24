import React, { useState, useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaBarsStaggered } from "react-icons/fa6";
import axios from 'axios';
import "./CategoriesProducts.css"
import { useParams } from 'react-router-dom';


const CategoriesProducts = () => {
    const {category}=useParams()
    console.log(category)
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(3000);
    const [openPrice, setopenPrice] = useState(true)
    const [dressStyle, setdressStyle] = useState(true)
    const [openSize, setopenSize] = useState(true)
    const [showFilter, setShowFilter] = useState(false)

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Product/byCategory/${category}`);
                console.log(response,"response")
                setProducts(response.data);
            } catch (error) {
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleMaxRangeChange = (e) => {
        const value = parseInt(e.target.value);
        setMaxPrice(value);
    };
    const handleMinRangeChange = (e) => {
        const value = parseInt(e.target.value);
        setMinPrice(value);
    };
    return <>
        <div className='container-fluid px-lg-4 py-5 px-md-3'>
            <div className='row'>
                <div className='col-12 mb-5 d-flex justify-content-between px-4' >
                    <p className='m-0 p-0'>Home <IoIosArrowForward /> Casual</p>
                    <p className='d-lg-none d-md-block'>Filters</p>
                </div>
            </div>
            {/* Filter Component for small screen Start */}

            {/* Filter Component for small screen End */}
            <div className="row">
                <div className='col-lg-3 d-none d-lg-block p-3 border rounded'>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='fs-4 fw-bold'>Filters</p>
                            <p className='fs-4'><FaBarsStaggered /></p>
                        </div>
                        <hr className='mb-4' />
                        <div className='d-flex justify-content-between align-items-center cursor'>
                            <p>T-Shirts</p>
                            <p><IoIosArrowForward /></p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center cursor'>
                            <p>Shorts</p>
                            <p><IoIosArrowForward /></p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center cursor'>
                            <p>Shirts</p>
                            <p><IoIosArrowForward /></p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center cursor'>
                            <p>Hoodie</p>
                            <p><IoIosArrowForward /></p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center cursor'>
                            <p>Jeans</p>
                            <p><IoIosArrowForward /></p>
                        </div>
                    </div>
                    <hr className='mb-4' />
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='fs-4 fw-bolder'>Price</p>
                            {openPrice &&
                                <p className='cursor' onClick={() => setopenPrice(false)}><IoIosArrowUp /></p>
                            }
                            {!openPrice &&
                                <p className='cursor' onClick={() => setopenPrice(true)}><IoIosArrowDown /></p>
                            }
                        </div>
                        {openPrice &&
                            <>
                                <div className='d-flex justify-content-center p-relative' style={{ position: "relative" }}>
                                    <input
                                        type="range"
                                        id="minPriceRange"
                                        className="w-50"
                                        min={1}
                                        max={2999}
                                        value={minPrice}
                                        onChange={handleMinRangeChange}
                                        style={{ height: "2px" }}
                                    />
                                    <input
                                        type="range"
                                        id="maxPriceRange"
                                        className="w-50"
                                        min={1}
                                        max={3000}
                                        step={10}
                                        value={maxPrice}
                                        onChange={handleMaxRangeChange}
                                        style={{
                                            height: "2px",
                                            position: "absolute",
                                            top: "0px",
                                            right: "4px",
                                        }}
                                    />
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <p className="m-0 mt-2 px-3" style={{ color: "red" }}>
                                        ${minPrice} -
                                    </p>
                                    <p className="m-0 mt-2 px-3" style={{ color: "red" }}>
                                        ${maxPrice}
                                    </p>
                                </div>
                                <hr className='mb-4' />
                            </>
                        }
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className='fs-4 fw-bold'>Size</p>
                        {openSize &&
                            <p className='cursor' onClick={() => setopenSize(false)}><IoIosArrowUp /></p>
                        }
                        {!openSize &&
                            <p className='cursor' onClick={() => setopenSize(true)}><IoIosArrowDown /></p>
                        }
                    </div>
                    {openSize &&
                        <>
                            <div className='d-flex flex-wrap gap-2'>
                                <div className='size_box'>
                                    <p className='m-0'>XX-Small</p>
                                </div>
                                <div className='size_box'>
                                    <p className='m-0'>X-Small</p>
                                </div>
                                <div className='size_box'>
                                    <p className='m-0'>Small</p>
                                </div>
                                <div className='size_box'>
                                    <p className='m-0'>Medium</p>
                                </div>
                                <div className='size_box'>
                                    <p className='m-0'>Large</p>
                                </div>
                                <div className='size_box'>
                                    <p className='m-0'>X-Large</p>
                                </div>
                                <div className='size_box'>
                                    <p className='m-0'>XX-Large</p>
                                </div>
                                <div className='size_box'>
                                    <p className='m-0'>3X-Large</p>
                                </div>
                                <div className='size_box'>
                                    <p className='m-0'>4X-Large</p>
                                </div>
                            </div>

                            <hr className='mb-4' />
                        </>
                    }
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className='fs-4 fw-bolder'>Dress Style</p>
                        {dressStyle &&
                            <p className='cursor' onClick={() => setdressStyle(false)}><IoIosArrowUp /></p>
                        }
                        {!dressStyle &&
                            <p className='cursor' onClick={() => setdressStyle(true)}><IoIosArrowDown /></p>
                        }
                    </div>
                    {dressStyle &&
                        <>
                            <div className='d-flex justify-content-between align-items-center cursor'>
                                <p>Casual</p>
                                <p><IoIosArrowForward /></p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center cursor'>
                                <p>Formal</p>
                                <p><IoIosArrowForward /></p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center cursor'>
                                <p>Party</p>
                                <p><IoIosArrowForward /></p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center cursor'>
                                <p>Gym</p>
                                <p><IoIosArrowForward /></p>
                            </div>
                            <hr className='mb-4' />
                        </>
                    }

                    <button className='btn btn-dark border rounded-pill w-100 p-3'>Clear Filter</button>
                </div>

                <div className='col-lg-9 col-md-12 col-sm-12'>
                    <div className="row row-cols-lg-3 row-cols-md-4 row-cols-sm-2 row-cols-2">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            products?.map((item, index) => (
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
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CategoriesProducts