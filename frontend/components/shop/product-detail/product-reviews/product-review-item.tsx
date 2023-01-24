import { ProductReviewItemData } from '@/models';
import { Avatar, Box, Divider, Rating, Stack, Typography } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';

export interface IProductReviewItemProps {
  reviewData: Array<ProductReviewItemData>;
}

export function ProductReviewItem({ reviewData }: IProductReviewItemProps) {
  return (
    <>
      {reviewData.map((review) => (
        <Box key={review.id} my={2}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' justifyContent='flex-start' alignItems='center'>
              <Avatar alt={review?.attributes?.reviewer?.data?.attributes?.username ?? ''} />
              <Typography fontSize='0.75rem' fontWeight={600} ml={1.5}>
                {review?.attributes?.reviewer?.data?.attributes?.username ?? ''}
              </Typography>
            </Stack>
            <Typography color='grey.600'>
              {dayjs(review?.attributes?.updatedAt).format('MMM DD, YYYY')}
            </Typography>
          </Stack>

          <Rating
            name='read-only'
            value={review?.attributes?.rating ?? 0}
            size='medium'
            readOnly
            sx={{ my: 1.5, color: 'common.black' }}
          />

          <Typography fontSize='0.75rem' fontWeight={600}>
            {review?.attributes?.title ?? ''}
          </Typography>

          <Typography my={1.5}>{review?.attributes?.reviewContent ?? ''}</Typography>

          <Typography component='span' fontWeight={600}>
            Bottom Line:
          </Typography>
          <Typography component='span' ml={1.5}>
            {review?.attributes?.bottomLine ?? ''}
          </Typography>

          <Divider sx={{ pt: 2 }} />
        </Box>
      ))}
    </>
  );
}
