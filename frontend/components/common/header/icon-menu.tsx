import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { cartItemCountSelector } from '@/app/selectors/cart-selector';
import {
  GLOBAL_PATHs,
  HEADER_VIEW_MINI_POPOVER_BTNs,
  HEADER_VIEW_MINI_POPOVER_MSGs,
  USER_MENU,
} from '@/constant';
import { useAuthContext } from '@/contexts';
import { NavigationData } from '@/models';
import { getStrapiMedia } from '@/utils';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SearchBox } from './search-box';
import { ViewMiniPopover } from './view-mini-popover';
import { hideFavoritePopover, hideMiniCart } from '@/app/slices/global-slice';

export interface IconMenuProps {
  navigation: NavigationData;
}

export function IconMenu({ navigation }: IconMenuProps) {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
  const cartIconRef = useRef(null);
  const favoriteIconRef = useRef(null);
  const cartItemTotalCount = useAppSelector(cartItemCountSelector);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const dispatch = useAppDispatch();
  const showMiniCart = useAppSelector((state) => state.global.showMiniCart);
  const showFavoritePopover = useAppSelector((state) => state.global.showFavoritePopover);

  useEffect(() => {
    if (user?.id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  useEffect(() => {
    if (showMiniCart && cartIconRef?.current) {
      clearTimeout(timerRef.current);
      setMenuAnchorEl(cartIconRef.current);
      timerRef.current = setTimeout(() => {
        setMenuAnchorEl(null);
        dispatch(hideMiniCart());
      }, 3000);
      return;
    }

    if (showFavoritePopover && favoriteIconRef?.current) {
      clearTimeout(timerRef.current);
      setMenuAnchorEl(favoriteIconRef.current);
      timerRef.current = setTimeout(() => {
        setMenuAnchorEl(null);
        dispatch(hideFavoritePopover());
      }, 3000);
      return;
    }

    setMenuAnchorEl(null);

    return () => clearTimeout(timerRef.current);
  }, [showMiniCart, showFavoritePopover]);

  const icons = useMemo(
    () =>
      ({
        search: <SearchBox />,
        person: <PersonOutlineOutlinedIcon sx={{ fontSize: 26 }} />,
        favorite: <FavoriteBorderOutlinedIcon sx={{ fontSize: 26 }} />,
        cart: (
          <Badge badgeContent={cartItemTotalCount} color='primary'>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 26 }} />
          </Badge>
        ),
      } as any),
    [cartItemTotalCount]
  );
  const isViewMiniPopoverOpen = useMemo(() => Boolean(menuAnchorEl), [menuAnchorEl]);
  const currentIconMenu = useMemo(
    () => (showMiniCart && 'cart') || (showFavoritePopover && 'favorite') || '',
    [showMiniCart, showFavoritePopover]
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuItemClick = (index: number) => {
    if (index === 0) router.push('/account/profile');
    if (index === 1) {
      logout();
      router.push('/');
    }
    setAnchorElUser(null);
  };

  const handleMenuIconClick = (href: any) => {
    router.push(`${href}`);
  };

  const handleCloseMiniCart = () => {
    setMenuAnchorEl(null);
    dispatch(hideMiniCart());
  };

  const handleViewMiniPopoverButtonClick = () => {
    if (currentIconMenu === 'cart') router.push(GLOBAL_PATHs.cart);
    if (currentIconMenu === 'favorite') router.push(GLOBAL_PATHs.favoriteProducts);
    setMenuAnchorEl(null);
  };

  return (
    <Box
      sx={{
        '& button': { transition: 'all 0.15s linear' },
        '& button:hover': {
          color: 'primary.main',
          bgcolor: 'unset',
        },
      }}
    >
      {navigation?.rightButton &&
        navigation.rightButton.map((item, index) => (
          <React.Fragment key={index}>
            {item?.icon === 'search' && (
              <IconButton disableRipple sx={{ color: 'text.primary' }}>
                {icons[item?.icon ?? '']}
              </IconButton>
            )}

            {item?.icon === 'cart' && (
              <IconButton
                disableRipple
                sx={{ color: 'text.primary' }}
                onClick={() => handleMenuIconClick(item?.href)}
                ref={cartIconRef}
              >
                {icons[item?.icon ?? '']}
              </IconButton>
            )}

            {isAuthenticated && item?.icon === 'person' && (
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt={user?.username}
                  src={getStrapiMedia(user?.avatar?.url) ?? ''}
                  variant='circular'
                  sx={{
                    height: 36,
                    width: 36,
                    fontSize: '1rem',
                  }}
                />
              </IconButton>
            )}

            {!isAuthenticated && item?.icon === 'person' && (
              <IconButton
                disableRipple
                sx={{ color: 'text.primary' }}
                onClick={() => router.push(`${item.href}`)}
              >
                {icons[item?.icon ?? '']}
              </IconButton>
            )}

            {item.icon === 'favorite' && (
              <IconButton
                disableRipple
                sx={{ color: 'text.primary' }}
                onClick={() => handleMenuIconClick(item?.href)}
                ref={favoriteIconRef}
              >
                {icons[item?.icon ?? '']}
              </IconButton>
            )}
          </React.Fragment>
        ))}

      <ViewMiniPopover
        open={isViewMiniPopoverOpen}
        onClose={handleCloseMiniCart}
        anchorEl={menuAnchorEl}
        onPopoverViewClick={handleViewMiniPopoverButtonClick}
        message={HEADER_VIEW_MINI_POPOVER_MSGs[`${router.locale + '-' + currentIconMenu}`]}
        buttonLabel={HEADER_VIEW_MINI_POPOVER_BTNs[`${router.locale + '-' + currentIconMenu}`]}
      />

      <Menu
        sx={{ mt: 6.5 }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          divider
          disableRipple
          sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0)' }, cursor: 'default' }}
        >
          <Typography textAlign='center' fontSize='0.875rem'>
            {user?.username}
          </Typography>
        </MenuItem>

        {USER_MENU.map((setting, index) => (
          <MenuItem key={index} onClick={() => handleUserMenuItemClick(index)}>
            <Typography textAlign='center' fontSize='0.875rem' sx={{ pr: 12 }}>
              {setting.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
