import * as React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { FooterSmallTextData } from '@/models';
import Link from 'next/link';
import { FooterSocialIcon } from './footer-social-icon';

export interface FooterSmallTextProps {
  smallTextData: FooterSmallTextData;
}

export function FooterSmallText({ smallTextData }: FooterSmallTextProps) {
  return (
    <>
      <Divider />

      <Container maxWidth='xl'>
        <Grid container sx={{ py: 3 }} alignItems='center'>
          <Grid item md={6}>
            <Stack direction='row'>
              <Typography variant='body2' color='text.secondary'>
                {smallTextData?.copyRight}
              </Typography>

              {smallTextData?.policyLinks.map((link) => (
                <Link href={`${link?.href}`} key={link.id}>
                  <Stack direction='row' justifyContent='center' alignItems='center' component='a'>
                    <FiberManualRecordIcon sx={{ fontSize: 6, mx: 1, color: 'text.secondary' }} />
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                    >
                      {link?.label}
                    </Typography>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item md={6}>
            <Stack direction='row' justifyContent='flex-end' alignItems='center'>
              {smallTextData?.social?.map((socialIcon) => (
                <Link href={`${socialIcon?.link}`} key={socialIcon.id}>
                  <Box
                    component='a'
                    sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                  >
                    <FooterSocialIcon iconName={socialIcon.icon} sx={{ marginLeft: 2 }} />
                  </Box>
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
