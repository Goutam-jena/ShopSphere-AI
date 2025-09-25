import React from 'react';
import { Button } from '@mui/material';
import { Address } from '../../../types/userTypes';

const AddressCard = ({ address, onSelectAddress }: { address: Address, onSelectAddress: (address: Address) => void }) => {
  return (
    <div className='p-5 shadow-lg border rounded-md space-y-3'>
      <p className='font-semibold'>{address.name}</p>
      <p>{`${address.address}, ${address.locality}, ${address.city}, ${address.state} - ${address.pinCode}`}</p>
      <div className='space-y-1'>
        <p className='font-semibold'>Phone Number</p>
        <p>{address.mobile}</p>
      </div>
      <Button variant="contained" onClick={() => onSelectAddress(address)}>Deliver Here</Button>
    </div>
  );
};

export default AddressCard;