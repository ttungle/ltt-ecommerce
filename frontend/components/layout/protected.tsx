import { DARK_BACKGROUND_PATHs, HEADER_HEIGHT } from '@/constant';
import { useAuthContext } from '@/contexts';
import { LayoutProps } from '@/models';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../common/footer';
import Header from '../common/header';
import { CircularLoader } from '../common/loader';
import { Seo } from '../common/seo';

export function ProtectedLayout({ children, global }: LayoutProps) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { seo, navigation, footer, smallText } = global;

  useEffect(() => {
    if (!user?.id) router.push('/account/login');
    if (user?.id) setIsAuthenticated(true);
  }, [router, user]);

  return (
    <Stack minHeight='100vh'>
      <Header navigationData={navigation} />

      {!isAuthenticated && <CircularLoader loaderContent='Wait a moment...' />}

      {isAuthenticated && (
        <Box
          component='main'
          flexGrow={1}
          sx={{
            mt: { lg: HEADER_HEIGHT, xs: 0 },
            bgcolor: DARK_BACKGROUND_PATHs.includes(router.pathname) ? 'bg.dark' : 'bg.main',
          }}
        >
          {seo && <Seo metadata={seo} />}
          {children}
        </Box>
      )}

      <Footer footerData={footer} smallTextData={smallText} />
    </Stack>
  );
}
