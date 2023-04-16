import { useAppSelector } from '@/app/hooks';
import { cartItemCountSelector } from '@/app/selectors/cart-selector';
import { GLOBAL_PATHs, HEADER_HEIGHT } from '@/constant';
import { NavigationData } from '@/models';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Badge, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { SlBag } from 'react-icons/sl';
import { DrawerContent } from './drawer-content';

export interface HeaderMobileProps {
  navigation: NavigationData;
  window?: () => Window;
}

const drawerWidth = 240;

export function HeaderMobile({ navigation, window }: HeaderMobileProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartIconRef = useRef(null);
  const router = useRouter();
  const cartItemTotalCount = useAppSelector(cartItemCountSelector);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuIconClick = (href: string) => {
    router.push(`${href}`);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component='nav' position='relative' sx={{ top: 0, left: 0, right: 0, zIndex: 9999 }}>
        <Toolbar
          sx={{ height: HEADER_HEIGHT, bgcolor: 'common.white', justifyContent: 'space-between' }}
        >
          <IconButton
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ display: { lg: 'none', xs: 'block' } }}
          >
            <MenuIcon sx={{ fontSize: '1.875rem', color: 'common.black' }} />
          </IconButton>

          <Link href='/' passHref>
            <Typography
              component='a'
              fontSize='1.75rem'
              fontWeight='bold'
              fontFamily='Cormorant Garamond'
              sx={{ display: 'block', zIndex: 1, color: 'text.primary' }}
            >
              {navigation?.leftButton[0].label}
            </Typography>
          </Link>

          <IconButton
            disableRipple
            sx={{ color: 'text.primary' }}
            onClick={() => handleMenuIconClick(GLOBAL_PATHs.cart)}
            ref={cartIconRef}
          >
            <Badge badgeContent={cartItemTotalCount} color='primary'>
              <SlBag style={{ fontSize: 22 }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            zIndex: 9999,
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerContent navigationLinks={navigation?.links} onDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>
    </>
  );
}
