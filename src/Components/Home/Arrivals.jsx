import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./card.css";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Arrivals = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [arrivedVideo,setArrivedVideo]=useState([])
    const [isUploaded, setIsUploaded] = useState(false);
    const [passing,setPassing]=useState(false)
/* User */
useEffect(() => {
    const fetchVideoUrl = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) return;

        const decoded = jwtDecode(token);
        const userId = decoded?.tokenId;

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getVideo/${userId}`);
            console.log(response.data,"images")
            setArrivedVideo(response.data);
        } catch (error) {
            console.error('Error fetching video URL:', error);
        }
    };

    fetchVideoUrl();
}, [passing]); 
/* User */
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/collect/products/active`);
                console.log(response.data,"data here")
                setProducts(response.data);
            } catch (error) {
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    /* Video Testimonial */
    const [videoFile, setVideoFile] = useState(null);
    const [video, setVideo] = useState(null);
    const [recordedVideoURL, setRecordedVideoURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(URL.createObjectURL(file));
            setVideo(file);
        }
    };

    const startRecording = async () => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            toast.error("You need to be logged in to record a video.");
            navigate('/login'); // Navigate to login if not logged in
            return;
        }

        setIsRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;

        mediaRecorderRef.current = new MediaRecorder(stream);
        let chunks = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/mp4' });
            setRecordedVideoURL(URL.createObjectURL(blob));
            setVideo(blob);
            chunks = [];
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const handleUpload = async () => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            toast.error("You need to be logged in to upload a video.");
            navigate('/login'); // Navigate to the login page if not logged in
            return;
        }

        const data = new FormData();
        data.append("file", video);
        data.append("upload_preset", "adeelrana");
        data.append("cloud_name", "dr3ie9gpz");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dr3ie9gpz/video/upload", data);
            const videoUrl = res.data.url;

            const decoded = jwtDecode(token);
            const userId = decoded?.tokenId;

            const backendResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-video`, {
                url: videoUrl,
                user: userId
            });

            setVideoUrl(backendResponse.data.url);
            setIsUploaded(true);
            setRecordedVideoURL(null);
            setVideoFile(null);
            toast.success("Video Uploaded Successfully!");
            setPassing(!passing)
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    const handleAddVideoClick = () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.error("You need to be logged in to add a video."); // Show toast message
            navigate('/login'); // Redirect to login if not logged in
        } else {
            document.getElementById("uploadVideo").click(); // Trigger file input click
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="home_heading text-center mb-5">NEW ARRIVALS</h1>
                </div>
            </div>
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2">
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

            {/* Video Testimonial */}
            <div className="text-center my-3">
                <h2>Add or Record Video</h2>

                {/* Add Video Button */}
                <input
                    type="file"
                    accept="video/*"
                    style={{ display: 'none' }}
                    id="uploadVideo"
                    onChange={handleVideoChange}
                />
                <button onClick={handleAddVideoClick} style={buttonStyle}>
                    Add Video
                </button>

                {/* Record Video Button */}
                <button onClick={isRecording ? stopRecording : startRecording} style={buttonStyle}>
                    {isRecording ? 'Stop Recording' : 'Record Video'}
                </button>

                {/* Video Preview */}
                {!isUploaded && (
                    <>
                        {videoFile && (
                            <div>
                                <h3>Selected Video</h3>
                                <video src={videoFile} controls width="300" style={{ margin: '10px 0' }}></video>
                            </div>
                        )}

                        {recordedVideoURL && (
                            <div>
                                <h3>Recorded Video</h3>
                                <video src={recordedVideoURL} controls width="300" style={{ margin: '10px 0' }}></video>
                            </div>
                        )}
                    </>
                )}

                {/* Uploaded Video Preview */}
                {isUploaded && (
                    <div>
                        <h3>Uploaded Video Check Below</h3>
                        {/* <video src={videoFile} controls autoPlay width="300" style={{ margin: '10px 0' }}></video> */}
                    </div>
                )}

                {/* Recording Live Stream */}
                {isRecording && (
                    <div>
                        <h3>Recording...</h3>
                        <video ref={videoRef} autoPlay width="300" style={{ margin: '10px 0' }}></video>
                    </div>
                )}

                {/* Upload Button */}
                <button onClick={handleUpload} style={buttonStyle}>
                    Upload Video
                </button>
            </div>
            {arrivedVideo?.length ? 
<>
                Here is Already Uploaded Video <br/>
                <div style={{display:'flex' , gap:'10px'}}>

                {arrivedVideo && arrivedVideo.length > 0 ? (
            arrivedVideo.map((data, i) => (
                <div style={{display:'flex'}} key={i}>
                    <video height={200} src={data.url} controls autoPlay  style={{ margin: '10px 0' }}></video>
                </div>
            ))
        ) : (
            <p>No videos available</p>
        )}
                        </div>

                {/* <video height={300} src={arrivedVideo}></video> */}
</>
                :'No Video Added By This User'
            }
        </div>
    );
};

const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default Arrivals;
