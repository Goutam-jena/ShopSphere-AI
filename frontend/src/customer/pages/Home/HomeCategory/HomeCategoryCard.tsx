import React from 'react';

const HomeCategoryCard = ({ item }: any) => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3'>
      <div className='h-[13rem] w-[10rem]'>
        <img className='object-cover object-top w-full h-full' src={item.image} alt={item.name} />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-medium text-gray-900'>{item.name}</h3>
      </div>
    </div>
  );
};

export default HomeCategoryCard;