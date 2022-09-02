import { InspiredData } from '@/models';
import { Box, Container, Typography } from '@mui/material';
import { BlogSlider } from './blog-slider';

export interface InspiredProps {
  inspiredData: InspiredData;
}

export function Inspired({ inspiredData }: InspiredProps) {
  const { description, title, blogs } = inspiredData;
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
        <Typography fontSize='2.5rem' fontFamily='Cormorant Garamond' fontWeight='600'>
          {title}
        </Typography>
      </Box>
      <Box>
        <BlogSlider blogData={blogs?.data} itemNumber={3} />
      </Box>
    </Container>
  );
}
