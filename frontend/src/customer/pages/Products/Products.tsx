import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { getAllProducts } from '../../../Redux Toolkit/Customer/ProductSlice';
import ProductCard from './ProductCard/ProductCard';
import { useParams } from 'react-router-dom';
// import FilterSection from './FilterSection'; // We will add this later

const Products = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(store => store);
    const { categoryId } = useParams();

    useEffect(() => {
        const params = { category: categoryId };
        dispatch(getAllProducts(params));
    }, [categoryId, dispatch]);

    return (
        <div className="flex">
            <div className="w-1/4 p-4">
                {/* <FilterSection /> */}
            </div>
            <div className="w-3/4 p-4">
                <div className="flex flex-wrap justify-center bg-white py-5">
                    {products.products?.map((item) => <ProductCard key={item._id} product={item} />)}
                </div>
            </div>
        </div>
    );
};

export default Products;