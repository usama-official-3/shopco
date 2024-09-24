import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import Loader from "../Loader/Loader"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddCollections = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const cu = useSelector(store => store.userSection.cu);
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(false);

    let move = useNavigate();

    const { collectionId } = useParams();

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        defaultValues: {
            category: collection?.category || "",
            subCategory: collection?.subCategory || [{ name: '' }]
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'subCategory'
    });

    useEffect(() => {
        if (collectionId) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/collection_edit?id=${collectionId}`).then(function (resp) {
                setCollection(resp.data);
            });
        }
    }, [collectionId]);

    useEffect(() => {
        if (collectionId) {
            reset(collection);
        }
    }, [collection, reset]);

    async function submitCollection(data) {
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
                console.error("Error uploading image:", error);
            }
        } else {
            cloudinaryUrl = collection ? collection.image : '';
        }

        setLoading(true);

        try {
            data.image = cloudinaryUrl;
            if (collectionId) {
                await axios.put(`${process.env.REACT_APP_BASE_URL}/collection_update`, data);
                toast.success("Collection updated");
            } else {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/collection`, data);
                toast.success("Collection created");
            }
            move('/admin-dashboard');
        } catch (error) {
            console.error("Error submitting collection:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='container my-4'>
                <div className='row border py-5 px-4'>
                    <div className='col-lg-12 col-sm-12'>
                        <div className='d-flex justify-content-between'>
                            {!collection ? <h1 className='p_head'>Add Collection</h1> : <h1 className='p_head'>Edit Collection</h1>}
                            <p className='panel_btn' onClick={() => move("/admin-dashboard")}>Admin Panel</p>
                        </div>
                        {loading ? (
                            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                                <Loader />
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(submitCollection)}>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-6 col-sm-12 my-2'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Category Title *</label>
                                        <input type="text" {...register('category', { required: true })} className="form-control mb-2 mr-sm-2" />
                                        {errors.category && <div className='error'>Title is required</div>}
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12 my-2'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Add Sub Category</label>
                                        {fields.map((field, index) => (
                                            <div key={field.id} className='d-flex mb-2'>
                                                <input type="text" {...register(`subCategory.${index}.name`)} className="form-control" />
                                                <button type="button" className="ml-2" onClick={() => remove(index)}>Remove</button>
                                            </div>
                                        ))}
                                        <button type="button" className="button-submit px-4" onClick={() => append({ name: '' })}>
                                            Add Subcategory
                                        </button>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12 my-2'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Image *</label>
                                        <input type="file" {...register('image', { required: collectionId ? false : true })} className="form-control mb-2 mr-sm-2" />
                                        {errors.image && <div className='error'>Image is required</div>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 col-sm-12 my-5'>
                                        <button type="submit" className="button-submit px-4" style={{ width: "200px" }}>
                                            {collection ? "Update" : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCollections;
