import { getStrapiMedia } from '@/utils';
import { Box } from '@mui/material';
import * as React from 'react';

export interface HeroSectionProps {}

export function HeroSection(props: HeroSectionProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        mt: '75px',
        top: 0,
        left: 0,
        right: 0,
        height: 600,
        zIndex: -10,
        background: `url("${getStrapiMedia('bg_about_00f60d0b52.jpg')}") top/cover no-repeat`,
      }}
    ></Box>
  );
}
