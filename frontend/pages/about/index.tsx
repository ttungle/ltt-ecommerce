import { useAppDispatch } from '@/app/hooks';
import { setHeroData } from '@/app/slices/about-slice';
import { TextSection } from '@/components/about/text-section';
import { CategoryImageList } from '@/components/common/category-image-list';
import MaskBackgroundLayout from '@/components/layout/mask-background';
import { fetchAPI } from '@/utils';
import { Box, Container } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';

export interface AboutUsPageProps {
  aboutUs: any;
}

export default function AboutUsPage({ aboutUs }: AboutUsPageProps) {
  const { seo, hero, categoryList } = aboutUs?.attributes;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hero) dispatch(setHeroData({ heroData: hero }));
  }, [hero]);

  return (
    <Container>
      <CategoryImageList
        categoryList={categoryList?.homeCategoryImage}
        layout={4}
        spacing={9}
        sx={{ mt: 1 }}
      />

      <TextSection />
    </Container>
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
