import { HEADER_HEIGHT } from '@/constant';
import { Box } from '@mui/material';
import * as React from 'react';

export interface BackgroundSectionProps {
  backgroundImageUrl: string;
}

export function BackgroundSection({ backgroundImageUrl }: BackgroundSectionProps) {
  return (
    <Box
      pt={HEADER_HEIGHT}
      sx={{
        height: { lg: 720, xs: 360 },
        position: { lg: 'fixed', xs: 'absolute' },
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Box
        sx={{
          height: 'inherit',
          background: `url("${backgroundImageUrl}") top center/cover no-repeat`,
        }}
      />
    </Box>
  );
}
