import { InspiredData } from '@/models';
import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BlogSlider } from './blog-slider';

export interface InspiredProps {
  inspiredData: InspiredData;
}

export function Inspired({ inspiredData }: InspiredProps) {
  const { description, title, blogs } = inspiredData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Container maxWidth='xl' sx={{ pb: 7 }}>
      <Box textAlign='center' sx={{ py: '64px' }}>
        <Typography
          fontSize='0.75rem'
          textTransform='uppercase'
          fontWeight={500}
          letterSpacing='0.2rem'
        >
          {description}
        </Typography>
        <Typography
          fontSize={{ lg: '2.5rem', xs: '2rem' }}
          fontFamily='Cormorant Garamond'
          fontWeight='600'
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <BlogSlider blogData={blogs?.data} itemNumber={isMobile ? 1 : 3} />
      </Box>
    </Container>
  );
}
