import React, { useEffect } from 'react';
import CartItemCard from './CartItemCard';
import PricingCard from './PricingCard';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchUserCart } from '../../../Redux Toolkit/Customer/CartSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart, auth } = useAppSelector(store => store);

  useEffect(() => {
    if (auth.jwt) {
      dispatch(fetchUserCart(auth.jwt));
    }
  }, [auth.jwt, dispatch]);

  if (!cart.cart || cart.cart.cartItems.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty!</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button variant="contained" onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className='lg:grid grid-cols-3 lg:px-16 relative mt-5'>
      <div className='col-span-2 space-y-3'>
        {cart.cart?.cartItems.map((item) => <CartItemCard key={item._id} item={item} />)}
      </div>
      <div className='px-5 sticky top-5 h-[100vh] mt-5 lg:mt-0'>
        {cart.cart && <PricingCard cart={cart.cart} />}
      </div>
    </div>
  );
};

export default Cart;