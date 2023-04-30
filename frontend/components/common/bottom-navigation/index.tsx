import { BOTTOM_NAV_HEIGHT, GLOBAL_PATHs } from '@/constant';
import { useAuthContext } from '@/contexts';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiStore } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { MobileSearchDialog } from './mobile-search-dialog';
import { getStrapiMedia } from '@/utils';

export interface BottomNavigationBarProps {}

export function BottomNavigationBar(props: BottomNavigationBarProps) {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { user } = useAuthContext();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const handleClickOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
  };

  return (
    <>
      {isMobile && !openSearchDialog && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99999,
            height: BOTTOM_NAV_HEIGHT,
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              onClick={() => router.push(GLOBAL_PATHs.home)}
              icon={<BiStore style={{ fontSize: '1.5rem' }} />}
            />
            <BottomNavigationAction
              onClick={() => router.push(user?.id ? GLOBAL_PATHs.profile : GLOBAL_PATHs.login)}
              icon={
                user?.id ? (
                  <Avatar
                    alt={user?.username}
                    src={getStrapiMedia(user?.avatar?.url) ?? ''}
                    variant='circular'
                    sx={{
                      height: 32,
                      width: 32,
                      fontSize: '1rem',
                    }}
                  />
                ) : (
                  <HiOutlineUser style={{ fontSize: '1.5rem' }} />
                )
              }
            />
            <BottomNavigationAction
              onClick={handleClickOpenSearchDialog}
              icon={<SearchIcon style={{ fontSize: '1.5rem' }} />}
            />
            <BottomNavigationAction
              onClick={() => router.push(GLOBAL_PATHs.favoriteProducts)}
              icon={<FiHeart style={{ fontSize: '1.25rem' }} />}
            />
          </BottomNavigation>
        </Paper>
      )}

      <MobileSearchDialog isOpen={openSearchDialog} onClose={handleCloseSearchDialog} />
    </>
  );
}
