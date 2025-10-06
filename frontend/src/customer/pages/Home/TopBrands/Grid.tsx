import React from 'react';

const Grid = ({ data }: { data: any[] }) => {
  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold text-gray-800 py-5'>Top Brands</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {data.map((item, i) => (
          <div key={i} className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden'>
            <img className='object-cover object-top w-full' src={item.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;