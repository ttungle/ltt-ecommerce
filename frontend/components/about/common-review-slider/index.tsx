import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CommonReviewItem } from './common-review-item';

export interface CommonReviewSliderProps {
  commonReviewData: Array<any>;
}

export function CommonReviewSlider({ commonReviewData }: CommonReviewSliderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Container>
      <Box position='relative' sx={{ px: { lg: 7.5, xs: 6 }, mx: { lg: -7.5, xs: -1.5 }, my: 9 }}>
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
          slidesPerView={isMobile ? 1 : 3}
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
