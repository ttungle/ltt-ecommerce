import { getStrapiMedia } from '@/utils';
import { Avatar, Rating, Stack, Typography } from '@mui/material';

export interface CommonReviewItemProps {
  reviewData: any;
}

export function CommonReviewItem({ reviewData }: CommonReviewItemProps) {
  return (
    <Stack direction='column' alignItems='center' maxWidth='450px'>
      <Rating name='read-only' value={reviewData?.rating} readOnly size='small' sx={{ mb: 2 }} />
      <Typography mb={2} fontFamily='Cormorant Garamond' fontSize='1.625rem' fontWeight={600}>
        {reviewData?.title}
      </Typography>
      <Typography
        mb={2}
        textAlign='center'
        color='text.secondary'
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          lineClamp: 2,
        }}
      >
        {reviewData?.description}
      </Typography>
      <Avatar
        alt='User Avatar'
        src={getStrapiMedia(reviewData?.avatar?.data?.attributes?.url) ?? ''}
        sx={{ mb: 2, width: 83, height: 83 }}
      />
      <Typography textTransform='uppercase' letterSpacing='0.16rem'>
        {reviewData?.username}
      </Typography>
    </Stack>
  );
}
