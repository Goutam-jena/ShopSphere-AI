import React, { useEffect } from 'react';
import CartItemCard from './CartItemCard';
import PricingCard from './PricingCard';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchUserCart } from '../../../Redux Toolkit/Customer/CartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(store => store);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserCart(jwt));
    }
  }, [jwt, dispatch]);

  return (
    <div className='lg:grid grid-cols-3 lg:px-16 relative mt-5'>
      <div className='col-span-2'>
        {cart.cart?.cartItems.map((item) => <CartItemCard key={item._id} item={item} />)}
      </div>
      <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
        {cart.cart && <PricingCard cart={cart.cart} />}
      </div>
    </div>
  );
};

export default Cart;