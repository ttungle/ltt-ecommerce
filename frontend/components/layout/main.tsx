import { Box, Stack } from '@mui/material';
import Footer from 'components/common/footer';
import Header from 'components/common/header';
import { LayoutProps } from 'models';
import * as React from 'react';

export interface MainLayoutProps {}

export default function MainLayout({ children, global }: LayoutProps) {
  const { navigation, footer } = global;

  return (
    <Stack>
      <Header navigation={navigation} />

      <Box height='75px'></Box>

      <Box component='main' flexGrow={1}>
        {children}
      </Box>

      <Footer footer={footer} />
    </Stack>
  );
}
