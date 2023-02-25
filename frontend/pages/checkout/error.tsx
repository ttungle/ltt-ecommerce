import { checkoutApi } from '@/api-client/checkout-api';
import { ContainedButton } from '@/components/common/custom-button';
import { CircularLoader } from '@/components/common/loader';
import { GLOBAL_PATHs } from '@/constant';
import { getStrapiMedia } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

export interface CheckoutErrorProps {}

export default function CheckoutError(props: CheckoutErrorProps) {
  const router = useRouter();
  const checkoutPageQuery = useQuery({
    queryKey: ['checkoutPage'],
    queryFn: async () => checkoutApi.getCheckoutPage(),
  });

  const { data, isLoading } = checkoutPageQuery;

  return (
    <>
      {!isLoading && (
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{
            px: { lg: 10, xs: 2 },
            py: { lg: 10, xs: 10 },
          }}
        >
          <Box sx={{ width: { lg: 200, xs: 100 }, height: { lg: 200, xs: 100 }, mb: 3 }}>
            <Image
              src={
                getStrapiMedia(
                  data?.data?.attributes?.checkoutStatus[1]?.image?.data?.attributes?.url
                ) ?? ''
              }
              alt='checkout-success-img'
              width={200}
              height={200}
              layout='responsive'
            />
          </Box>

          <Typography fontSize='1.5rem' fontWeight={700} textAlign='center' mb={2}>
            {data?.data?.attributes?.checkoutStatus[1]?.title}
          </Typography>
          <Typography fontSize='1rem' textAlign='center'>
            {data?.data?.attributes?.checkoutStatus[1]?.description ??
              'You will be receiving a confirmation email with order details.'}
          </Typography>
          <ContainedButton onClick={() => router.push(GLOBAL_PATHs.checkout)} sx={{ mt: 2 }}>
            {data?.data?.attributes?.checkoutStatus[1]?.buttonContent}
          </ContainedButton>
        </Stack>
      )}

      {isLoading && <CircularLoader />}
    </>
  );
}
