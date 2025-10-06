import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import HomeCategory from './HomeCategory/HomeCategory';
import Deals from './Deals/Deals';
import Grid from './TopBrands/Grid';
import { fetchHomePageData } from '../../../Redux Toolkit/Customer/Customer/AsyncThunk';

const Home = () => {
  const dispatch = useAppDispatch();
  const { homePage } = useAppSelector(store => store);

  useEffect(() => {
    dispatch(fetchHomePageData());
  }, [dispatch]);

  return (
    <div>
      <Banner />
      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        {homePage.homePageData?.deals && <Deals deals={homePage.homePageData.deals} />}
        {homePage.homePageData?.shopByCategories && <HomeCategory data={homePage.homePageData.shopByCategories} sectionName={"Shop By Category"} />}
        {homePage.homePageData?.electricCategories && <HomeCategory data={homePage.homePageData.electricCategories} sectionName={"Top Electronics"} />}
        {homePage.homePageData?.grid && <Grid data={homePage.homePageData.grid} />}
      </div>
    </div>
  );
};

export default Home;