import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { colors } from "../../../data/Filter/color";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createProduct } from "../../../Redux Toolkit/Seller/sellerProductSlice";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLavelTwo";
import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevleTwo";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";
// --- FIX: Import the new category data files ---
import { groceryLevelTwo } from "../../../data/category/level two/groceryLevelTwo";
import { groceryLevelThree } from "../../../data/category/level three/groceryLevelThree";
import { tvAppliancesLevelTwo } from "../../../data/category/level two/tvAppliancesLevelTwo";
import { tvAppliancesLevelThree } from "../../../data/category/level three/tvAppliancesLevelThree";


// --- FIX: Add the new categories to the map ---
const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  home_furniture: furnitureLevelTwo,
  electronics: electronicsLevelTwo,
  grocery: groceryLevelTwo,
  tv_appliances: tvAppliancesLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  home_furniture: furnitureLevelThree,
  electronics: electronicsLevelThree,
  grocery: groceryLevelThree,
  tv_appliances: tvAppliancesLevelThree,
};

const defaultInitialValues = {
  title: '',
  description: '',
  mrpPrice: '',
  sellingPrice: '',
  quantity: '',
  color: '',
  images: [] as string[],
  category: '',
  category2: '',
  category3: '',
  sizes: '',
};

const AddProductForm = ({ onClose }: { onClose?: () => void }) => {
  const [uploadImage, setUploadingImage] = useState(false);
  const dispatch = useAppDispatch();
  const { sellerProduct } = useAppSelector(store => store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: defaultInitialValues,
    onSubmit: (values) => {
      console.log("Submitting form with values:", values);
      dispatch(createProduct({ request: values, jwt: localStorage.getItem('jwt') }));
      if(onClose) onClose();
    },
  });

  const handleImageChange = async (event: any) => {
    setUploadingImage(true);
    const file = event.target.files[0];
    const data = await uploadToCloudinary(file);
    if (data && data.url) {
      formik.setFieldValue("images", [...formik.values.images, data.url]);
    } else {
      console.error("Image upload failed, no URL returned.");
    }
    setUploadingImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (categoryList: any[], parentCategoryId: string) => {
    return categoryList.filter((child: any) => child.parentCategoryId === parentCategoryId);
  };

  useEffect(() => {
    if (sellerProduct.productCreated || sellerProduct.error) {
      setOpenSnackbar(true);
    }
  }, [sellerProduct.productCreated, sellerProduct.error]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" item xs={12}>
            <input type="file" accept="image/*" id="fileInput" style={{ display: "none" }} onChange={handleImageChange}/>
            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div key={index} className="relative">
                  <img className="w-24 h-24 object-cover" src={image} alt={`ProductImage ${index + 1}`} />
                  <IconButton onClick={() => handleRemoveImage(index)} size="small" color="error" sx={{ position: "absolute", top: 0, right: 0, outline: "none" }}>
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}><TextField fullWidth id="title" name="title" label="Title" value={formik.values.title} onChange={formik.handleChange} required /></Grid>
          <Grid item xs={12}><TextField multiline rows={4} fullWidth id="description" name="description" label="Description" value={formik.values.description} onChange={formik.handleChange} required /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth id="mrpPrice" name="mrpPrice" label="MRP Price" type="number" value={formik.values.mrpPrice} onChange={formik.handleChange} required /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth id="sellingPrice" name="sellingPrice" label="Selling Price" type="number" value={formik.values.sellingPrice} onChange={formik.handleChange} required /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth id="quantity" name="quantity" label="Quantity" type="number" value={formik.values.quantity} onChange={formik.handleChange} required /></Grid>
          <Grid item xs={12} sm={6}><FormControl fullWidth required><InputLabel>Color</InputLabel><Select name="color" value={formik.values.color} onChange={formik.handleChange} label="Color">{colors.map((color) => <MenuItem key={color.name} value={color.name}>{color.name}</MenuItem>)}</Select></FormControl></Grid>
          <Grid item xs={12} sm={6}><FormControl fullWidth required><InputLabel>Sizes</InputLabel><Select name="sizes" value={formik.values.sizes} onChange={formik.handleChange} label="Sizes"><MenuItem value="FREE">FREE</MenuItem><MenuItem value="S">S</MenuItem><MenuItem value="M">M</MenuItem><MenuItem value="L">L</MenuItem><MenuItem value="XL">XL</MenuItem></Select></FormControl></Grid>
          <Grid item xs={12} sm={4}><FormControl fullWidth required><InputLabel>Category</InputLabel><Select name="category" value={formik.values.category} onChange={formik.handleChange} label="Category">{mainCategory.map((item) => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}</Select></FormControl></Grid>
          <Grid item xs={12} sm={4}><FormControl fullWidth required><InputLabel>Second Category</InputLabel><Select name="category2" value={formik.values.category2} onChange={formik.handleChange} label="Second Category">{formik.values.category && categoryTwo[formik.values.category]?.map((item) => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}</Select></FormControl></Grid>
          <Grid item xs={12} sm={4}><FormControl fullWidth required><InputLabel>Third Category</InputLabel><Select name="category3" value={formik.values.category3} onChange={formik.handleChange} label="Third Category">{formik.values.category2 && childCategory(categoryThree[formik.values.category], formik.values.category2)?.map((item: any) => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}</Select></FormControl></Grid>
          
          <Grid item xs={12}>
            <Button sx={{ p: "14px" }} color="primary" variant="contained" fullWidth type="submit" disabled={sellerProduct.loading}>
              {sellerProduct.loading ? <CircularProgress size={24} /> : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={sellerProduct.error ? "error" : "success"} variant="filled" sx={{ width: '100%' }}>
          {sellerProduct.error ? sellerProduct.error : "Product created successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProductForm;
