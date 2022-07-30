import { Box } from '@mui/material';
import * as React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface HomeSliderProps {}

export function HomeSlider(props: HomeSliderProps) {
  return (
    <Box>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Box component='img' src='/slider-1.jpg' height={781} width='100%' alt='home-slider' />
        </SwiperSlide>
        <SwiperSlide>
          <Box component='img' src='/slider-1.jpg' height={781} width='100%' alt='home-slider' />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
