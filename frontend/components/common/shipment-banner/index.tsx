import { ShipmentData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box, Container, Grid, Stack, SxProps, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

export interface ShipmentBannerProps {
  shipmentData: ShipmentData;
  sx?: SxProps;
}

export function ShipmentBanner({ shipmentData, sx }: ShipmentBannerProps) {
  const { shipmentItem, backgroundImage } = shipmentData;
  return (
    <Box
      sx={{
        width: '100%',
        py: 9.4,
        mt: 5,
        background: backgroundImage
          ? `url(${
              getStrapiMedia(backgroundImage?.data?.attributes?.url) ?? ''
            }) no-repeat center/cover`
          : 'none',
        ...sx,
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={5}>
          {shipmentItem.map((item) => (
            <Grid item key={item.id} xs={4}>
              <Stack
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{ px: 10, textAlign: 'center' }}
              >
                <Image
                  src={getStrapiMedia(item?.icon?.data?.attributes?.url) ?? ''}
                  alt='shipment-icon'
                  width={50}
                  height={50}
                />
                <Typography
                  variant='body2'
                  textTransform='uppercase'
                  fontWeight={500}
                  sx={{ my: 0.8 }}
                >
                  {item?.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {item?.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
