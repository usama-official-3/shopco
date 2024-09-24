import React,{useEffect} from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router'
import "./error.css"

export const Error = () => {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);
    let move=useNavigate()
    return (
        <div className='container-fluid my-5 error_container'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 d-flex flex-column justify-content-center align-items-center '>
                    <h1>
                        404
                        </h1>
                    <h2>
                        Uh Oh! You're Lost.
                    </h2>
                    <p>
                        The Website you are looking for it is under maintenance. <br />
                        {/* How you got here is a mystery.  */}
                        {/* But you can click the button to go back to the homePage */}
                    </p>
                    {/* <button className='mt-2 btn review_btn' style={{width:"fit-content"}} onClick={()=>{
                        move("/")
                    }}>Home <FaArrowRight /></button> */}
                </div>


            </div>

        </div>
    )
}
