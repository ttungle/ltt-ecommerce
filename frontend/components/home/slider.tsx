import { SliderData } from '@/models';
import { getStrapiMedia } from '@/utils';
import EastIcon from '@mui/icons-material/East';
import { Box, keyframes, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { OutLinedButton } from '../common/custom-button';

export interface HomeSliderProps {
  sliderData: Array<SliderData>;
}

const slideBottomKeyframe = keyframes` 0% {
  -webkit-transform: translateY(-75%);
          transform: translateY(-75%);
          opacity: 0.5;
}
100% {
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
          opacity: 1;
}`;

export function HomeSlider({ sliderData }: HomeSliderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const element: any = document.querySelector('.swiper');
    const swiper = element?.swiper;

    swiper.on('slideChangeTransitionStart', function () {
      setShow(false);
    });

    swiper.on('slideChangeTransitionEnd', function () {
      setShow(true);
    });
  }, [show]);

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
        speed={900}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='home-slider'
      >
        {sliderData &&
          sliderData.map((slider) => (
            <SwiperSlide key={slider.id}>
              <Box position='relative' width='100%'>
                <Box
                  component='img'
                  src={getStrapiMedia(slider?.image?.data?.attributes?.url) ?? ''}
                  alt='home-slider'
                  height={781}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(50% - 425px)',
                    width: '850px',
                    p: 8,
                    borderRadius: '2px',
                    visibility: !show ? 'hidden' : 'visibility',
                    animation: show
                      ? `${slideBottomKeyframe} 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
                      : '',
                  }}
                >
                  <Typography
                    component='h2'
                    fontSize='5rem'
                    lineHeight='80px'
                    fontWeight={600}
                    fontFamily='Cormorant Garamond'
                    color='common.white'
                  >
                    {slider?.title}
                  </Typography>
                  {slider?.description && (
                    <Typography
                      fontSize='3.125rem'
                      lineHeight='60px'
                      fontWeight={500}
                      fontFamily='Cormorant Garamond'
                      color='common.white'
                      marginTop='16px'
                      marginBottom='42px'
                    >
                      {slider?.description}
                    </Typography>
                  )}

                  <OutLinedButton
                    icon={<EastIcon sx={{ transform: 'translateY(-8%)' }} />}
                    css={{
                      fontSize: '0.688rem',
                      padding: '16px 54px',
                      letterSpacing: '3px',
                    }}
                  >
                    {slider?.buttonText}
                  </OutLinedButton>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}
