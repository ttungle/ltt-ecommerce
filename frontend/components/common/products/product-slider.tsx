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
  identifier?: string;
}

export function ProductSlider({ productsData, itemNumber, identifier = '' }: ProductSliderProps) {
  const nextClassName = `swiper-button-next-${identifier}`;
  const prevClassName = `swiper-button-prev-${identifier}`;
  return (
    <Box position='relative' sx={{ px: { lg: 7.5, xs: 5 }, mx: { lg: -7.5, xs: 0 } }}>
      <Box
        className={`swiper-button-prev ${prevClassName}`}
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
        slidesPerGroup={itemNumber}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={{
          nextEl: `.${nextClassName}`,
          prevEl: `.${prevClassName}`,
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
        className={`swiper-button-next ${nextClassName}`}
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
