import { BlogData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export interface HomeBlogProps {
  blogData: BlogData;
}

export function HomeBlog({ blogData }: HomeBlogProps) {
  const { title, publishedAt, thumbnail, blogCategory, path } = blogData.attributes;
  const date = new Date(publishedAt);
  const publishedMonth = date.toLocaleString('default', { month: 'short' });
  const publishedDate = date.toLocaleString('default', { day: 'numeric' });
  return (
    <Box>
      <Link href={`blog/${path}` ?? '#'}>
        <Box component='a'>
          <Box
            sx={{
              position: 'relative',
              cursor: 'pointer',
              '& img': { transition: 'transform 0.5s ease' },
              '&:hover img': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Image
              src={getStrapiMedia(thumbnail?.data?.attributes?.url) ?? ''}
              width={450}
              height={300}
              alt='blog-thumbnail'
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '3%',
                left: '3%',
                width: '50px',
                height: '50px',
                bgcolor: 'common.white',
                borderRadius: '50%',
              }}
            >
              <Typography fontSize='0.875rem' fontWeight={500}>
                {publishedDate}
              </Typography>
              <Divider sx={{ width: '50%' }} />
              <Typography fontSize='0.75rem' fontWeight={500} textTransform='uppercase'>
                {publishedMonth}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Link>

      <Link
        href={
          blogCategory?.data?.attributes?.path
            ? `/category/${blogCategory?.data?.attributes?.path}`
            : '#'
        }
      >
        <Box
          component='a'
          fontSize='0.75rem'
          textAlign='left'
          sx={{
            display: 'block',
            mt: 3,
            textTransform: 'uppercase',
            letterSpacing: '0.14rem',
            cursor: 'pointer',
            color: 'grey.600',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {blogCategory?.data?.attributes?.name}
        </Box>
      </Link>

      <Link href={`blog/${path}` ?? '#'}>
        <Box component='a'>
          <Typography
            fontSize='1.625rem'
            fontWeight={600}
            fontFamily='Cormorant Garamond'
            textAlign='left'
            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
          >
            {title}
          </Typography>

          <Typography
            color='grey.600'
            fontSize='0.875rem'
            textAlign='left'
            sx={{
              mt: 1,
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Read more
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}
