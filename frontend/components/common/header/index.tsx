import { NavigationData } from '@/models';
import { Box } from '@mui/material';
import * as React from 'react';
import HeaderDesktop from './header-desktop';

export interface HeaderProps {
  navigationData: NavigationData;
}

export default function Header({ navigationData }: HeaderProps) {
  return (
    <Box>
      <HeaderDesktop navigation={navigationData} />
    </Box>
  );
}
