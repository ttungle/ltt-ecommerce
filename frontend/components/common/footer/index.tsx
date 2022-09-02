import { FooterData, FooterSmallTextData, SubscriptionValueData } from '@/models';
import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import SubscriptionForm from './subscription-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { subscriptionApi } from '@/api-client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FooterSmallText } from './small-text';

export interface FooterProps {
  footerData: FooterData;
  smallTextData: FooterSmallTextData;
}

export default function Footer({ footerData, smallTextData }: FooterProps) {
  const { footerColumns, footerForm } = footerData;
  const [showSuccessSubscription, setShowSuccessSubscription] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

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

    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setShowSuccessSubscription(false);
    }, 3000);
    setShowSuccessSubscription(Boolean(response?.data.attributes.email));
    form.reset();
  };

  return (
    <>
      <Container maxWidth='xl'>
        <Grid container mb={7}>
          {footerColumns.map((column) => (
            <Grid item key={column.id} md={3} xs={6}>
              <Typography
                variant='body1'
                fontWeight={600}
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

          {footerForm.id && (
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
                <Stack
                  direction='row'
                  justifyContent='flex-start'
                  alignItems='center'
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    mt: 1.5,
                    border: '2px solid',
                    borderColor: 'success.light',
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: '1rem', color: 'success.light' }} />
                  <Typography sx={{ ml: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                    Thank you. It has been sent.
                  </Typography>
                </Stack>
              )}
            </Grid>
          )}
        </Grid>
      </Container>

      <FooterSmallText smallTextData={smallTextData} />
    </>
  );
}
