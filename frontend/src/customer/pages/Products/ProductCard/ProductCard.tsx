import React from 'react';
import { Product } from '../../../../types/productTypes';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/product-details/${product.category?.categoryId}/${product.title}/${product._id}`)
    }
    return (
        <div onClick={handleNavigate} className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border'>
            <div className='h-[13rem] w-[10rem]'>
                <img className='object-cover object-top w-full h-full' src={product.images[0]} alt="" />
            </div>
            <div className='p-4'>
                <h3 className='text-lg font-medium text-gray-900'>{product.title}</h3>
                <p className='mt-2 text-sm text-gray-500'>{product.description.substring(0, 45)}...</p>
                <div className='mt-5 flex items-center space-x-2'>
                    <p className='font-semibold'>₹{product.sellingPrice}</p>
                    <p className='line-through opacity-50'>₹{product.mrpPrice}</p>
                    <p className='text-green-600 font-semibold'>{product.discountPercent}% off</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;