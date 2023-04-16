import { CategoryListData } from '@/models';
import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { IoDiamondOutline } from 'react-icons/io5';

export interface TextSectionProps {
  textContent: CategoryListData;
}

export function TextSection({ textContent }: TextSectionProps) {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      my={9}
      maxWidth='900px'
      mx='auto'
    >
      <IoDiamondOutline style={{ fontSize: '3.125rem' }} />
      <Typography
        fontFamily='Cormorant Garamond'
        fontWeight={600}
        fontSize={{ lg: '3rem', xs: '2rem' }}
        mt={1}
        mb={2}
      >
        {textContent?.title}
      </Typography>
      <Typography textAlign='center' color='text.secondary'>
        {textContent?.description}
      </Typography>
    </Stack>
  );
}
