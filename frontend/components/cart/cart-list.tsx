import { useAppSelector } from '@/stores/hooks';
import { formatPrice, getStrapiMedia } from '@/utils';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CartQuantityForm } from './cart-quantity-form';

export interface CartListProps {}

export function CartList(props: CartListProps) {
  const selector = useAppSelector((state) => state.cart.cartItems);
  console.log('>>> Check selector: ', selector);
  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '2px' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Product</TableCell>
              <TableCell sx={{ fontSize: '0.875rem', fontWeight: 600 }} align='center'>
                Price
              </TableCell>
              <TableCell sx={{ fontSize: '0.875rem', fontWeight: 600 }} align='center'>
                Quantity
              </TableCell>
              <TableCell sx={{ fontSize: '0.875rem', fontWeight: 600 }} align='center'>
                Subtotal
              </TableCell>
              <TableCell sx={{ fontSize: '0.875rem', fontWeight: 600 }} align='center'>
                <DeleteOutlineIcon />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {selector.map((row) => (
              <TableRow
                key={row.id + row?.size}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                    <Box sx={{ border: '1px solid', borderColor: 'grey.200' }}>
                      <Image
                        src={
                          getStrapiMedia(
                            row?.product?.thumbnails?.data[0]?.attributes?.url ?? ''
                          ) ?? ''
                        }
                        alt={row?.product?.name ?? ''}
                        height={80}
                        width={80}
                      />
                    </Box>

                    <Box ml={3}>
                      <Typography fontWeight={500}>{row?.product?.name}</Typography>
                      {row?.size && (
                        <Typography color='grey.600' fontSize='0.75rem'>
                          Size {row?.size}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 500 }}>
                  {row?.product?.salePrice && formatPrice(row?.product?.salePrice, 'en')}
                </TableCell>
                <TableCell align='center'>
                  <CartQuantityForm productCartData={row} />
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 500 }}>
                  SubTotal
                </TableCell>
                <TableCell align='center'>
                  <IconButton>
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
