import { BlogData } from '@/models';
import { Box } from '@mui/material';
import * as React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HomeBlog } from './blog';

export interface BlogSliderProps {
  blogData: Array<BlogData>;
  itemNumber: number;
}

export function BlogSlider({ blogData, itemNumber }: BlogSliderProps) {
  return (
    <Box position='relative' sx={{ px: { lg: 7.5, xs: 5 }, mx: { lg: -7.5, xs: 0 } }}>
      <Box
        className='swiper-button-prev'
        sx={{
          top: '38% !important',
          transition: 'opacity 0.2s ease',
          '&::after': {
            color: 'common.black',
            opacity: 0.3,
          },
          '&:hover::after': {
            color: 'common.black',
            opacity: 1,
          },
        }}
      />

      <Swiper
        slidesPerView={itemNumber}
        spaceBetween={16}
        slidesPerGroup={itemNumber}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Pagination, Navigation]}
        className='product-slider'
      >
        {blogData &&
          blogData.map((blog) => (
            <SwiperSlide key={blog?.id}>
              <HomeBlog blogData={blog} />
            </SwiperSlide>
          ))}
      </Swiper>

      <Box
        className='swiper-button-next'
        sx={{
          top: '38% !important',
          transition: 'opacity 0.2s ease',
          '&::after': {
            color: 'common.black',
            opacity: 0.3,
          },
          '&:hover::after': {
            color: 'common.black',
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}
