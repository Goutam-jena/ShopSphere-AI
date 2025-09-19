import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import FilterSection from "./FilterSection";
import { Divider, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { getAllProducts } from "../../../Redux Toolkit/Customer/ProductSlice";

const Products = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { products } = useAppSelector(store => store);
    const { categoryId } = useParams();
    const searchParams = new URLSearchParams(location.search);

    const handleFilter = (key: string, value: string) => {
        searchParams.set(key, value);
        navigate({ search: `?${searchParams.toString()}` });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set("pageNumber", (value - 1).toString());
        navigate({ search: `?${searchParams.toString()}` });
    };

    useEffect(() => {
        const params = {
            category: categoryId,
            color: searchParams.get('color') || '',
            minPrice: parseInt(searchParams.get('price')?.split('-')[0] || '0'),
            maxPrice: parseInt(searchParams.get('price')?.split('-')[1] || '100000'),
            minDiscount: parseInt(searchParams.get('discount') || '0'),
            sort: searchParams.get('sort') || 'price_low',
            pageNumber: parseInt(searchParams.get('pageNumber') || '0'),
        };
        dispatch(getAllProducts(params));
    }, [categoryId, location.search, dispatch]);

    return (
        <div className="flex">
            <div className="w-1/4 p-4 sticky top-5 h-screen">
                <FilterSection />
            </div>
            <div className="w-3/4 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold uppercase">{categoryId?.replace("_", " ")}</h1>
                    <FormControl size="small" sx={{ width: "200px" }}>
                        <InputLabel>Sort</InputLabel>
                        <Select label="Sort" value={searchParams.get('sort') || 'price_low'} onChange={(e) => handleFilter('sort', e.target.value)}>
                            <MenuItem value={"price_low"}>Price: Low to High</MenuItem>
                            <MenuItem value={"price_high"}>Price: High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Divider />
                <div className="flex flex-wrap justify-center bg-white py-5">
                    {products.products?.map((item) => <ProductCard key={item._id} product={item} />)}
                </div>
                <div className="flex justify-center mt-5">
                    <Pagination
                        count={products.totalPages}
                        color="primary"
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;