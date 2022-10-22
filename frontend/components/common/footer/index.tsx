import { subscriptionApi } from '@/api-client';
import { FooterData, FooterSmallTextData, SubscriptionValueData } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FooterSmallText } from './small-text';
import SubscriptionForm from './subscription-form';
import { SubscriptionMessage } from './subscription-message';

export interface FooterProps {
  footerData: FooterData;
  smallTextData: FooterSmallTextData;
}

export default function Footer({ footerData, smallTextData }: FooterProps) {
  const { footerColumns, footerForm } = footerData;
  const router = useRouter();
  const [showSuccessSubscription, setShowSuccessSubscription] = useState(false);

  const schema = yup.object({
    email: yup.string().required('This field is required.').email('Please enter your email.'),
  });
  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values: SubscriptionValueData) => {
    const response = await subscriptionApi.send({ data: values });
    setShowSuccessSubscription(Boolean(response?.data.attributes.email));
    form.reset();
  };

  return (
    <Box sx={{ pt: 7, bgcolor: router.pathname === '/' ? '#fff' : '#f6f6f6' }}>
      <Container maxWidth='xl'>
        <Grid container mb={7}>
          {footerColumns.map((column) => (
            <Grid item key={column.id} md={3} xs={6}>
              <Typography
                variant='body1'
                fontWeight={700}
                fontFamily='Cormorant Garamond'
                textTransform='uppercase'
                marginBottom={3}
              >
                {column.title}
              </Typography>

              {column.links.map((link) => (
                <Link href={`${link?.href}` ?? '#'} key={link.id}>
                  <Box
                    component='a'
                    sx={{
                      display: 'block',
                      my: 1.5,
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {link?.label}
                  </Box>
                </Link>
              ))}
            </Grid>
          ))}

          {Boolean(footerForm.id) && (
            <Grid item md={3} xs={6}>
              <Typography
                variant='body1'
                fontWeight={600}
                fontFamily='Cormorant Garamond'
                textTransform='uppercase'
                marginBottom={3}
              >
                {footerForm.title}
              </Typography>
              <Typography
                sx={{
                  my: 1.5,
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'text.secondary',
                }}
              >
                {footerForm.description}
              </Typography>

              <SubscriptionForm form={form} name='email' label='' onSubmit={handleSubmit} />

              {showSuccessSubscription && (
                <SubscriptionMessage setShowSuccessSubscription={setShowSuccessSubscription} />
              )}
            </Grid>
          )}
        </Grid>
      </Container>

      <FooterSmallText smallTextData={smallTextData} />
    </Box>
  );
}
