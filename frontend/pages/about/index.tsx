import { useAppDispatch } from '@/app/hooks';
import { setHeroData } from '@/app/slices/about-slice';
import { CommonReviewSlider } from '@/components/about/common-review-slider';
import { TextAndImage } from '@/components/about/text-and-image';
import { TextSection } from '@/components/about/text-section';
import { CategoryImageList } from '@/components/common/category-image-list';
import { Seo } from '@/components/common/seo';
import { ShipmentBanner } from '@/components/common/shipment-banner';
import MaskBackgroundLayout from '@/components/layout/mask-background';
import { AboutUsPageData } from '@/models';
import { fetchAPI } from '@/utils';
import { Container } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';

export interface AboutUsPageProps {
  aboutUs: AboutUsPageData;
}

export default function AboutUsPage({ aboutUs }: AboutUsPageProps) {
  const { seo, hero, categoryList, contentSection, shipmentInformation, commonReviews } =
    aboutUs?.attributes;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hero) dispatch(setHeroData({ heroData: hero }));
  }, [hero]);

  return (
    <>
      {seo && <Seo metadata={seo} />}
      <Container>
        <CategoryImageList
          categoryList={categoryList?.homeCategoryImage}
          layout={4}
          spacing={9}
          sx={{ mt: 1 }}
        />
        <TextSection textContent={categoryList} />
      </Container>

      {contentSection[0] && <TextAndImage contentData={contentSection[0]} />}
      <ShipmentBanner shipmentData={shipmentInformation} sx={{ mt: 0 }} />
      {contentSection[1] && (
        <TextAndImage contentData={contentSection[1]} direction='row-reverse' />
      )}
      <CommonReviewSlider commonReviewData={commonReviews?.data} />
    </>
  );
}

AboutUsPage.Layout = MaskBackgroundLayout;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const aboutUsPage = await fetchAPI('/about-us', {
    populate: [
      'seo.metaImage',
      'seo.metaSocial.image',
      'hero.heroImage',
      'categoryList.homeCategoryImage.image',
      'contentSection.backgroundImage',
      'contentSection.homeCategoryImage.image',
      'shipmentInformation.shipmentItem.icon',
      'shipmentInformation.backgroundImage',
      'commonReviews.avatar',
    ],
  });

  const aboutUs = aboutUsPage.data;

  if (!aboutUs) {
    return {
      notFound: true,
    };
  }

  return { props: { aboutUs } };
};
