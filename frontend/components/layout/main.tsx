import { AuthProvider } from '@/contexts';
import { Box, Stack } from '@mui/material';
import Footer from 'components/common/footer';
import Header from 'components/common/header';
import { LayoutProps } from 'models';
import * as React from 'react';

export interface MainLayoutProps {}

export default function MainLayout({ children, global }: LayoutProps) {
  const { navigation, footer, smallText } = global;

  return (
    <Stack minHeight='100vh'>
      <Header navigationData={navigation} />

      <Box height='75px'></Box>

      <Box flexGrow={1}>{children}</Box>

      <Footer footerData={footer} smallTextData={smallText} />
    </Stack>
  );
}
