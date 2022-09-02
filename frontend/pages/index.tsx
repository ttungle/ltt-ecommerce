import {
  HomeBestSelling,
  HomeCategory,
  HomeSlider,
  BackgroundVideo,
  Article,
  Inspired,
  HomeShipment,
} from '@/components/home';
import MainLayout from '@/components/layout/main';
import { NextPageWithLayout } from '@/models';
import { fetchAPI } from '@/utils';
import { Box } from '@mui/material';
import { GetStaticProps } from 'next';

const Home: NextPageWithLayout = ({ home }: any) => {
  const {
    metadata,
    sliders,
    homeCategory,
    homeBestSelling,
    backgroundVideo,
    homeHotList,
    aboutSummary,
    inspired,
    shipment,
  } = home;
  return (
    <Box>
      <HomeSlider sliderData={sliders} />
      <HomeCategory homeCategoryData={homeCategory} />
      <HomeBestSelling HomeBestSellingData={homeBestSelling} />
      <BackgroundVideo backgroundVideoData={backgroundVideo} />
      <HomeBestSelling HomeBestSellingData={homeHotList} />
      <Article aboutSummaryData={aboutSummary} />
      <Inspired inspiredData={inspired} />
      <HomeShipment shipmentData={shipment} />
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const homeData = await fetchAPI(`/home`, {
    populate: [
      'metadata.shareImage',
      'sliders.image',
      'homeCategory.homeCategoryImage.image',
      'homeCategory.backgroundImage',
      'homeBestSelling.products',
      'homeBestSelling.products.thumbnails',
      'backgroundVideo',
      'homeHotList.products.thumbnails',
      'aboutSummary.thumbnail',
      'inspired.blogs.thumbnail',
      'inspired.blogs.blogCategory',
      'shipment.backgroundImage',
      'shipment.shipmentItem.icon',
    ],
  });
  const home = homeData.data.attributes;

  if (!home) {
    return {
      notFound: true,
    };
  }

  return {
    props: { home },
  };
};
