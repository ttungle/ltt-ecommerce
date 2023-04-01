import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { IoDiamondOutline } from 'react-icons/io5';

export interface TextSectionProps {}

export function TextSection(props: TextSectionProps) {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      mt={9}
      maxWidth='900px'
      mx='auto'
    >
      <IoDiamondOutline style={{ fontSize: '3.125rem' }} />
      <Typography fontFamily='Cormorant Garamond' fontWeight={600} fontSize='3rem'>
        Where It All Began
      </Typography>
      <Typography textAlign='center' color='text.secondary'>
        Aenean imperdiet. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique
        sapien, a accumsan nisi mauris ac eros. Vestibulum fringilla pede sit amet augue. Donec quam
        felis, ultricies nec, pellentesque eu, pretium quis, sem. Fusce fermentum odio nec
        arcu.Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae
        iaculis lacus elit id tortor. Sed cursus turpis vitae tortor. Vestibulum eu odio. Sed in
        libero ut nibh placerat accumsan. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas.
      </Typography>
    </Stack>
  );
}
