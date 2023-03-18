import { Login, Register, UserProfile } from '@/components/account';
import { GLOBAL_PATHs } from '@/constant';
import { Container, Stack } from '@mui/material';
import { useRouter } from 'next/router';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const router = useRouter();

  return (
    <Container maxWidth='xl'>
      <Stack direction='row' justifyContent='center' alignItems='center'>
        {router.asPath === GLOBAL_PATHs.register && <Register />}
        {router.asPath === GLOBAL_PATHs.login && <Login />}
        {[
          GLOBAL_PATHs.profile,
          GLOBAL_PATHs.changePassword,
          GLOBAL_PATHs.favoriteProducts,
        ].includes(router?.asPath as string) && <UserProfile />}
      </Stack>
    </Container>
  );
}
