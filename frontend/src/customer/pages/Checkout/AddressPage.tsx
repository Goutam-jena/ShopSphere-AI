// import React from 'react';
// import { useAppSelector, useAppDispatch } from '../../../Redux Toolkit/Store';
// import AddressCard from './AddressCard';
// import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
// import { useNavigate } from 'react-router-dom';
// import { Address } from '../../../types/userTypes';

// const AddressPage = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { user } = useAppSelector(store => store);
//   const jwt = localStorage.getItem('jwt');

//   const handleSelectAddress = (address: Address) => {
//     dispatch(createOrder({ address, jwt: jwt!, navigate }));
//     // For now, we assume the order is placed. Payment will be handled next.
//     alert("Order placed successfully! (Payment integration is next)");
//     navigate("/");
//   };

//   return (
//     <div className="p-5 lg:px-20">
//       <h1 className="text-xl font-bold py-7">Select Address</h1>
//       <div className="space-y-4">
//         {user.user?.addresses?.map((address) => (
//           <AddressCard key={address._id} address={address} onSelectAddress={handleSelectAddress} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddressPage;




















import React from 'react';
import { useAppSelector } from '../../../Redux Toolkit/Store';
import AddressCard from './AddressCard';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddressPage = () => {
  const navigate = useNavigate();
  const { user, orders } = useAppSelector(store => store);

  return (
    <div className="p-5 lg:px-20">
      <h1 className="text-xl font-bold py-7">Select Address</h1>
      {orders.loading && (
        <div className='h-screen flex flex-col justify-center items-center'>
          <CircularProgress />
          <p className='mt-4'>Processing your order...</p>
        </div>
      )}
      {!orders.loading && (
        <div className="space-y-4">
          {user.user?.addresses?.length ? (
            user.user.addresses.map((address) => (
              <AddressCard key={address._id} address={address} />
            ))
          ) : (
            <div className="text-center">
              <p>No addresses found. Please add an address to your profile.</p>
              <Button onClick={() => navigate('/account/addresses')} sx={{ mt: 2 }}>Add Address</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressPage;