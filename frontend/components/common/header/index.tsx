import { NavigationData } from '@/models';
import { HeaderDesktop } from './header-desktop';
import { useMediaQuery, useTheme } from '@mui/material';
import { HeaderMobile } from './header-mobile';

export interface HeaderProps {
  navigationData: NavigationData;
}

export default function Header({ navigationData }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {!isMobile && <HeaderDesktop navigation={navigationData} />}
      {isMobile && <HeaderMobile navigation={navigationData} />}
    </>
  );
}
