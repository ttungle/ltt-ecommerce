import { BannerData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';

export interface BannerImageProps {
  banner: BannerData;
}

export function BannerImage({ banner }: BannerImageProps) {
  const { bannerTitle, bannerDescription, textPosition, bannerImage, textColor } = banner;
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  const leftPosition = useMemo(() => {
    switch (textPosition) {
      case 'left':
      case null:
        return isLargeScreen ? '14%' : '8vw';
      case 'center':
        return '50%';
      default:
        return 'none';
    }
  }, [textPosition, isLargeScreen]);

  const rightPosition = useMemo(
    () => (textPosition === 'right' ? (isLargeScreen ? '14%' : '8vw') : 'none'),
    [textPosition, isLargeScreen]
  );

  return (
    <Box
      width='100%'
      height={{ lg: '380px', xs: '280px' }}
      position='relative'
      left={0}
      right={0}
      top={0}
    >
      <Image
        src={getStrapiMedia(bannerImage?.data?.attributes?.url) ?? ''}
        alt={bannerImage?.data?.attributes?.name ?? 'banner-image'}
        layout='fill'
        objectFit='cover'
      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: leftPosition,
          right: rightPosition,
          transform: textPosition === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
          textAlign: textPosition ?? 'left',
          maxWidth: '800px',
        }}
      >
        <Typography
          fontSize={{ lg: '2.625rem', xs: '2rem' }}
          fontWeight={600}
          mb={{ lg: 1, xs: 0, color: textColor }}
          fontFamily='Cormorant Garamond'
        >
          {bannerTitle}
        </Typography>
        <Typography fontSize={{ lg: '1rem', xs: '0.875rem', color: textColor }}>
          {bannerDescription}
        </Typography>
      </Box>
    </Box>
  );
}
