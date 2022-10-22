import { NavigationData } from '@/models';
import { HeaderDesktop } from './header-desktop';

export interface HeaderProps {
  navigationData: NavigationData;
}

export default function Header({ navigationData }: HeaderProps) {
  return (
    <>
      <HeaderDesktop navigation={navigationData} />
    </>
  );
}
