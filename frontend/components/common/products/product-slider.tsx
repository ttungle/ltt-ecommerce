import { ProductData } from '@/models';
import { Box } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from './product';

export interface ProductSliderProps {
  itemNumber: number;
  productsData: Array<ProductData>;
}

export function ProductSlider({ productsData, itemNumber }: ProductSliderProps) {
  return (
    <Box position='relative' sx={{ px: 7.5, mx: -7.5 }}>
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
        slidesPerView={itemNumber}
        spaceBetween={16}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Pagination, Navigation]}
        className='product-slider'
      >
        {productsData &&
          productsData.map((product) => (
            <SwiperSlide key={product?.id as React.Key}>
              <Link href={`shop/product/${product?.attributes?.path}?pid=${product.id}`}>
                <Box component='a' sx={{ display: 'block', width: '100%', height: '100%' }}>
                  <Product productData={product} />
                </Box>
              </Link>
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
  );
}
