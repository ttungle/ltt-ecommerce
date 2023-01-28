import { DARK_BACKGROUND_PATHs } from '@/constant';
import { Box, Stack } from '@mui/material';
import Footer from 'components/common/footer';
import Header from 'components/common/header';
import { LayoutProps } from 'models';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface MainLayoutProps {}

export default function MainLayout({ children, global }: LayoutProps) {
  const router = useRouter();
  const { navigation, footer, smallText } = global;

  return (
    <Stack minHeight='100vh'>
      <Header navigationData={navigation} />

      <Box
        component='main'
        flexGrow={1}
        sx={{
          mt: '75px',
          bgcolor: DARK_BACKGROUND_PATHs.includes(router.pathname) ? 'bg.dark' : 'bg.main',
        }}
      >
        {children}
      </Box>

      <Footer footerData={footer} smallTextData={smallText} />
    </Stack>
  );
}
