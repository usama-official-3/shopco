import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from "../Loader/Loader"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import "./addproduct.css"

export const AddProduct = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const cu = useSelector(store => store.userSection.cu);
  const [product, setProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [collection, setCollection] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(product ? product.discount : 0);
  const [finalPrice, setFinalPrice] = useState(product ? product.Fprice : 1);;
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState(new FormData());
  const [open, setOpen] = useState(false);

  const toggleMore = () => {
    setOpen(!open);
  }

  let move = useNavigate();

  const { productId } = useParams();


  const handleDiscountChange = (e) => {
    const newDiscount = parseFloat(e.target.value);
    const newFinalPrice = price - (price * (newDiscount / 100));
    setDiscount(newDiscount);
    setFinalPrice(newFinalPrice);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    const newFinalPrice = newPrice - (newPrice * (discount / 100));
    setPrice(newPrice);
    setFinalPrice(newFinalPrice);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: product,
  });


  useEffect(() => {
    try {
      if (productId) {
        axios.get(`${process.env.REACT_APP_BASE_URL}/product_edit?id=${productId}`).then(function (resp) {
          setProduct(resp?.data);
          setPrice(resp?.data?.price);
          setDiscount(resp?.data?.discount);
          setFinalPrice(resp?.data?.Fprice);
          setSelectedCategory(resp?.data?.category);
          const imageArray = [];
          for (let i = 0; i < resp.data.images.length; i++) {
            imageArray.push(resp.data.images[i]);
          }
          setImagePreviews(imageArray);
        });
      }
    } catch (e) {

    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/collection`)
      .then((res) => {
        console.log(res.data)
        setCollection(res?.data);
      })
      .catch((error) => {
      });
  }, []);

  const handleImageChange = async (e) => {

    const files = Array.from(e.target.files);

    if (files.length + imagePreviews.length > 10) {
      setError('images');
      return;
    }

    const newFormData = new FormData();

    const existingImages = productId ? product.images : [];
    existingImages.forEach((img) => {
      newFormData.append('images', img);
    });
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prevPreviews) => [...prevPreviews, e.target.result]);
      };

      reader.readAsDataURL(file);
      newFormData.append('images', file);
    }

    setFormData(newFormData);
  };



  const handleImageDelete = (index) => {

    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImagePreviews(updatedPreviews);

    const newFormData = new FormData();

    updatedPreviews.forEach((preview) => {

      newFormData.append('images', preview);

    });

    setFormData(newFormData);
  };


  useEffect(() => {
    if (productId) {
      reset(product);
    }
  }, [product]);


  async function submitProduct(data) {

    window.scrollTo({
      top: 0,
    });

    if (imagePreviews.length > 10) {
      setError('images');
      return;
    }

    setLoading(true);

    const cloudinaryUrls = [];

    for (const file of imagePreviews) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', "zonfnjjo");

      try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dlw9hxjr4/image/upload", formData);
        cloudinaryUrls.push(response.data.url);
      } catch (error) {
      }
    }

    if (productId) {
      if (selectedCategory !== "bed" && selectedCategory !== "sofa" && selectedCategory !== "dining-table") {
        setSelectedCategory('');
      }
      data.images = cloudinaryUrls;
      data.discount = discount;
      data.price = price;
      data.Fprice = finalPrice;
      try {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/product-update`, data);
        setLoading(false);
        toast.success("Product updated");
        // move('/admin-dashboard');
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === 'Cannot add more than 10 images') {
          return setError('images');
        }
      }
    } else {
      data.images = cloudinaryUrls;
      data.discount = discount;
      data.price = price;
      data.Fprice = finalPrice;
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, data);
        if (response.data) {
          toast.success("Product Uploaded");
          reset();
          setImagePreviews([])
          setFinalPrice('')
          setPrice('')
          setError('')
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError("Serial number");
          setImagePreviews([])
        } else {
          toast.error("Try Again later");
        }
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
            {!product &&
              <h1 className='p_head fw-bolder'> Add Product </h1>

            }
            {product &&
              <h1 className='p_head fw-bolder'> Edit Product </h1>
            }
            <a href="/admin-dashboard">
              <p className='panel_btn'>Admin Panel</p>
            </a>
          </div>
          {Error === "Serial number" &&
            <div className='error'>Try with different serial number</div>
          }
          {Error === "images" &&
            <div className='error'>Invalid number of images. Must be between 1 and 10</div>
          }
          {loading ? (
            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
              <Loader />
            </div>
          ) : (

            <form>
              <div className='row'>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Add Title *</label>
                  <input type="text" {...register('title', { required: true })} className="form-control mb-2 mr-sm-2 border" />
                  {errors.title && errors.title.type == "required" ? <div className='error'> Title is required </div> : null}
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Serial Number *</label>
                  <input type="number" {...register('sn', { required: true })} min={"1"} className="border form-control mb-2 mr-sm-2" />
                  {errors.sn && errors.sn.type == "required" ? <div className='error'>Serail Number is required</div> : null}
                </div>

                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Select Category *</label>
                  <select  {...register('category', {
                    required: true, validate: function (selectedValue) {
                      if (selectedValue == "select category") {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  })} className="border form-control mb-2 mr-sm-2"
                    onChange={handleCategoryChange}
                  >
                    <option value="select category">Select Category</option>
                    {collection.map((item, index) => {
                      return <>
                        <option style={{color:'black'}} value={item.title} key={index}>{item.category}</option>
                      </>
                    })
                    }
                  </select>
                  {errors.category ? <div className='error'>Category is required</div> : null}
                </div>

                {/* Pricing */}

                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Price *</label>
                  <input type="number" {...register('price', { required: true })} min={1}
                    className="border form-control mb-2 mr-sm-2"
                    defaultValue={product ? product.price : price}
                    onChange={handlePriceChange} />
                  {errors.price && errors.price.type == "required" ? <div className='error'>Price is required</div> : null}
                </div>

                <div className='col-lg-6  col-md-6 col-sm-12 my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Discount</label>
                  <input type="number" {...register('discount')} min={0}
                    className="border form-control mb-2 mr-sm-2"
                    defaultValue={product ? product.discount : discount}
                    onChange={handleDiscountChange} />
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Final Price *</label>
                  <input
                    type="number"
                    {...register('Fprice')}
                    min="1"
                    value={finalPrice}
                    className="border form-control mb-2 mr-sm-2"
                  />
                </div>

                {/* Description */}

                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 1</label>
                  <input type="text"{...register('descriptionHead1')} className="border form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 1</label>
                  <input type="text"{...register('description')} className="border form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 2</label>
                  <input type="text"{...register('descriptionHead2')} className="border form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 2</label>
                  <input type="text"{...register('description2')} className="border form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 3</label>
                  <input type="text" {...register('descriptionHead3')} className="border form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 3</label>
                  <input type="text"{...register('description3')} className="border form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 4</label>
                  <input type="text"{...register('descriptionHead4')} className="border form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 4</label>
                  <input type="text" {...register('description4')} className="border form-control" />
                </div>
                {/* Pictures */}
                <div className='col-lg-6  col-md-6 col-sm-12 my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Product Pics *</label>
                  <input
                    type='file'
                    multiple
                    {...register('images', {
                      required: productId ? false : true,
                      minLength: 1,
                      maxLength: 10,
                    })}
                    className="border form-control mb-2 mr-sm-2"
                    onChange={handleImageChange}
                  />
                  {errors.images && errors.images.type === 'required' && <div className='error'>At least one image is required</div>}
                  {errors.images && errors.images.type === 'maxLength' && <div className='error'>Only Ten images allowed</div>}
                  {errors.images && errors.images.type === 'minLength' && <div className='error'>At least one image is required</div>}
                  <div className='img_preview d-flex flex-wrap px-3 gap-3'>
                    {(imagePreviews).map((preview, index) => (
                      <div className='p-1' key={index}
                        style={{
                          position: "relative",
                          border: "2px dashed rgb(2,2,94)",
                        }}>
                        <img src={preview} alt={`Preview ${index}`}
                          style={{ height: "80px", width: "80px" }} />
                        <button
                          type="button"
                          className='m-0 px-2'
                          style={{
                            position: "absolute", top: "4px",
                            right: "5px",
                            border: "none",
                            backgroundColor: "rgb(0,0,0,0.2)",
                            color: "white",
                          }}
                          onClick={() => handleImageDelete(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='row'>
                {!product &&
                  <div className='col-lg-12 col-sm-12 my-5'>
                    <button type="button" className="button-submit px-4" style={{ width: "200px" }} onClick={handleSubmit(submitProduct)}>
                      Submit
                    </button>
                  </div>
                }
                {product &&
                  <div className='col-lg-12 col-sm-12 my-5'>
                    <button type="button" className="button-submit px-4" style={{ width: "200px" }} onClick={handleSubmit(submitProduct)}>
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
};
