

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { searchProduct } from '../../../Redux Toolkit/Customer/ProductSlice';
import ProductCard from '../Products/ProductCard/ProductCard';

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = useAppSelector(store => store);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search-products?query=${searchQuery}`);
      dispatch(searchProduct(searchQuery));
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('query');

    if (queryParam) {
      setSearchQuery(queryParam);
      dispatch(searchProduct(queryParam));
    }
  }, [location.search, dispatch]);

  return (
    <div className='min-h-screen px-5 md:px-20'>
      <div className="py-10 text-center">
        <h1 className="text-3xl font-bold text-center mb-8">Search Products Here</h1>
        
        {/* Search box hidden */}
        <div className="hidden">
          <div className="relative w-full max-w-lg mx-auto">
            <input
              className="w-full bg-white p-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-200 ease-in-out"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <SearchIcon className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <section>
        {products.searchProduct?.length > 0 ? (
          <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
            {products.searchProduct.map((item: any) => (
              <div key={item._id}>
                <ProductCard item={item} />
              </div>
            ))}
          </section>
        ) : (
          <div className='h-[50vh] flex flex-col justify-center items-center'>
            <h1 className='font-bold text-2xl text-gray-500'>
              {location.search.includes('query') ? 'No products found' : 'Search for your favorite products'}
            </h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchProducts;
