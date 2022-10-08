import { LinkData, NavigationData } from '@/models';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Url } from 'url';
import { IconMenu } from './icon-menu';

export interface HeaderDesktopProps {
  navigation: NavigationData;
}

export function HeaderDesktop({ navigation }: HeaderDesktopProps) {
  const router = useRouter();
  const navItems = navigation?.links ?? [];

  return (
    <AppBar
      component='nav'
      sx={{
        bgcolor: 'common.white',
        color: 'text.primary',
        boxShadow: '0 1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar sx={{ height: '75px', px: { lg: '145px' } }}>
        <Link href='/' passHref>
          <Typography
            component='a'
            fontSize='1.75rem'
            fontWeight='bold'
            fontFamily='Cormorant Garamond'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {navigation?.leftButton[0].label}
          </Typography>
        </Link>

        <Box
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {navItems.map((item: Partial<LinkData>) => (
            <Link key={item?.label ?? ''} href={(item?.href as Url) ?? ''} passHref>
              <Button
                endIcon={item.icon ? <ExpandMoreIcon sx={{ marginLeft: -1 }} /> : ''}
                disableRipple
                className={clsx({ active: router.pathname === item.href })}
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
