import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchUserOrderHistory } from '../../../Redux Toolkit/Customer/OrderSlice';
import { Order } from '../../../types/orderTypes';

const OrderHistory = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(store => store);
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if (jwt) {
            dispatch(fetchUserOrderHistory(jwt));
        }
    }, [jwt, dispatch]);

    return (
        <div className='p-5'>
            <h1 className='text-2xl font-bold mb-5'>Order History</h1>
            <div className='space-y-5'>
                {orders.orders.map((order: Order) => (
                    <div key={order._id} className='p-5 border rounded-md shadow-md'>
                        <p className='font-semibold'>Order ID: {order._id}</p>
                        <p>Status: <span className='font-bold'>{order.orderStatus}</span></p>
                        <p>Total: ₹{order.totalSellingPrice}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;