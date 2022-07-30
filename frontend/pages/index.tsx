import { HomeSlider } from '@/components/home';
import MainLayout from '@/components/layout/main';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <HomeSlider />
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
