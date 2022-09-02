import { HomeCategoryData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box, Button, Container, Grid, keyframes, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface HomeCategoryProps {
  homeCategoryData: HomeCategoryData;
}

const shakeCategoryKeyframe = keyframes` 0%,
100% {
  -webkit-transform: translateX(0);
          transform: translateX(0);
}
10%,
30%,
50%,
70% {
  -webkit-transform: translateX(-6px);
          transform: translateX(-6px);
}
20%,
40%,
60% {
  -webkit-transform: translateX(6px);
          transform: translateX(6px);
}
80% {
  -webkit-transform: translateX(4px);
          transform: translateX(4px);
}
90% {
  -webkit-transform: translateX(-4px);
          transform: translateX(-4px);
}`;

export function HomeCategory({ homeCategoryData }: HomeCategoryProps) {
  const router = useRouter();
  const { title, description, backgroundImage, homeCategoryImage } = homeCategoryData;

  const handleButtonClick = (path: string) => {
    router.push(path);
  };

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

        <Grid container spacing={1}>
          {homeCategoryImage.map((category: any) => (
            <Grid item key={category.id} xs={2.4} sx={{ position: 'relative' }}>
              <Link href={category?.path}>
                <Box
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      animation: `${shakeCategoryKeyframe} 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
                    },
                  }}
                >
                  <Image
                    src={getStrapiMedia(category?.image?.data?.attributes?.url) ?? ''}
                    alt='home-category'
                    width={273}
                    height={376}
                  />
                </Box>
              </Link>
              <Button
                variant='contained'
                onClick={() => handleButtonClick(category?.path)}
                sx={{
                  position: 'absolute',
                  bottom: '-3%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  textTransform: 'capitalize',
                  fontSize: '0.875rem',
                }}
              >
                {category?.buttonText}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
