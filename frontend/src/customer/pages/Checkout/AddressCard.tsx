import React from 'react';
import { Button } from '@mui/material';
import { Address } from '../../../types/userTypes';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
import { useNavigate } from 'react-router-dom';

const AddressCard = ({ address }: { address: Address }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  const handleSelectAddress = () => {
    if (jwt) {
      dispatch(createOrder({ address, jwt, navigate }));
    }
  };

  return (
    <div className='p-5 shadow-lg border rounded-md space-y-3'>
      <p className='font-semibold'>{address.name}</p>
      <p>{`${address.address}, ${address.locality}, ${address.city}, ${address.state} - ${address.pinCode}`}</p>
      <div className='space-y-1'>
        <p className='font-semibold'>Phone Number</p>
        <p>{address.mobile}</p>
      </div>
      <Button variant="contained" onClick={handleSelectAddress}>Deliver Here</Button>
    </div>
  );
};

export default AddressCard;