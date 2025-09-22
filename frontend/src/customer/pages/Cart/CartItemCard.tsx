import React from 'react';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { deleteCartItem, updateCartItem } from '../../../Redux Toolkit/Customer/CartSlice';

const CartItemCard = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem('jwt');

  const handleUpdateCartItem = (quantity: number) => {
    dispatch(updateCartItem({ jwt, cartItemId: item._id, cartItem: { quantity } }));
  };

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem({ jwt: jwt!, cartItemId: item._id }));
  };

  return (
    <div className='p-5 shadow-lg border rounded-md mb-3'>
      <div className='flex items-center'>
        <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
          <img className='w-full h-full object-cover object-top' src={item.product.images[0]} alt="" />
        </div>
        <div className='ml-5 space-y-1'>
          <p className='font-semibold'>{item.product.title}</p>
          <p className='opacity-70'>Size: {item.size}</p>
          <p className='opacity-70 mt-2'>Seller: {item.product.seller?.sellerName}</p>
          <div className='flex space-x-2 items-center text-gray-900 pt-2'>
            <p className='font-semibold'>₹{item.sellingPrice}</p>
            <p className='opacity-50 line-through'>₹{item.mrpPrice}</p>
            <p className='text-green-600 font-semibold'>{item.product.discountPercent}% off</p>
          </div>
        </div>
      </div>
      <div className='lg:flex items-center lg:space-x-10 pt-4'>
        <div className='flex items-center space-x-2'>
          <IconButton onClick={() => handleUpdateCartItem(item.quantity - 1)} disabled={item.quantity <= 1}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className='py-1 px-7 border rounded-sm'>{item.quantity}</span>
          <IconButton onClick={() => handleUpdateCartItem(item.quantity + 1)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
          <Button onClick={handleDeleteCartItem} color="error">Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;