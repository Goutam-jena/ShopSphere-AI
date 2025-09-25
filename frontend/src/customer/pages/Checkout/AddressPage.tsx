import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../Redux Toolkit/Store';
import AddressCard from './AddressCard';
import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
import { useNavigate } from 'react-router-dom';
import { Address } from '../../../types/userTypes';

const AddressPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(store => store);
  const jwt = localStorage.getItem('jwt');

  const handleSelectAddress = (address: Address) => {
    dispatch(createOrder({ address, jwt: jwt!, navigate }));
    // For now, we assume the order is placed. Payment will be handled next.
    alert("Order placed successfully! (Payment integration is next)");
    navigate("/");
  };

  return (
    <div className="p-5 lg:px-20">
      <h1 className="text-xl font-bold py-7">Select Address</h1>
      <div className="space-y-4">
        {user.user?.addresses?.map((address) => (
          <AddressCard key={address._id} address={address} onSelectAddress={handleSelectAddress} />
        ))}
      </div>
    </div>
  );
};

export default AddressPage;