import MainLayout from '@/components/layout/main';
import { AuthProvider } from '@/contexts';
import { AppPropsWithLayout } from '@/models';
import { fetchAPI } from '@/utils';
import createEmotionCache from '@/utils/create-emotion-cache';
import theme from '@/utils/theme';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App, { AppContext } from 'next/app';
import Error from 'next/error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/globals.css';
import '../styles/swiper.css';
import '../styles/gallery-swiper.css';

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? MainLayout;

  const { global } = pageProps;
  if (!global) return <Error statusCode={404} />;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Layout global={global}>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
          <ToastContainer style={{ marginTop: '60px' }} />
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  try {
    const globalData = await fetchAPI(`/global`, {
      populate: [
        'navigation.links',
        'footer.footerColumns.links',
        'navigation.leftButton',
        'navigation.rightButton',
        'footer.footerColumns.links',
        'footer.footerForm',
        'smallText.policyLinks',
        'smallText.social',
      ],
    });
    const global = globalData.data.attributes;

    return { ...appProps, pageProps: { global } };
  } catch (error) {
    console.log(error);
    return { ...appProps };
  }
};
