// import React, { useEffect } from 'react';
// import Banner from './Banner/Banner';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import HomeCategory from './HomeCategory/HomeCategory';
// import Deals from './Deals/Deals';
// import Grid from './TopBrands/Grid';
// import { fetchHomePageData } from '../../../Redux Toolkit/Customer/Customer/AsyncThunk';

// const Home = () => {
//   const dispatch = useAppDispatch();
//   const { homePage } = useAppSelector(store => store);

//   useEffect(() => {
//     dispatch(fetchHomePageData());
//   }, [dispatch]);

//   return (
//     <div>
//       <Banner />
//       <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
//         {homePage.homePageData?.deals && <Deals deals={homePage.homePageData.deals} />}
//         {homePage.homePageData?.shopByCategories && <HomeCategory data={homePage.homePageData.shopByCategories} sectionName={"Shop By Category"} />}
//         {homePage.homePageData?.electricCategories && <HomeCategory data={homePage.homePageData.electricCategories} sectionName={"Top Electronics"} />}
//         {homePage.homePageData?.grid && <Grid data={homePage.homePageData.grid} />}
//       </div>
//     </div>
//   );
// };

// export default Home;
































import React from 'react';
import HomeCategory from './HomeCategory/HomeCategory';
import TopBrand from './TopBrands/Grid';
import ElectronicCategory from './Electronic Category/ElectronicCategory';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAppSelector } from '../../../Redux Toolkit/Store';
import Banner from './Banner/Banner';
// --- ADDED --- Import for your new static banner component
import StaticHeroBanner from '../../components/StaticHeroBanner'; 

const Home = () => {
    const { homePage } = useAppSelector(store => store);
    const navigate = useNavigate();

    const becomeSellerClick = () => {
        navigate("/become-seller");
    };

    return (
        <>
            {(!homePage.loading && homePage.homePageData) ? (
                <div className='space-y-10'>

                    {homePage.homePageData.electricCategories && <ElectronicCategory />}
                    <Banner />

                    {/* --- ADDED --- Your new static banner is placed here */}
                    <section className='px-5 lg:px-20'>
                        <StaticHeroBanner />
                    </section>

                    {homePage.homePageData.deals && (
                        <section className='pt-10 px-4 lg:px-20'>
                            <h1 className='text-center text-xl lg:text-3xl font-bold text-gray-800 pb-5 lg:pb-10'>Today's Deals</h1>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                                {homePage.homePageData.deals.map((deal) => (
                                    <div 
                                        key={deal.category.categoryId}
                                        onClick={() => navigate(`/products/${deal.category.categoryId}`)} 
                                        className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="w-full h-40 lg:h-56 flex items-center justify-center overflow-hidden">
                                            <img className='h-full w-full object-cover' src={deal.category.image} alt={deal.category.name} />
                                        </div>
                                        <div className="p-4 text-center w-full">
                                            <p className="text-md font-semibold text-gray-800">{deal.category.name}</p>
                                            <p className="text-lg font-bold text-green-600 mt-1">{deal.discount}% OFF</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {homePage.homePageData.grid && <section><TopBrand /></section>}

                    {homePage.homePageData.shopByCategories && (
                        <section className='flex flex-col justify-center items-center py-10 lg:py-20 px-5 lg:px-20'>
                            <h1 className='text-lg lg:text-4xl font-bold text-[#00927c] pb-5 lg:pb-20'>Start Exploring</h1>
                            <HomeCategory />
                        </section>
                    )}

                    <section className='lg:px-20 relative h-[150px] lg:h-[280px] object-cover'>
                        <img
                            className='w-full h-full rounded-md'
                            src={"https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                            alt=""
                        />
                        <div className='absolute top-1/2 left-4 lg:left-[10rem] transform -translate-y-1/2 font-semibold lg:text-2xl space-y-2'>
                            <h1 className='text-lg lg:text-2xl'>Sell Your Product</h1>
                            <p className='text-sm md:text-lg'>
                                With{" "}
                                <strong className='logo text-xl md:text-3xl pl-2'>ShopSphere</strong>
                            </p>
                            <div className='pt-3 flex justify-start'>
                                <Button
                                    onClick={becomeSellerClick}
                                    startIcon={<StorefrontIcon />}
                                    variant="contained"
                                    size="small"
                                >
                                    Become Seller
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </>
    );
}

export default Home;

