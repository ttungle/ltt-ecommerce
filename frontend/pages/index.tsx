import { Seo } from '@/components/common/seo';
import { ShipmentBanner } from '@/components/common/shipment-banner';
import {
  Article,
  BackgroundVideo,
  HomeBestSelling,
  HomeCategory,
  HomeSlider,
  Inspired,
} from '@/components/home';
import MainLayout from '@/components/layout/main';
import { HomeData, NextPageWithLayout } from '@/models';
import { fetchAPI } from '@/utils';
import { GetStaticProps } from 'next';

const Home: NextPageWithLayout = ({ home }: any) => {
  const {
    seo,
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
    <>
      {seo && <Seo metadata={seo} />}
      <HomeSlider sliderData={sliders} />
      <HomeCategory homeCategoryData={homeCategory} />
      <HomeBestSelling HomeBestSellingData={homeBestSelling} />
      <BackgroundVideo backgroundVideoData={backgroundVideo} />
      <HomeBestSelling HomeBestSellingData={homeHotList} />
      <Article aboutSummaryData={aboutSummary} />
      <Inspired inspiredData={inspired} />
      <ShipmentBanner shipmentData={shipment} />
    </>
  );
};

Home.Layout = MainLayout;

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const homeData = await fetchAPI(`/home`, {
    populate: [
      'seo.metaImage',
      'seo.metaSocial.image',
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
  const home: HomeData = homeData.data.attributes;

  if (!home) {
    return {
      notFound: true,
    };
  }

  return {
    props: { home },
  };
};
