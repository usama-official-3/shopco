import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from "../Loader/Loader"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddBlog = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const cu = useSelector(store => store.userSection.cu);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(new FormData());

    let move = useNavigate();

    const { blogId } = useParams();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: blog,
    });

    useEffect(() => {
        try {
            if (blogId) {
                axios.get(`${process.env.REACT_APP_BASE_URL}/blog_edit?id=${blogId}`).then(function (resp) {
                    setBlog(resp.data);
                });
            }
        } catch (e) {
        }
    }, []);
    
    useEffect(() => {
        if (blogId) {
            reset(blog);
        }
    }, [blog]);

    async function submitBlog(data) {
        window.scrollTo({
            top: 0,
        });

        let cloudinaryUrl = "";

        if (data.image && data.image[0]) {
            const formData = new FormData();
            formData.append('file', data.image[0]);
            formData.append('upload_preset', 'zonfnjjo');
            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dlw9hxjr4/image/upload", formData);
                cloudinaryUrl = response.data.url;
            } catch (error) {
            }
        } else {
            cloudinaryUrl = blog ? blog.image : '';
        }

        setLoading(true);

        if (blogId) {
            try {
                data.image = cloudinaryUrl;
                const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/blog_update`, data);
                setLoading(false);
                toast.success("Blog updated");
                move('/admin-dashboard');
            } catch (error) {
                console.error("Error updating blog:", error);
                setLoading(false);
            }
        } else {
            try {
                data.image = cloudinaryUrl;
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/blog`, data);
                if (response.data) {
                    toast.success("Blog Uploaded");
                    reset();
                }
            } catch (error) {
                console.error("Error creating blog:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    return <>
        <div className='container my-4'>
            <div className='row border py-5 px-4'>
                <div className='col-lg-12 col-sm-12'>
                    <div className='d-flex justify-content-between'>
                        {!blog &&
                            <h1 className='p_head' style={{ color: "darkblue" }}> Add Blog </h1>
                        }
                        {blog &&
                            <h1 className='p_head' style={{ color: "rgb(2, 2, 94)" }}> Edit Blog </h1>
                        }
                        <p className='panel_btn' onClick={() => move("/admin-dashboard")}>Admin Panel</p>
                    </div>
                    {loading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : (
                        <form>
                            <div className='row'>
                                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Add Title *</label>
                                    <input type="text" {...register('title', { required: true })} className="form-control mb-2 mr-sm-2" />
                                    {errors.title && errors.title.type == "required" ? <div className='error'> Title is required </div> : null}
                                </div>
                                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Author Name</label>
                                    <input type="text" {...register('author')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Publish Date</label>
                                    <input
                                        type="date"
                                        defaultValue={blog ? blog.issueDate : ''}
                                        {...register('issueDate')}
                                        className="form-control mb-2 mr-sm-2"
                                    />
                                </div>
                                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Image *</label>
                                    <input type="file"
                                        {...register('image',
                                            {
                                                required: blogId ? false : true,
                                                minLength: 1,
                                            })}
                                        className="form-control mb-2 mr-sm-2" />
                                    {errors.image && errors.image.type == "required" ? <div className='error'>Image is required</div> : null}
                                    {errors.image && errors.image.type === 'minLength' && <div className='error'>At least one image is required</div>}

                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Introduction *</label>
                                    <textarea type="text" rows={3} {...register('introduction', { required: true })} className="form-control mb-2 mr-sm-2" />
                                    {errors.introduction && errors.introduction.type == "required" ? <div className='error'>Introduction is required</div> : null}
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 1 *</label>
                                    <input type="text"  {...register('heading1', { required: true })} className="form-control mb-2 mr-sm-2" />
                               </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 1 *</label>
                                    <textarea type="text" rows={3} {...register('description1', { required: true })} className="form-control mb-2 mr-sm-2" />
                                    {errors.description1 && errors.description1.type == "required" ? <div className='error'>Discription is required</div> : null}
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 2</label>
                                    <input type="text" {...register('heading2')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 2</label>
                                    <textarea type="text" rows={3} {...register('description2')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 3</label>
                                    <input type="text"{...register('heading3')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 3</label>
                                    <textarea type="text" rows={3} {...register('description3')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 4</label>
                                    <input type="text" {...register('heading4')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 4</label>
                                    <textarea type="text" rows={3} {...register('description4')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 5</label>
                                    <input type="text" {...register('heading5')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 5</label>
                                    <textarea type="text" rows={3} {...register('description5')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 6</label>
                                    <input type="text" {...register('heading6')} className="form-control mb-2 mr-sm-2" />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 6</label>
                                    <textarea type="text" rows={3} {...register('description6')} className="form-control mb-2 mr-sm-2" />
                                </div>
                            </div>
                            <div className='row'>
                                {!blog &&
                                    <div className='col-lg-12 col-sm-12 my-5'>
                                        <button type="button" className="btn review_btn" style={{ width: "200px" }} onClick={handleSubmit(submitBlog)}>
                                            Submit
                                        </button>
                                    </div>
                                }
                                {blog &&
                                    <div className='col-lg-12 col-sm-12 my-5'>
                                        <button type="button" className="btn review_btn" style={{ width: "200px" }} onClick={handleSubmit(submitBlog)}>
                                            Update
                                        </button>
                                    </div>
                                }
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>

    </>
}

export default AddBlog