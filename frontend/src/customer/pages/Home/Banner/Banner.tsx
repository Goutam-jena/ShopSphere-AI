

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { bannerData } from '../../../../data/banner';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,          // Faster transition (was 600)
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // Flipkart-style (2s per slide)
        arrows: false,
        fade: true           // Smooth fade effect
    };

    return (
        <div className='w-full px-4 lg:px-20 banner-slider'>
            <Slider {...settings}>
                {bannerData.map((item, index) => (
                    <div key={index} onClick={() => navigate(item.path)}>
                        <div className="w-full overflow-hidden aspect-[211/35]">
                            <img 
                                src={item.image} 
                                alt={`Banner ${index + 1}`} 
                                className='w-full h-full object-cover cursor-pointer'
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Banner;




