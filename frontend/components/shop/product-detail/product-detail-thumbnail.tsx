import { MediaContentData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface ProductDetailThumbnailProps {
  productThumbnails: Array<MediaContentData>;
}

export function ProductDetailThumbnail({ productThumbnails }: ProductDetailThumbnailProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <Box>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={false}
        pagination={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className='mySwiper2'
      >
        {productThumbnails.map((thumbnail) => (
          <SwiperSlide key={thumbnail.id}>
            <Image
              src={getStrapiMedia(thumbnail?.attributes?.url) ?? ''}
              width={thumbnail.attributes.width ?? 696}
              height={thumbnail.attributes.height ?? 696}
              alt='product-image'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {productThumbnails.map((thumbnail) => (
          <SwiperSlide key={thumbnail.id}>
            <Image
              src={getStrapiMedia(thumbnail?.attributes?.url) ?? ''}
              width={thumbnail.attributes.width ?? 696}
              height={thumbnail.attributes.height ?? 696}
              alt='product-image'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
