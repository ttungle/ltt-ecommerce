import { LinkData, NavigationData } from '@/models';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Url } from 'url';

export interface HeaderDesktopProps {
  navigation: NavigationData;
}

export default function HeaderDesktop({ navigation }: HeaderDesktopProps) {
  const router = useRouter();
  const navItems = navigation?.links ?? [];
  const icons = {
    search: <SearchIcon sx={{ fontSize: 26 }} />,
    person: <PersonOutlineOutlinedIcon sx={{ fontSize: 26 }} />,
    favorite: <FavoriteBorderOutlinedIcon sx={{ fontSize: 26 }} />,
    cart: <ShoppingBagOutlinedIcon sx={{ fontSize: 26 }} />,
  };

  return (
    <AppBar
      component='nav'
      sx={{ bgcolor: 'common.white', color: 'text.primary', boxShadow: 'none' }}
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

        <Box
          sx={{
            '& button': { transition: 'all 0.15s linear' },
            '& button:hover': {
              color: 'primary.main',
              transform: 'translateY(-6%)',
              bgcolor: 'unset',
            },
          }}
        >
          {navigation?.rightButton &&
            navigation.rightButton.map((item, index) => (
              <IconButton key={index} disableRipple sx={{ color: 'text.primary' }}>
                {icons[item?.icon ?? '']}
              </IconButton>
            ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
