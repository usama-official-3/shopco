import React, { useState } from 'react'

const Top = () => {

    const [data, setData] = useState([
        { img: "/Frame 32.png", title: "T-Shirt with tape details", price: "120", discount: "40", Fprice: "140" },
        { img: "/Frame 38.png", title: "skinny fit jeans", price: "150", discount: "0", Fprice: "150" },
        { img: "/Frame 34.png", title: "Checked shirt", price: "170", discount: "0", Fprice: "170" },
        { img: "/Frame 33.png", title: "Sleeve striped t-shirt", price: "250", discount: "20", Fprice: "220" },
        { img: "/Frame 38.png", title: "skinny fit jeans", price: "150", discount: "0", Fprice: "150" },
        { img: "/Frame 38.png", title: "skinny fit jeans", price: "150", discount: "0", Fprice: "150" },
    
    ])

    return <>
        <div className="container mt-5">
            <div className="row">
               <h1 className='home_heading text-center mb-5'>TOP SELLING</h1>
            </div>
            <div className='h_box_main'>
                {data.map((item, index) => {
                    return <>
                        <div className='card' key={index}>
                            <div className='card_img'>
                                <img src={item.img} className='text-center' alt="" />
                            </div>
                            <p className='card_title'>{item.title}</p>
                            <p className='final_price'>
                                ${item.Fprice}
                                {item.discount > 0 &&
                                    <>
                                        <span className='mx-2 text-muted discounted_price'><s>${item.price}</s></span>
                                        <span className='mx-2 text-muted discount'>{item.discount}%</span>
                                    </>
                                }
                            </p>
                        </div>
                    </>
                })
                }

            </div>
            <div className='text-center my-3'>
                <button class="hero_btn learn-more">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">View All</span>
                </button>
            </div>
        </div>
    </>
}

export default Top