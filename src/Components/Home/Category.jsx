import React from 'react'

const Category = () => {
    return <>
        <div className='container style p-5 my-5'>
            <h1 className='home_heading text-center'>BROWSE BY Category</h1>
            <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/12173.jpg" className='img-fluid' alt="" />
                    </div>
                </div>
                <div className='col-lg-7 col-md-7 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/formal.png" className='img-fluid' alt="" />
                    </div>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/casual.png" className='img-fluid' alt="" />
                    </div>
                </div>
            </div>
            <div className='row '>
                <div className='col-lg-5 col-md-5 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/gym.png" className='img-fluid' alt="" />
                    </div>
                </div>
                <div className='col-lg-7 col-md-7 col-sm-12 mt-4'>
                    <div className='style_card'>
                        <img src="/party.png" className='img-fluid' alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Category