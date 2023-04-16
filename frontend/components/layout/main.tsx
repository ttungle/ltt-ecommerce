import { DARK_BACKGROUND_PATHs, HEADER_HEIGHT } from '@/constant';
import { Box, Stack } from '@mui/material';
import Footer from 'components/common/footer';
import Header from 'components/common/header';
import { LayoutProps } from 'models';
import { useRouter } from 'next/router';
import { Seo } from '../common/seo';

export interface MainLayoutProps {}

export default function MainLayout({ children, global }: LayoutProps) {
  const router = useRouter();
  const { seo, navigation, footer, smallText } = global;

  return (
    <Stack minHeight='100vh'>
      <Header navigationData={navigation} />

      <Box
        component='main'
        flexGrow={1}
        sx={{
          mt: { lg: HEADER_HEIGHT, xs: 0 },
          bgcolor: DARK_BACKGROUND_PATHs.includes(router.pathname) ? 'bg.dark' : 'bg.main',
        }}
      >
        {seo && <Seo metadata={seo} />}
        {children}
      </Box>
      <Footer footerData={footer} smallTextData={smallText} />
    </Stack>
  );
}
