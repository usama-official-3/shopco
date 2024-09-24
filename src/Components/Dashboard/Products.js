import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Products = () => {

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  let move = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/product`)
        .then((res) => {
          setProduct(res?.data);
          setIsLoading(false);
        })
        .catch((error) => {
        });
    } catch (e) { }
  }, [search]);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const filterProducts = product.filter(item => {

    const searchText = search?.toLowerCase();
    const categoryMatch = item?.category?.toLowerCase().includes(searchText);
    const subCategoryMatch = item?.subCategory?.toLowerCase().includes(searchText);
    const serialNumberMatch = item?.sn?.toString().includes(searchText); 

    return categoryMatch || subCategoryMatch || serialNumberMatch;
  });
  

  const DeleteProduct = (dataId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteProduct?id=${dataId}`).then(() => {
      setProduct(product.filter((item) => dataId !== item._id));
      toast.success("Product Removed")
    });
  };
  const formatDateTime = (dateStr) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
          <div className="">
            <h1 className="p_head">
              Products List
            </h1>
          </div>
          <div>
            <input
              type="search"
              className="w-100 form-control mb-2 mr-sm-2"
              placeholder="Search Anything"
              value={search}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>


      <div className='row px-0 user_row'>
        <div className='col'>
          {isLoading ? (
            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
              <Loader />
            </div>
          ) : filterProducts.length === 0 ? (
            <div className="col-12" style={{ height: "300px" }}>
              <p className='text-center'>No Products Found...</p>
            </div>
          ) : (
            <>
              {filterProducts?.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Sr#</th>
                        <th>Serial</th>
                        <th>Picture</th>
                        {/* <th>Out of Stock</th>
                        <th>Home Screen</th> */}
                        <th>Title</th>
                        <th>Category</th>
                        {/* <th>Sub Category</th> */}
                        <th>Price</th>
                        <th>Final Price</th>
                        <th>Discount</th>
                        <th>Date</th>
                        {/* <th>Delete</th> */}
                        <th>Delete</th>
                        <th>Edit</th>

                      </tr>
                    </thead>
                    <tbody>
                      {filterProducts?.map((data, index) => (
                        <tr key={index} >
                          <td className='text-center'>{index + 1}</td>
                          <td>{data.sn}</td>
                          <td onClick={() => move(`/product/${data.title.replace(/ /g, '-')}/${data._id}`)}>
                            <img src={data.images[0]} alt="No   network" style={{ maxWidth: '80px', height: '80px' }} />
                          </td>
                          {/* <td className='text-center'>{data.stock ? 'Yes' : 'No'}</td>
                          <td className='text-center'>{data.home ? 'Yes' : 'No'}</td> */}

                          <td><a href={"/product/" + data._id} style={{color:"black"}}>{data.title}</a></td>
                          <td >{data?.category}</td>
                          {/* <td className='text-center'>
                            {data.subCategory === undefined || data.subCategory === "" ? "No subCategory" : data.subCategory}
                          </td> */}
                          <td className='text-center'>&pound;{data?.price?.toFixed()}</td>
                          <td className='text-center'>&pound;{data?.Fprice?.toFixed()}</td>
                          <td className='text-center'>{data.discount ? data.discount + '%' : '0%'}</td>
                          <td className='text-center'>{formatDateTime(data.date)}</td>
                          <td className='text-center'>
                            <button
                              className="delete_btn"
                              onClick={() => DeleteProduct(data._id)}>
                              <AiFillDelete />
                            </button>
                          </td>
                          <td className='text-center'>
                            <a href={`/admin-dashboard-add-product/${data._id}`}>
                              <button
                                className="delete_btn"
                                style={{ color: "rgb(2, 2, 94)" }}>
                                <FaPencilAlt />
                              </button>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>


    </div>
  );
};
