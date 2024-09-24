import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
    return <>
        <div className='d-flex gap-4 px-4 py-2 align-items-center' style={{
            width: "fit-contet",
            height: "fit-content",
            // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",..
            zIndex: "100"
        }}>
            <div>
                <ClipLoader color="#1b2950" />
            </div>
            {/* <div>
                <p className='text-muted m-0'>Loading! Please Wait </p>
            </div> */}

        </div>

    </>
}

export default Loader