import { LinkData, NavigationData } from '@/models';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Url } from 'url';
import { IconMenu } from './icon-menu';

export interface HeaderDesktopProps {
  navigation: NavigationData;
}

export function HeaderDesktop({ navigation }: HeaderDesktopProps) {
  const router = useRouter();
  const navItems = navigation?.links ?? [];

  const activeNavItem = useCallback(
    (item: Partial<LinkData>) =>
      router.asPath === '/'
        ? router.asPath === `${item?.href}`
        : item?.href?.toString().includes(router.asPath.split('/')[1]),
    [router]
  );

  return (
    <AppBar
      component='nav'
      sx={{
        bgcolor: 'common.white',
        color: 'text.primary',
        boxShadow: '0 1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar
        sx={{
          position: 'relative',
          height: '75px',
          px: { xl: '145px', lg: '30px' },
          justifyContent: 'space-between',
        }}
      >
        <Link href='/' passHref>
          <Typography
            component='a'
            fontSize='1.75rem'
            fontWeight='bold'
            fontFamily='Cormorant Garamond'
            sx={{ display: { xs: 'none', sm: 'block' }, zIndex: 1 }}
          >
            {navigation?.leftButton[0].label}
          </Typography>
        </Link>

        <Box
          sx={{
            textAlign: 'center',
            display: { xs: 'none', sm: 'block' },
            position: 'absolute',
            left: 0,
            right: 0,
          }}
        >
          {navItems.map((item: Partial<LinkData>) => (
            <Link key={item?.label ?? ''} href={(item?.href as Url) ?? ''} passHref>
              <Button
                endIcon={item.icon ? <ExpandMoreIcon sx={{ marginLeft: -1 }} /> : ''}
                disableRipple
                className={clsx({
                  active: activeNavItem(item),
                })}
                sx={{
                  mr: 1.5,
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'unset' },
                  '&:hover div': { left: 0, right: 0, opacity: 1 },
                }}
              >
                <Typography
                  component='span'
                  sx={{
                    position: 'relative',
                    fontSize: '0.875rem',
                  }}
                >
                  {item.label}
                  <Box
                    component='div'
                    sx={{
                      position: 'absolute',
                      left: '25%',
                      right: '25%',
                      height: '1px',
                      opacity: 0,
                      bgcolor: 'text.primary',
                      transition: 'all 0.2s ease',
                    }}
                  ></Box>
                </Typography>
              </Button>
            </Link>
          ))}
        </Box>

        <IconMenu navigation={navigation} />
      </Toolbar>
    </AppBar>
  );
}
