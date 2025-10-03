// import React from 'react';
// import { Product } from '../../../../types/productTypes';
// import { useNavigate } from 'react-router-dom';

// const ProductCard = ({ product }: { product: Product }) => {
//     const navigate = useNavigate();
//     const handleNavigate = () => {
//         navigate(`/product-details/${product.category?.categoryId}/${product.title}/${product._id}`)
//     }
//     return (
//         <div onClick={handleNavigate} className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border'>
//             <div className='h-[13rem] w-[10rem]'>
//                 <img className='object-cover object-top w-full h-full' src={product.images[0]} alt="" />
//             </div>
//             <div className='p-4'>
//                 <h3 className='text-lg font-medium text-gray-900'>{product.title}</h3>
//                 <p className='mt-2 text-sm text-gray-500'>{product.description.substring(0, 45)}...</p>
//                 <div className='mt-5 flex items-center space-x-2'>
//                     <p className='font-semibold'>₹{product.sellingPrice}</p>
//                     <p className='line-through opacity-50'>₹{product.mrpPrice}</p>
//                     <p className='text-green-600 font-semibold'>{product.discountPercent}% off</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductCard;
















import React from 'react';
import { Product } from '../../../../types/productTypes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
import { isWishlisted } from '../../../../util/isWishlisted';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { wishlist } = useAppSelector(store => store);

    const handleNavigate = () => {
        navigate(`/product-details/${product.category?.categoryId}/${product.title}/${product._id}`);
    };

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking the icon
        if (product._id) {
            dispatch(addProductToWishlist({ productId: product._id }));
        }
    };

    const wishlisted = wishlist.wishlist ? isWishlisted(wishlist.wishlist, product) : false;

    return (
        <div onClick={handleNavigate} className='group cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border transition-transform transform hover:-translate-y-2'>
            <div className='relative h-[13rem] w-full'>
                <img className='object-cover object-top w-full h-full' src={product.images[0]} alt={product.title} />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconButton onClick={handleAddToWishlist} size="small" sx={{ color: 'red' }}>
                        {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
            </div>
            <div className='p-4 w-full'>
                <h3 className='text-lg font-medium text-gray-900 truncate'>{product.title}</h3>
                <p className='mt-2 text-sm text-gray-500'>{product.seller?.sellerName || 'ShopSphere Seller'}</p>
                <div className='mt-2 flex items-center space-x-2'>
                    <p className='font-semibold text-lg'>₹{product.sellingPrice}</p>
                    <p className='line-through opacity-50'>₹{product.mrpPrice}</p>
                    <p className='text-green-600 font-semibold'>{product.discountPercent}% off</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;





