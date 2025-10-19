

import React from "react";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
import { useNavigate } from "react-router-dom";

const Grid = () => {
    const { homePage } = useAppSelector(store => store);
    const navigate = useNavigate();

    const collections = homePage.homePageData?.grid;

    // This layout is designed for exactly 6 items from your admin panel.
    if (!collections || collections.length < 6) {
        return null;
    }

    return (
        <div className="lg:px-20 py-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Festive Collection</h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">Explore curated selections for every occasion.</p>
            </div>

            <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
                {/* --- Item 1 --- */}
                <div 
                    onClick={() => navigate(`/products/${collections[0].categoryId}`)}
                    className="col-span-3 row-span-12 rounded-md overflow-hidden cursor-pointer group"
                >
                    <img
                        className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={collections[0].image}
                        alt={collections[0].name}
                    />
                </div>

                {/* --- Item 2 --- */}
                <div 
                    onClick={() => navigate(`/products/${collections[1].categoryId}`)}
                    className="col-span-2 row-span-6 rounded-md overflow-hidden cursor-pointer group"
                >
                    <img
                        className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={collections[1].image}
                        alt={collections[1].name}
                    />
                </div>

                {/* --- Item 3 --- */}
                <div 
                    onClick={() => navigate(`/products/${collections[2].categoryId}`)}
                    className="col-span-4 row-span-6 rounded-md overflow-hidden cursor-pointer group"
                >
                    <img
                        className="w-full h-full object-cover object-top rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={collections[2].image}
                        alt={collections[2].name}
                    />
                </div>

                {/* --- Item 4 --- */}
                <div 
                    onClick={() => navigate(`/products/${collections[3].categoryId}`)}
                    className="col-span-3 row-span-12 rounded-md overflow-hidden cursor-pointer group"
                >
                    <img
                        className="w-full h-full object-cover object-top rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={collections[3].image}
                        alt={collections[3].name}
                    />
                </div>

                {/* --- Item 5 --- */}
                <div 
                    onClick={() => navigate(`/products/${collections[4].categoryId}`)}
                    className="col-span-4 row-span-6 rounded-md overflow-hidden cursor-pointer group"
                >
                    <img
                        className="w-full h-full object-cover object-top rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={collections[4].image}
                        alt={collections[4].name}
                    />
                </div>
                
                {/* --- Item 6 --- */}
                <div 
                    onClick={() => navigate(`/products/${collections[5].categoryId}`)}
                    className="col-span-2 row-span-6 rounded-md overflow-hidden cursor-pointer group"
                >
                    <img
                        className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={collections[5].image}
                        alt={collections[5].name}
                    />
                </div>
            </div>
        </div>
    );
};

export default Grid;