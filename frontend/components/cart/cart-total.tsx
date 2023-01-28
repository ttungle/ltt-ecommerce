import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { ContainedButton } from '../common/custom-button';

export interface CartTotalProps {}

export function CartTotal(props: CartTotalProps) {
  return (
    <>
      <Card sx={{ minWidth: 275, boxShadow: 'none', borderRadius: '2px' }}>
        <Typography component='h4' fontWeight={600} py={2.5} pl={2}>
          Cart Totals
        </Typography>
        <Divider />

        <CardContent>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography fontWeight={500}>Total</Typography>
            <Typography fontWeight={600}>10.000</Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <ContainedButton fullWidth sx={{ py: 1.5 }}>
            Check Out
          </ContainedButton>
        </CardActions>
      </Card>
    </>
  );
}
