import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
import { fetchProductById } from '../../../../Redux Toolkit/Customer/ProductSlice';
import { Button, IconButton, Rating } from '@mui/material';
import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
import ZoomableImage from './ZoomableImage';
import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
import { isWishlisted } from '../../../../util/isWishlisted';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { products, auth, wishlist } = useAppSelector(store => store);

    const [selectedSize, setSelectedSize] = useState("");

    // ✅ Add to cart
    const handleAddItemToCart = () => {
        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }
        const req = { productId, size: selectedSize, quantity: 1 };
        dispatch(addItemToCart({ jwt: auth.jwt, request: req }));
        navigate('/cart');
    };

    // ✅ Add to wishlist
    const handleAddToWishlist = () => {
        if (productId) {
            dispatch(addProductToWishlist({ productId }));
        }
    };

    // ✅ Fetch product on mount
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        }
    }, [productId, dispatch]);

    if (!products.product) {
        return <div className="p-10 text-center text-xl font-semibold">Loading...</div>;
    }

    // ✅ Check if product already in wishlist
    const wishlisted = wishlist.wishlist ? isWishlisted(wishlist.wishlist, products.product) : false;

    return (
        <div className="bg-white">
            <div className="pt-6">
                <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    
                    {/* ---------- Image Gallery ---------- */}
                    <div className="flex flex-col-reverse">
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <ul className="grid grid-cols-4 gap-6">
                                {products.product.images.map((image, index) => (
                                    <li key={index} className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50">
                                        <img src={image} alt={products.product.title} className="h-full w-full object-cover object-center" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="aspect-h-1 aspect-w-1 w-full">
                            <ZoomableImage src={products.product.images[0]} alt={products.product.title} />
                        </div>
                    </div>

                    {/* ---------- Product Info ---------- */}
                    <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {products.product.title}
                        </h1>
                        <p className="text-lg text-gray-600">by {products.product.seller?.sellerName}</p>
                        
                        {/* Price */}
                        <div className="mt-4">
                            <p className="text-3xl font-semibold text-gray-900">₹{products.product.sellingPrice}</p>
                            <div className="flex items-center space-x-2">
                                <p className="text-lg text-gray-500 line-through">₹{products.product.mrpPrice}</p>
                                <p className="text-lg font-semibold text-green-600">{products.product.discountPercent}% off</p>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="mt-6 flex items-center">
                            <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                            <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                {products.product.reviews?.length || 0} reviews
                            </p>
                        </div>

                        {/* Sizes */}
                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                {["S", "M", "L", "XL"].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 
                                            ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-300'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Buttons */}
                        <div className="mt-10 flex items-center">
                            <Button 
                                onClick={handleAddItemToCart} 
                                variant="contained" 
                                sx={{ px: '2rem', py: '1rem', flex: 1, marginRight: '1rem' }}
                            >
                                Add To Cart
                            </Button>
                            <IconButton onClick={handleAddToWishlist} sx={{ color: 'red' }}>
                                {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </div>

                        {/* Description */}
                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-base text-gray-700">{products.product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
