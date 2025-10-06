import React from 'react';
import ElectronicCategoryCard from './ElectronicCategoryCard';

const ElectronicCategory = ({ data }: { data: any[] }) => {
  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold text-gray-800 py-5'>Shop For Electronics</h1>
      <div className='flex flex-wrap items-center justify-center gap-5'>
        {data.map((item) => <ElectronicCategoryCard key={item.categoryId} item={item} />)}
      </div>
    </div>
  );
};

export default ElectronicCategory;