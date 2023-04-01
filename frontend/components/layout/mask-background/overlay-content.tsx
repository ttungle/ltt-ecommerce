import { Box, Divider, Typography } from '@mui/material';
import * as React from 'react';

export interface OverlayContentProps {
  title: string | undefined;
  description: string | undefined;
}

export function OverlayContent({ title, description }: OverlayContentProps) {
  return (
    <>
      <Box
        position='absolute'
        top={{ lg: -360, xs: -180 }}
        left='50%'
        zIndex={10}
        sx={{ transform: 'translate(-50%, -50%)' }}
      >
        {title && (
          <Typography
            fontFamily='Cormorant Garamond'
            fontWeight={700}
            fontSize={{ lg: '5rem', xs: '3rem' }}
            textAlign='center'
            sx={{ color: 'common.white' }}
          >
            {title}
          </Typography>
        )}

        {description && (
          <Typography
            textAlign='center'
            fontSize='0.875rem'
            letterSpacing='0.16rem'
            sx={{ color: 'common.white' }}
          >
            {description}
          </Typography>
        )}

        <Divider sx={{ width: '80px', mt: 2.5, mx: 'auto', borderColor: 'grey.300' }} />
      </Box>
    </>
  );
}
