import { AboutSummaryData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

export interface ArticleProps {
  aboutSummaryData: AboutSummaryData;
}

export function Article({ aboutSummaryData }: ArticleProps) {
  const { title, description, path, thumbnail, buttonText } = aboutSummaryData;
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'grey.200',
        display: 'flex',
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={{ lg: 12.5, xs: 6 }} py={{ lg: 12, xs: 6 }}>
          <Grid item md={6}>
            <Typography
              fontWeight={600}
              fontSize={{ lg: '3.125rem', xs: '2rem' }}
              fontFamily='Cormorant Garamond'
              lineHeight={{ lg: '55px', xs: 1.5 }}
              letterSpacing='0.03rem'
            >
              {title}
            </Typography>
            <Box color='grey.600' fontSize='0.875rem' textAlign='justify' my={{ lg: 5.25, xs: 0 }}>
              <ReactMarkdown>{description}</ReactMarkdown>
            </Box>
            <Button
              variant='outlined'
              onClick={handleButtonClick}
              sx={{
                px: 3,
                py: 1,
                borderWidth: '1px',
                fontWeight: 400,
                fontSize: '0.688rem',
                letterSpacing: '0.16rem',
                color: 'text.primary',
                borderColor: 'text.primary',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'common.white',
                },
              }}
            >
              {buttonText}
            </Button>
          </Grid>
          {thumbnail?.data?.attributes?.url && (
            <Grid item lg={6} xs={12}>
              <Image
                src={getStrapiMedia(thumbnail?.data?.attributes?.url) ?? ''}
                width={690}
                height={500}
                layout='responsive'
                alt='about-image'
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
