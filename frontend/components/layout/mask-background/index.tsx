import { DARK_BACKGROUND_PATHs } from '@/constant';
import { Box, Stack } from '@mui/material';
import Footer from 'components/common/footer';
import Header from 'components/common/header';
import { LayoutProps } from 'models';
import { useRouter } from 'next/router';
import { BackgroundSection } from './background-section';
import { OverlayContent } from './overlay-content';
import { HeroSectionData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { useAppSelector } from '@/app/hooks';

export interface MaskBackgroundLayoutProps extends LayoutProps {
  heroData?: HeroSectionData;
}

export default function MaskBackgroundLayout({ children, global }: LayoutProps) {
  const router = useRouter();
  const { navigation, footer, smallText } = global;
  const heroData = useAppSelector((state) => state.about.heroData);

  return (
    <Stack minHeight='100vh'>
      <Header navigationData={navigation} />
      <BackgroundSection
        backgroundImageUrl={getStrapiMedia(heroData?.heroImage?.data?.attributes?.url ?? '') ?? ''}
      />
      <Box
        component='main'
        flexGrow={1}
        sx={{
          position: 'absolute',
          mt: '75px',
          top: { lg: 720, xs: 360 },
          left: 0,
          right: 0,
          bgcolor: DARK_BACKGROUND_PATHs.includes(router.pathname) ? 'bg.dark' : 'bg.main',
        }}
      >
        <OverlayContent title={heroData?.title} description={heroData?.description} />
        {children}
        <Footer footerData={footer} smallTextData={smallText} />
      </Box>
    </Stack>
  );
}
