import { ContainedButton } from '@/components/common/custom-button';
import { GLOBAL_PATHs } from '@/constant';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export interface NotFoundPageProps {}

export default function NotFoundPage(props: NotFoundPageProps) {
  const router = useRouter();
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        px: { lg: 10, xs: 2 },
        py: { lg: 10, xs: 10 },
      }}
    >
      <Box sx={{ width: { lg: 500, xs: 300 }, height: { lg: 500, xs: 300 } }}>
        <Image
          src={'/404-not-found.jpg'}
          alt='checkout-success-img'
          width={200}
          height={200}
          layout='responsive'
        />
      </Box>

      <Typography fontSize='1.25rem' fontWeight={500} textAlign='center' mb={2}>
        {"Sorry - we can't find the page you're looking for."}
      </Typography>
      <ContainedButton onClick={() => router.push(GLOBAL_PATHs.home)} sx={{ mt: 2 }}>
        Go to Home Page
      </ContainedButton>
    </Stack>
  );
}
