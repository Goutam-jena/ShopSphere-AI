import React from 'react';

const Banner = () => {
  return (
    <div className='relative'>
      <img
        className='w-full'
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/b656a7f4-4688-480c-a616-51d0d5f5a89d1658752386588-Western-Wear_Desk.jpg"
        alt="Main Banner"
      />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white space-y-2 lg:space-y-5'>
        <h1 className='text-2xl lg:text-5xl font-bold'>BIGGEST DEALS ON TOP BRANDS</h1>
        <p className='text-sm lg:text-lg'>Shop from the best brands in fashion</p>
      </div>
    </div>
  );
};

export default Banner;