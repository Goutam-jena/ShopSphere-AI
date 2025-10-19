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

// import React from 'react';
// import { Product } from '../../../../types/productTypes';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
// import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
// import { isWishlisted } from '../../../../util/isWishlisted';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { IconButton } from '@mui/material';

// const ProductCard = ({ product }: { product: Product }) => {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();
//     const { wishlist } = useAppSelector(store => store);

//     const handleNavigate = () => {
//         navigate(`/product-details/${product.category?.categoryId}/${product.title}/${product._id}`);
//     };

//     const handleAddToWishlist = (e: React.MouseEvent) => {
//         e.stopPropagation(); // Prevent navigation when clicking the icon
//         if (product._id) {
//             dispatch(addProductToWishlist({ productId: product._id }));
//         }
//     };

//     const wishlisted = wishlist.wishlist ? isWishlisted(wishlist.wishlist, product) : false;

//     return (
//         <div onClick={handleNavigate} className='group cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border transition-transform transform hover:-translate-y-2'>
//             <div className='relative h-[13rem] w-full'>
//                 <img className='object-cover object-top w-full h-full' src={product.images[0]} alt={product.title} />
//                 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <IconButton onClick={handleAddToWishlist} size="small" sx={{ color: 'red' }}>
//                         {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//                     </IconButton>
//                 </div>
//             </div>
//             <div className='p-4 w-full'>
//                 <h3 className='text-lg font-medium text-gray-900 truncate'>{product.title}</h3>
//                 <p className='mt-2 text-sm text-gray-500'>{product.seller?.sellerName || 'ShopSphere Seller'}</p>
//                 <div className='mt-2 flex items-center space-x-2'>
//                     <p className='font-semibold text-lg'>₹{product.sellingPrice}</p>
//                     <p className='line-through opacity-50'>₹{product.mrpPrice}</p>
//                     <p className='text-green-600 font-semibold'>{product.discountPercent}% off</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;




import React, { useState, useEffect, MouseEvent } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { teal } from "@mui/material/colors";
import { Box, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/productTypes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Redux Toolkit/Store";
import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
import { isWishlisted } from "../../../../util/isWishlisted";
import ChatBot from "../../ChatBot/ChatBot";

interface ProductCardProps {
  item: Product;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  borderRadius: ".5rem",
  boxShadow: 24,
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { wishlist } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showChatBot, setShowChatBot] = useState(false);

  const handleAddWishlist = (event: MouseEvent) => {
    event.stopPropagation();
    setIsFavorite((prev) => !prev);
    if (item._id) dispatch(addProductToWishlist({ productId: item._id }));
  };

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000); // Change image every 1 second
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);

  const handleShowChatBot = (event: MouseEvent) => {
    event.stopPropagation();
    setShowChatBot(true);
  };
  const handleCloseChatBot = (e: MouseEvent) => {
    e.stopPropagation();
    setShowChatBot(false);
  };

  return (
    <>
      <div
        onClick={() =>
          navigate(
            `/product-details/${item.category?.categoryId}/${item.title}/${item._id}`
          )
        }
        className="group px-4 relative"
      >
        {/* Card container */}
        <div
          className="relative w-[250px] sm:w-full md:w-full lg:w-full h-[350px] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.images.map((image: any, index: number) => (
            <img
              key={index}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out cursor-pointer object-cover object-top"
              src={image}
              alt={`product-${index}`}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))}

          {/* Indicator dots + buttons */}
          {isHovered && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2">
              <div className="flex gap-4">
                {item.images.map((_, index: number) => (
                  <button
                    key={index}
                    className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
                      index === currentImage ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                {wishlist.wishlist && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ zIndex: 10 }}
                    className="z-50"
                    onClick={handleAddWishlist}
                  >
                    {isWishlisted(wishlist.wishlist, item) ? (
                      <FavoriteIcon sx={{ color: teal[500] }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "gray" }} />
                    )}
                  </Button>
                )}
                <Button
                  onClick={handleShowChatBot}
                  color="secondary"
                  variant="contained"
                >
                  <ModeCommentIcon sx={{ color: teal[500] }} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="p-4 transition-transform duration-300 group-hover:translate-y-1 group-hover:shadow-md rounded-md pt-3 space-y-1">
          <div className="space-y">
            <h1 className="font-semibold text-lg">
              {item.seller?.businessDetails?.businessName}
            </h1>
            <p>{item.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-800">
              ₹{item.sellingPrice}
            </span>
            <span className="text-gray-400 line-through decoration-1">
              ₹{item.mrpPrice}
            </span>
            <span className="text-[#00927c] font-semibold">
              {item.discountPercent}% off
            </span>
          </div>
        </div>
      </div>

      {/* ChatBot Modal */}
      {showChatBot && (
        <section className="absolute left-16 top-0">
          <Modal
            open={true}
            onClose={handleCloseChatBot}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ChatBot
                handleClose={handleCloseChatBot}
                productId={item._id}
              />
            </Box>
          </Modal>
        </section>
      )}
    </>
  );
};

export default ProductCard;




