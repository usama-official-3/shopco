import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import axios from 'axios';

const Collections = () => {

    const [collection, setCollection] = useState([]);
    console.log(collection)
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    let move = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/collection`, {
                params: { search }
            })
            .then((res) => {
                setCollection(res?.data);
                setIsLoading(false);
            })
            .catch((error) => {
            });
    }, [search]);

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    };

    const updateStatus = (collectionId, newStatus) => {
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/updateCollectionStatus`, {
            id: collectionId,
            status: newStatus,
          })
          .then(() => {
            const updatedCollections = collection.map((item) =>
              item._id === collectionId ? { ...item, status: newStatus } : item);
            setCollection(updatedCollections);
            toast.success('Collection Status updated');
          });
      };

    const Deletecollection = (dataId) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCollection?id=${dataId}`).then(() => {
            setCollection(collection.filter((item) => dataId !== item._id));
            toast.success("Collection Removed")
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

    return <>
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
                    <div className="">
                        <h1 className="p_head">
                            Collection List
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

            <div className='row px-0'>
                <div className='col'>
                    {isLoading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : collection.length === 0 ? (
                        <div className="col-12" style={{ height: "300px" }}>
                            <p className='text-center'>No Collection Found...</p>
                        </div>
                    ) : (
                        <>
                            {collection.length > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Sr #</th>
                                                <th>Image</th>
                                                <th>Category</th>
                                                <th>Sub category</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th>Delete</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {collection?.map((data, index) => (
                                                <tr key={index} >
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td className='text-center'> <img src={data.image} className='rounded-3 img-fluid' style={{ maxWidth: '80px', height: '80px' }} alt="No Network" /></td>
                                                    <td className='text-center'>{data.category}</td>
                                                    <td className='text-center'>{data.subCategory.map((data,index)=>(
                                                      <>
                                                      {data.name}<br/> 
                                                      </>
                                                    ))}</td>
                                                    <td className='text-center'>
                              <select
                                className=''
                                name=''
                                id=''
                                value={data.status}
                                onChange={(e) => updateStatus(data._id, e.target.value)}
                              >
                                <option value='active'>Active</option>
                                <option value='disable'>Disable</option>
                              </select>
                            </td>
                                                    <td className='text-center'>{formatDateTime(data.date)}</td>
                                                    <td className='text-center'>
                                                        <button className='delete_btn' onClick={() => Deletecollection(data._id)}>
                                                            <AiFillDelete />
                                                        </button>
                                                    </td>
                                                    <td className='text-center'>
                                                        <a href={`/admin-dashboard-add-collection/${data?._id}`}>
                                                            <button
                                                                className="delete_btn"
                                                            >
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
    </>
}

export default Collections