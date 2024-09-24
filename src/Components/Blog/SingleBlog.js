import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import axios from 'axios'
import Loader from "../Loader/Loader"

const SingleBlog = () => {

    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // }, []);

    const { blogId } = useParams()
    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(true);
    const move = useNavigate()

    useEffect(() => {
        setLoading(true);
        try {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/singleBlog?id=${blogId}`)
                .then((res) => {
                    setBlog(res.data);
                });
        } catch (e) {
            setLoading(true);
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    return <>
        {loading ? (
            <div className='d-flex align-items-center justify-content-center' style={{ height: "80vh" }}>
                <Loader />
            </div>
        ) : (
            <div className='container min-vh-100 '>
                <div className='row mt-5'>
                    <div className='col'>
                        <h1 className='fw-bolder' style={{ color: "rgb(2, 2, 94)", textTransform: "capitalize" }}>{blog?.title}</h1>
                        {(blog.author && blog.issueDate) && <p className='text-muted'>{formatDateTime(blog?.issueDate)} &nbsp;&nbsp;{blog?.author}</p>}
                        <div className='my-5 px-lg-5 px-2' >
                            <ul className='' style={{ width: "95%" }}>
                                <p className=''>
                                    Hey, <br /> <br />
                                </p>
                                <p className='fw-bolder m-0' style={{ color: "rgb(2, 2, 94)" }}>Introduction:</p>
                                {blog?.introduction && <li className='mb-3'>{blog?.introduction}</li>}
                                {blog?.heading1 && <p className='fw-bolder m-0' style={{ color: "rgb(2, 2, 94)" }}>{blog?.heading1}</p>}
                                {blog?.description1 && <li className='mb-3'>{blog?.description1}</li>}
                                {blog?.heading2 && <p className='fw-bolder m-0' style={{ color: "rgb(2, 2, 94)" }}>{blog?.heading2}</p>}
                                {blog?.description2 && <li className='mb-3'>{blog?.description2}</li>}
                                {blog?.heading3 && <p className='fw-bolder m-0' style={{ color: "rgb(2, 2, 94)" }}>{blog?.heading3}</p>}
                                {blog?.description3 && <li className='mb-3'>{blog?.description3}</li>}
                                {blog?.heading4 && <p className='fw-bolder m-0' style={{ color: "rgb(2, 2, 94)" }}>{blog?.heading4}</p>}
                                {blog?.description4 && <li className='mb-3'>{blog?.description4}</li>}
                                {blog?.heading5 && <p className='fw-bolder m-0' style={{ color: "rgb(2, 2, 94)" }}>{blog?.heading5}</p>}
                                {blog?.description5 && <li className='mb-3'>{blog?.description5}</li>}
                                {blog?.heading6 && <p className='fw-bolder m-0' style={{ color: "rgb(2, 2, 94)" }}>{blog?.heading6}</p>}
                                {blog?.description6 && <li className='mb-3'>{blog?.description6}</li>}
                            </ul>
                        </div>
                        <div className='text-center'>
                            <button className='btn review_btn' style={{ width: "fit-content" }} onClick={() => move("/all-blog")}>VIEW ALL POSTS <FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {/* {Name === "perfect-bed" && <>
                        <p className='text-center text-muted'>APR 10, 2023
                            JELENA PETKOVIC</p>
                        <h1 className='text-center fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>How to Choose a Perfect Bed</h1>
                    </>
                    }
                    {Name === "perfect-sofa" &&
                        <>
                            <p className='text-center text-muted'>APR 10, 2023
                                JELENA PETKOVIC</p>
                            <h1 className='text-center fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>How to Choose a Perfect Sofa</h1>
                        </>
                    }
                    {Name === "clean-sofa" &&
                        <>
                            <p className='text-center text-muted'>JUL 05, 2023
                                JELENA PETKOVIC</p>
                            <h1 className='text-center fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>How to Clean Sofa</h1>
                        </>
                    }
                    {Name === "perfect-mattress" &&
                        <>
                            <p className='text-center text-muted'>JUL 05, 2023
                                JELENA PETKOVIC</p>
                            <h1 className='text-center fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>How To Choose a Perfect Mattress</h1>
                        </>
                    }

                    {Name === "perfect-bed" &&
                        <>
                            <img
                                src="/bedblog.jpg"
                                className='mt-5 img-fluid'
                                alt="No Network"
                            />
                            <div className='my-5 px-lg-5 px-2' >
                                <p className='m-auto'>
                                    Hey, <br /> <br />
                                    Your bed holds a crucial role in shaping the ambiance of your home, impacting the overall aesthetics and
                                    comfort of your bedroom. Given the plethora of bed options available, the task of choosing the perfect one can be daunting.
                                    To guide you in this process, here are some recommendations:
                                </p>
                                <ul className='mt-4' style={{ width: "95%" }}>
                                    <li>
                                        <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Size Considerations:</p>
                                        <p>
                                            Kick off your bed selection journey by determining the appropriate size. Take into account your room
                                            dimensions and available space. Are you inclined towards a king, queen, full, or
                                            twin size bed? Keep in mind that larger beds occupy more space in your room.\

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Harmonize with Your Decor Style:</p>
                                        <p>
                                            Beds are available in an array of styles, ranging from traditional to modern. Contemplate the ambiance you wish to
                                            create in your bedroom and opt for a style that harmonizes with your decor. For a traditional setting, consider a
                                            sleigh bed or a four-poster bed, while a platform bed might be more fitting for a modern space.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Material and Finish Selection:</p>
                                        <p>
                                            The material and finish of your bed significantly contribute to the overall aesthetics of your bedroom.
                                            Take note of the color and finish of your existing furniture and choose a bed that complements these elements.
                                            Classic wood beds exude timeless elegance,
                                            whereas metal beds can introduce a touch of modernity.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Explore Storage Options:</p>
                                        <p>
                                            If storage space in your bedroom is limited, a bed with built-in storage can be a smart solution.
                                            Some beds feature drawers or shelves integrated into the frame, while others leverage a hydraulic lift system,
                                            allowing you to raise the mattress and access storage space underneath.
                                        </p>
                                    </li>

                                    <li>
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Prioritize Mattress Comfort:</p>
                                        <p>
                                            The importance of a comfortable mattress cannot be overstated. When selecting a mattress, factor in your preferred
                                            level of firmness and support. Are you inclined towards a softer or firmer mattress? Additionally,
                                            consider aspects such as allergies and back pain in your mattress decision-making process.

                                            Armed with these insights, you're well-prepared to embark on your quest for the perfect bed. At Furniture Direct
                                            Online Store, we offer a diverse range of beds catering to various styles and budgets. Explore our collection today to discover
                                            the ideal bed that will stand as the focal point of your bedroom for years to come.
                                        </p>
                                    </li>

                                </ul>
                                <p>
                                    Tags: <p style={{ borderBottom: "1px solid rgb(2, 2, 94)" }}>choose bed, bed maintainance</p>
                                </p>

                            </div>

                        </>
                    }
                    {Name === "clean-sofa" &&
                        <>

                            <img src="/Sofa_Claning_1060x550_crop_center.webp" className='mt-5 img-fluid' alt="No Network" />
                            <div className='my-5 px-lg-5 px-2' >
                                <p className='m-auto'>
                                    Hey, <br /><br />
                                    Securing a durable sofa is a substantial investment, and maintaining its longevity requires thoughtful care.
                                    To ensure your high-quality sofa stands the test of time, consider these essential tips:
                                </p>
                                <ul className='mt-4' style={{ width: "95%" }}>
                                    <li>
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Regular Cleaning Routine:</p>
                                        <p>
                                            Upholstery can accumulate dirt over time, leading to wear and tear. Establish a regular cleaning schedule using a
                                            vacuum with a soft brush attachment to gently remove dust and debris, preserving the fabric's integrity.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Prompt Stain Management:</p>
                                        <p>
                                            Act swiftly to clean spills and prevent stubborn stains. Use a gentle touch when blotting liquids,
                                            avoiding rubbing, and consider employing a
                                            suitable upholstery cleaner for effective stain removal.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Shield from Sunlight Exposure:</p>
                                        <p>
                                            Prolonged exposure to direct sunlight can result in fabric fading. Strategically position your sofa away
                                            from windows or employ blinds and curtains to block harsh sunlight,
                                            safeguarding the vibrant colors and texture of your upholstery.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Utilize Throws for Protection:</p>
                                        <p>
                                            Safeguard high-contact areas, such as armrests, by incorporating throws or blankets.
                                            These not only shield against potential spills but also add an extra layer of protection,
                                            enhancing the lifespan of your sofa.

                                            Remember, a well-maintained sofa not only elevates the aesthetic appeal of your living space but also ensures enduring comfort and functionality.
                                        </p>
                                    </li>

                                </ul>
                                <p>
                                    Tags: <span style={{ borderBottom: "1px solid rgb(2, 2, 94)" }}>cleaning sofa, sofa maintenance</span>
                                </p>

                            </div>
                        </>
                    }

                    {Name === "perfect-sofa" &&
                        <>
                            <img src="/blog3.jpg" className='mt-5 img-fluid' alt="No Network" />
                            <div className='my-5 px-lg-5 px-2' >
                                <p className='m-auto'>
                                    Hey, <br /><br />
                                    Your living room's focal point, the sofa, plays a crucial role in creating a cozy and inviting space for you,
                                    your family, and friends. Choosing the right sofa can be a rewarding experience with these helpful tips:
                                </p>
                                <ul className='mt-4' style={{ width: "95%" }}>
                                    <li>
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Define Your Style:</p>
                                        <p>
                                            Before delving into sofa options, identify your preferred style. Whether it's a modern, minimalist aesthetic or a
                                            more traditional look, knowing your style preferences will streamline your search.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Consider Room Size and Layout:</p>
                                        <p>
                                            Assess the dimensions and layout of your living room. For smaller spaces, opt for a compact sofa or loveseat to
                                            avoid overcrowding. In larger rooms, explore sectional sofas or
                                            combinations of larger sofas and armchairs for a balanced arrangement.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Evaluate Comfort Levels:</p>
                                        <p>
                                            People have varying comfort preferences. Determine if you prefer a firmer or softer seat.
                                            Test sofas in stores to gauge comfort before making a decision.
                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Choose Durable and Easy-to-Clean Materials:</p>
                                        <p>
                                            Selecting the right material is crucial, especially if you have kids or pets.
                                            Leather is durable and easy to wipe clean, making it suitable for families.
                                            Alternatively, microfiber is resistant to stains and spills.
                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Pay Attention to Details:</p>
                                        <p>
                                            The details of a sofa contribute to its overall aesthetic. Consider the design of armrests, the shape of the back,
                                            and the type of cushions. High backs offer added comfort,
                                            while lower backs create a modern look. Ensure these details complement your existing decor.

                                            Make your sofa shopping experience enjoyable and successful with these considerations. At Furniture Direct Online
                                            Store, we offer an extensive range of sofas to suit various styles and budgets. Explore our collection today to discover the perfect
                                            sofa that will be the centerpiece of your living room for years to come.
                                        </p>
                                    </li>
                                </ul>
                                <p>
                                    Tags: <span style={{ borderBottom: "1px solid rgb(2, 2, 94)" }}>choose perfect sofa, sofa maintenance</span>
                                </p>

                            </div>
                        </>
                    }
                    {Name === "perfect-mattress" &&
                        <>

                            <img src="/2_1060x550_crop_center.webp" className='mt-5 img-fluid' alt="No Network" />
                            <div className='my-5 px-5' >
                                <p className='m-auto'>
                                    In the hunt for a new mattress? The vast array of options can be overwhelming, but fear not – we've got you covered. Here's a step-by-step guide to
                                    help you pick the mattress that promises the best sleep quality for you:
                                </p>

                                <ul className='mt-4' style={{ width: "95%" }}>
                                    <li>
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Choosing the Right Mattress for Quality Sleep:</p>
                                        <p>
                                            When embarking on the quest for the perfect mattress, understanding your preferred sleeping position is paramount.
                                            Tailoring your choice to match your sleep habits ensures that your spine receives the necessary support. Back sleepers tend to benefit from firmer mattresses that maintain spinal alignment, while side sleepers find comfort in softer options that allow hips and shoulders to sink in. Stomach sleepers, on the other hand,
                                            may opt for a firmer mattress to prevent spinal arching during the night.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Establishing a Budget for Sweet Dreams:</p>
                                        <p>
                                            Determining your budget before delving into the world of mattresses is a crucial first step. The market offers a
                                            wide range of options, pning from budget-friendly to luxurious. It's essential to remember that a higher price tag doesn't necessarily equate to a better mattress. Focus on finding a
                                            mattress that caters to your specific needs while staying within your defined budget.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Prioritizing Quality Materials for Longevity:</p>
                                        <p>
                                            The longevity of a mattress depends on the quality of its materials. High-density foam or innerspring coils often
                                            contribute to better support and increased durability. Investing in a mattress made with top-notch materials ensures that it withstands the test of time,
                                            providing you with a comfortable and supportive sleep surface for years to come.

                                        </p>
                                    </li>
                                    <li >
                                            <p className='fw-bolder' style={{ color: "rgb(2, 2, 94)" }}>Test Before You Rest: The Importance of Trying Out Mattresses:</p>
                                        <p>
                                            When shopping for a mattress, it's crucial to go beyond just visually assessing options.
                                            Take the time to lie down on each mattress you're considering. For in-store shoppers, wear comfortable clothing and easily removable shoes to fully experience the comfort level. Online shoppers should ensure that the store offers a reliable return policy,
                                            providing flexibility in case the mattress doesn't meet expectations.

                                        </p>
                                    </li>
                                </ul>
                                <p>
                                    Tags: <span style={{ borderBottom: "1px solid rgb(2, 2, 94)" }}>choose perfect mattress</span>
                                </p>

                            </div>
                        </>
                    } */}

    </>
}

export default SingleBlog