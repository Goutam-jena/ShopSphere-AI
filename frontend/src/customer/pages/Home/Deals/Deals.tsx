import React from 'react';
import DealCard from './DealCard';
import { Deal } from '../../../../types/dealTypes';

const Deals = ({ deals }: { deals: Deal[] }) => {
  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold text-gray-800 py-5'>Deals Of The Day</h1>
      <div className='flex flex-wrap items-center justify-center gap-5'>
        {deals.map((deal) => <DealCard key={deal._id} deal={deal} />)}
      </div>
    </div>
  );
};

export default Deals;