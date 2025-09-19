import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
import { fetchProductById } from '../../../../Redux Toolkit/Customer/ProductSlice';
import { Button } from '@mui/material';

const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(store => store);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        }
    }, [productId, dispatch]);

    if (!products.product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col items-center">
                    <img src={products.product.images[0]} alt={products.product.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">{products.product.title}</h1>
                    <p className="text-gray-600">{products.product.description}</p>
                    <div className='flex items-center space-x-2'>
                        <p className='text-2xl font-semibold'>₹{products.product.sellingPrice}</p>
                        <p className='text-lg line-through opacity-50'>₹{products.product.mrpPrice}</p>
                        <p className='text-lg text-green-600 font-semibold'>{products.product.discountPercent}% off</p>
                    </div>
                    <Button variant="contained" color="primary" sx={{ px: '2rem', py: '1rem' }}>Add To Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;