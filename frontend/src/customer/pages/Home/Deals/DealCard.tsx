import { Deal } from '../../../../types/dealTypes';
import React from 'react';

const DealCard = ({ deal }: { deal: Deal }) => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3'>
      <div className='h-[13rem] w-[10rem]'>
        <img className='object-cover object-top w-full h-full' src={deal.category.image} alt={deal.category.name} />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-medium text-gray-900'>{deal.category.name}</h3>
        <p className='mt-2 text-sm text-green-600 font-semibold'>{deal.discount}% Off</p>
      </div>
    </div>
  );
};

export default DealCard;