import { NavigationData } from '@/models';
import { Box } from '@mui/material';
import * as React from 'react';
import HeaderDesktop from './header-desktop';

export interface HeaderProps {
  navigation: NavigationData;
}

export default function Header({ navigation }: HeaderProps) {
  return (
    <Box>
      <HeaderDesktop navigation={navigation} />
    </Box>
  );
}
