import React from 'react'
import "./style.css"
const Style = () => {
    return <>
        <div className='container style p-5'>
            <h1 className='home_heading text-center'>BROWSE BY DRESS STYLE</h1>
            <div className='row'>
                <div className='col-lg-5 col-md-5 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/casual.png" className='img-fluid' alt="" />
                    </div>
                </div>
                <div className='col-lg-7 col-md-7 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/formal.png" className='img-fluid' alt="" />
                    </div>
                </div>
            </div>
            <div className='row '>
                <div className='col-lg-7 col-md-7 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/party.png" className='img-fluid' alt="" />
                    </div>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/gym.png" className='img-fluid' alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Style