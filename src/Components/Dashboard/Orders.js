import React, { useEffect, useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setIsLoading(true);
    
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order`)
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const updateStatus = (orderId, newStatus) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/updateStatus`, {
        id: orderId,
        status: newStatus,
      })
      .then(() => {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        toast.success('Status updated');
      });
  };

  const filteredOrder = orders?.filter((data) => {
    
    const lowerCaseSearch = search.toLowerCase();
    return (
      data?.name1?.toLowerCase().includes(lowerCaseSearch) ||
      data?.email?.toLowerCase().includes(lowerCaseSearch) ||
      data?.status?.toLowerCase().includes(lowerCaseSearch) ||
      (typeof data?.number1 === 'string' && data?.number1.includes(lowerCaseSearch)) ||
      data?.orderId?.toLowerCase().includes(lowerCaseSearch)
    );
  });


  const DeleteOrder = (dataId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteOrder?id=${dataId}`).then(() => {
      setOrders(orders.filter((item) => dataId !== item._id));
      toast.success('Order Delete');
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
    <>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-lg-12 col-sm-12 d-flex justify-content-between'>
            <div className=''>
              <h1 className='p_head'>Orders List</h1>
            </div>
            <div>
              <input
                type='search'
                className='w-100 form-control mb-2 mr-sm-2'
                placeholder='Search Anything'
                value={search}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </div>
        <div className='row px-0'>
          <div className='col'>
            {isLoading ? (
              <div className='col-lg col-sm-12 d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                <Loader />
              </div>
            ) : filteredOrder.length === 0 ? (
              <div className="col-12" style={{ height: "300px" }}>
                <p className='text-center'>No Order Found...</p>
              </div>
            ) : (
              <>
                {filteredOrder.length > 0 ? (
                  <div className='table-responsive' style={{ backgroundColor: 'white' }}>
                    <table className='table table-striped table-bordered table-hover' >
                      <thead>
                        <tr className='text-center'>
                          <th>Sr#</th>
                          <th>OrderId</th>
                          <th>Status</th>
                          <th>Name</th>
                          {/* <th>Email</th> */}
                          <th>Contact</th>
                          <th>Shipping</th>
                          <th>Products</th>
                          <th>Price</th>
                          <th>Date</th>
                          <th>Detail</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrder.map((data, index) => {
                          const orderItemsLength = data.orderItems.length;
                          let totalFprice = 0;
                          data.orderItems.forEach((item) => {
                            totalFprice += parseFloat(item.Fprice);
                          });
                          const rowClassName = data.status === 'delivered' ? 'completed-row' : '';
                          return (
                            <tr key={index} className={`text-center ${rowClassName}`}>
                              <td className='text-center'>{index + 1}</td>
                              <td>{data.orderId}</td>
                              <td>
                                <select className='order_Select'
                                  name=''
                                  id=''
                                  value={data.status}
                                  onChange={(e) => updateStatus(data._id, e.target.value)}
                                >
                                  <option value='pending'>Pending</option>
                                  <option value='delivered'>Delivered</option>
                                </select>
                              </td>
                              <td>{data.name1}</td>
                              {/* <td>{data.email}</td> */}
                              <td>{data.number1}</td>
                              <td>&pound;{data.shipping}</td>
                              <td className='text-center'>{orderItemsLength}</td>
                              <td className='text-center'>&pound;{data.total?.toFixed()}</td>
                              <td className='text-center'>{formatDateTime(data.date)}</td>
                              <td className='text-center'>
                                <a href={`/order-detail/${data._id}`}>Detail</a>
                              </td>
                              <td className='text-center'>
                                <button className='delete_btn' onClick={() => DeleteOrder(data._id)}>
                                  <AiFillDelete />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center">
                    <p>No orders found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
