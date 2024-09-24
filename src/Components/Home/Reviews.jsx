import React, { useState } from 'react'
import { FaStar, FaCheckCircle } from "react-icons/fa";

const Reviews = () => {

    const [data, setData] = useState([
        { title: "John M", description: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
        { title: "Maria Rose", description: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
        { title: "Alex", description: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
        { title: "Allen", description: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
    ])
    return <>
        <div className='container my-5'>
            <div className='row'>
                <div className='h_box_main'>
                    {data.map((item, index) => {
                        return <>
                            <div className='card border p-4' style={{ width: "320px" }} key={index}>
                                <p style={{ color: "#FFC633" }}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p>
                                <p className='card_title d-flex m-0'>{item.title}</p> 
                                <p>{item.description}</p>
                            </div>
                        </>
                    })
                    }

                </div>
            </div>
        </div>

    </>
}

export default Reviews