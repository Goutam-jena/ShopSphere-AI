


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchProductById } from '../../../Redux Toolkit/Customer/ProductSlice';
import { createReview } from '../../../Redux Toolkit/Customer/ReviewSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Rating,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from '../../../util/uploadToCloudnary';

const WriteReview = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, auth } = useAppSelector((store) => store);
  const { productId } = useParams<{ productId: string }>();
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  const validationSchema = Yup.object({
    reviewText: Yup.string().min(10, 'Review must be at least 10 characters').required('Review text is required'),
    rating: Yup.number().min(1, 'Please select a rating').required('Rating is required'),
  });

  const formik = useFormik({
    initialValues: {
      reviewText: '',
      rating: 0,
      productImages: [] as string[],
    },
    validationSchema,
    onSubmit: (values) => {
      if (productId && auth.jwt) {
        dispatch(createReview({
          productId,
          review: values, // 'values' now includes productImages
          jwt: auth.jwt,
          navigate
        }));
      }
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadingImage(true);
      const file = event.target.files[0];
      const data = await uploadToCloudinary(file);
      if (data && data.url) {
        formik.setFieldValue("productImages", [...formik.values.productImages, data.url]);
      }
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.productImages];
    updatedImages.splice(index, 1);
    formik.setFieldValue("productImages", updatedImages);
  };

  return (
    <div className='p-5 lg:p-20 grid grid-cols-1 lg:grid-cols-3 gap-10'>
      <div className='lg:col-span-1 space-y-5'>
        {products.product && (
          <Paper elevation={3} className="p-5">
            <img className='w-full h-auto object-cover rounded-md' src={products.product.images[0]} alt={products.product.title} />
            <div>
              <p className='font-bold text-xl mt-4'>{products.product.seller?.businessDetails.businessName}</p>
              <p className='text-lg text-gray-600'>{products.product.title}</p>
            </div>
            <div className='flex items-center gap-3 mt-2 text-lg'>
              <span className='font-semibold text-gray-800'>₹{products.product.sellingPrice}</span>
              <span className='text-gray-400 line-through'>₹{products.product.mrpPrice}</span>
              <span className='text-primary font-semibold'>{products.product.discountPercent}% off</span>
            </div>
          </Paper>
        )}
      </div>

      <section className="lg:col-span-2">
        <Paper elevation={3} className="p-8">
          <Typography variant="h4" component="h1" gutterBottom>Write Your Review</Typography>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <Typography component="legend">Your Rating</Typography>
              <Rating
                name="rating"
                value={Number(formik.values.rating)}
                onChange={(event, newValue) => formik.setFieldValue('rating', newValue)}
              />
              {formik.touched.rating && formik.errors.rating && (<Typography color="error" variant="caption">{formik.errors.rating}</Typography>)}
            </div>
            <TextField
              fullWidth multiline rows={5} id="reviewText" name="reviewText" label="Your Review"
              value={formik.values.reviewText} onChange={formik.handleChange}
              error={formik.touched.reviewText && Boolean(formik.errors.reviewText)}
              helperText={formik.touched.reviewText && formik.errors.reviewText}
              margin="normal"
            />
            
            {/* --- Image Uploader UI --- */}
            <div className="mt-4">
              <Typography component="legend">Add Photos</Typography>
              <div className="flex flex-wrap gap-4 items-center mt-2">
                <input type="file" accept="image/*" id="imageUploadInput" style={{ display: "none" }} onChange={handleImageChange} />
                <label className="relative" htmlFor="imageUploadInput">
                  <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border-2 border-dashed rounded-md">
                    <AddPhotoAlternateIcon className="text-gray-500" />
                  </span>
                  {uploadingImage && (<div className="absolute inset-0 flex justify-center items-center"><CircularProgress size={24}/></div>)}
                </label>
                {formik.values.productImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img className="w-24 h-24 object-cover rounded-md" src={image} alt={`review-img-${index}`} />
                    <IconButton onClick={() => handleRemoveImage(index)} size="small" sx={{ position: "absolute", top: -10, right: -10, bgcolor: 'white', '&:hover': { bgcolor: 'lightgray' } }}>
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>

            <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 4, py: 1.5 }}>Submit Review</Button>
          </form>
        </Paper>
      </section>
    </div>
  );
};

export default WriteReview;