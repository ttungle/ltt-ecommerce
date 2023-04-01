import { HomeCategoryData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { CategoryImageList } from '../common/category-image-list';

export interface HomeCategoryProps {
  homeCategoryData: HomeCategoryData;
}

export function HomeCategory({ homeCategoryData }: HomeCategoryProps) {
  const router = useRouter();
  const { title, description, backgroundImage, homeCategoryImage } = homeCategoryData;

  return (
    <Box
      sx={{
        backgroundImage: `url(${getStrapiMedia(backgroundImage?.data?.attributes?.url) ?? ''})`,
        pb: 16,
      }}
    >
      <Container maxWidth='xl'>
        <Box textAlign='center' sx={{ py: '64px' }}>
          <Typography
            fontSize='0.75rem'
            textTransform='uppercase'
            fontWeight={500}
            letterSpacing='0.2rem'
          >
            {description}
          </Typography>
          <Typography fontSize='2.5rem' fontFamily='Cormorant Garamond' fontWeight='600'>
            {title}
          </Typography>
        </Box>

        <CategoryImageList
          categoryList={homeCategoryImage}
          layout={2.4}
          spacing={1.5}
          height={376}
        />
      </Container>
    </Box>
  );
}
