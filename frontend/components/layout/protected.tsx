import { useAuthContext } from '@/contexts';
import { LayoutProps } from '@/models';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../common/footer';
import Header from '../common/header';
import { CircularLoader } from '../common/Loader';

export function ProtectedLayout({ children, global }: LayoutProps) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { navigation, footer, smallText } = global;

  useEffect(() => {
    if (!user?.id) router.push('/account/login');
    if (user?.id) setIsAuthenticated(true);
  }, [router, user]);

  return (
    <Stack minHeight='100vh'>
      <Header navigationData={navigation} />

      <Box height='75px'></Box>

      {!isAuthenticated && <CircularLoader loaderContent='Wait a moment...' />}

      {isAuthenticated && <Box flexGrow={1}>{children}</Box>}

      <Footer footerData={footer} smallTextData={smallText} />
    </Stack>
  );
}
