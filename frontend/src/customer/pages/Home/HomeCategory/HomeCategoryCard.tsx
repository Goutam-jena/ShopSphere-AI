


















import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeCategory } from '../../../../types/homeDataTypes';
import "./HomeCategoryCard.css";


interface HomeCategoryCardProps {
  item: HomeCategory;
}

const HomeCategoryCard = ({ item }: HomeCategoryCardProps) => {
  const navigate = useNavigate();

 
  const handleNavigate = () => {
    navigate(`/products/${item.categoryId}`);
  };

  return (
    <div onClick={handleNavigate} className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
      <div className='custom-border w-[150px] lg:w-[249px] h-[150px] lg:h-[249px] rounded-full bg-teal-400'>
        {/* Added alt text using item.name for better accessibility */}
        <img
          className='group-hover:scale-95 transition-transform transform duration-700 object-cover object-top h-full w-full'
          src={item.image}
          alt={item.name || 'Category Image'}
        />
      </div>
      <h1 className='font-medium'>{item.name}</h1>
    </div>
  );
};

export default HomeCategoryCard;