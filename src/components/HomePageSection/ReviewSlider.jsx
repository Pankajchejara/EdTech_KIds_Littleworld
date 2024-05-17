import React from 'react'
import { Reviews } from '../../data/Reviews'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRating from './StarRatingList';

const ReviewSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
 
  return (
<div className='flex flex-col gap-y-[50px]'>
<h2 className='text-3xl text-white text-center'>Reviews from Students</h2>


    <div className='slider-container  '>
    <Slider {...settings} className='h-full '>
      {Reviews.map((data) => (
        <div key={data.name} className='   border-red border bg-pure-greys-700 p-4  '>
          <div>
            {/* You can add an image here */}
            <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${data.name}`}
             alt={data.name}
             className="aspect-square w-[58px] rounded-full object-cover"
             />
          </div>
          <p className='text-white'>{data.name}</p>
          <p className='text-white'>{data.comment}</p>
          <div className=" text-yellow-100 ">
      <StarRating star={data.stars} />
    </div>
        </div>
      ))}
    </Slider>
  </div>
  </div>
);
}

export default ReviewSlider
