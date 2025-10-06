import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchUserOrderHistory } from '../../../Redux Toolkit/Customer/OrderSlice';
import { Grid, Typography, Divider } from '@mui/material';
import OrderItemCard from './OrderItemCard';
import { Order } from '../../../types/orderTypes';

const OrderHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(store => store);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserOrderHistory(jwt));
    }
  }, [jwt, dispatch]);

  return (
    <div className="p-5">
      <Typography variant="h5" className="font-bold mb-6">
        My Orders
      </Typography>

      {/* If no orders */}
      {(!orders.orders || orders.orders.length === 0) && (
        <Typography variant="body1" color="text.secondary">
          You haven’t placed any orders yet.
        </Typography>
      )}

      <div className="space-y-8">
        {orders.orders?.map((order: Order) => (
          <div key={order._id} className="p-5 border rounded-lg shadow-md bg-white space-y-4">
            
            {/* 🧾 Order Summary Section */}
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="subtitle1" className="font-semibold">
                  Order ID: {order._id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </div>
              <div className="text-right">
                <Typography variant="subtitle1" className="font-semibold">
                  Total: ₹{order.totalSellingPrice}
                </Typography>
                <Typography
                  variant="body2"
                  className={
                    order.orderStatus === 'DELIVERED'
                      ? 'text-green-600'
                      : order.orderStatus === 'CANCELLED'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }
                >
                  {order.orderStatus}
                </Typography>
              </div>
            </div>

            <Divider />

            {/* 🛒 Order Items Section */}
            <Grid container spacing={2}>
              {order.orderItems.map((item) => (
                <Grid item xs={12} key={item._id}>
                  <OrderItemCard item={item} order={order} />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
