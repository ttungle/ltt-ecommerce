import { Box, Container } from '@mui/material';
import * as React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CommonReviewItem } from './common-revie-item';

export interface CommonReviewSliderProps {
  commonReviewData: Array<any>;
}

export function CommonReviewSlider({ commonReviewData }: CommonReviewSliderProps) {
  return (
    <Container>
      <Box position='relative' sx={{ px: 7.5, mx: -7.5, my: 9 }}>
        <Box
          className='swiper-button-prev'
          sx={{
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
          slidesPerView={3}
          spaceBetween={16}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Pagination, Navigation]}
          className='product-slider'
        >
          {commonReviewData.map((review) => (
            <SwiperSlide key={review?.id as React.Key}>
              <CommonReviewItem reviewData={review?.attributes} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Box
          className='swiper-button-next'
          sx={{
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
    </Container>
  );
}
