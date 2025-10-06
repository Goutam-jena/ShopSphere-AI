import React from 'react';
import HomeCategoryCard from './HomeCategoryCard';

const HomeCategory = ({ data, sectionName }: { data: any[], sectionName: string }) => {
  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold text-gray-800 py-5'>{sectionName}</h1>
      <div className='flex flex-wrap items-center justify-center gap-5'>
        {data.map((item) => <HomeCategoryCard key={item.categoryId} item={item} />)}
      </div>
    </div>
  );
};

export default HomeCategory;