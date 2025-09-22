import { Button, Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ cart }: any) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/checkout/address');
  };
  return (
    <div className='p-5 shadow-lg rounded-md border'>
      <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
      <Divider />
      <div className='space-y-3 font-semibold'>
        <div className='flex justify-between pt-3 text-black'>
          <span>Price ({cart.cartItems.length} items)</span>
          <span>₹{cart.totalMrpPrice}</span>
        </div>
        <div className='flex justify-between pt-3'>
          <span>Discount</span>
          <span className='text-green-600'>-₹{cart.discount}</span>
        </div>
        <div className='flex justify-between pt-3'>
          <span>Delivery Charges</span>
          <span className='text-green-600'>FREE</span>
        </div>
        <Divider />
        <div className='flex justify-between pt-3 font-bold'>
          <span>Total Amount</span>
          <span className='text-green-600'>₹{cart.totalSellingPrice}</span>
        </div>
      </div>
      <Button onClick={handleCheckout} variant='contained' sx={{ mt: '2rem', width: '100%', py: '0.7rem' }}>
        Checkout
      </Button>
    </div>
  );
};

export default PricingCard;