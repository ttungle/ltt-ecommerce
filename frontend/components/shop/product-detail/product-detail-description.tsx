import { convertMarkdownImageSrc } from '@/utils';
import { Box, Divider, Typography } from '@mui/material';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';

export interface ProductDetailDescriptionProps {
  data: string;
}

export function ProductDetailDescription({ data }: ProductDetailDescriptionProps) {
  return (
    <>
      <Typography
        id='product-details'
        component='h5'
        fontSize='1.125rem'
        fontWeight={600}
        mt={22}
        mb={2}
      >
        Product Details
      </Typography>

      <Divider />

      <Box sx={{ fontSize: '0.875rem', lineHeight: 1.8, fontWeight: 300, pt: 3 }}>
        <ReactMarkdown>{convertMarkdownImageSrc(data)}</ReactMarkdown>
      </Box>
    </>
  );
}
