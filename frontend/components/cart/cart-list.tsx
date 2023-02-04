import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { cartItemSelector } from '@/app/selectors/cart-selector';
import { CartItemState, removeFromCart } from '@/app/slices/cart-slice';
import { GLOBAL_PATHs } from '@/constant';
import { CartTableData } from '@/models';
import { formatPrice, formatStringWithMaxLength, getStrapiMedia } from '@/utils';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { ContainedButton, OutLinedButton } from '../common/custom-button';
import { CartQuantityForm } from './cart-quantity-form';

export interface CartListProps {
  cartTableData: CartTableData;
}

export function CartList({ cartTableData }: CartListProps) {
  const router = useRouter();
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [currentRemoveItem, setCurrentRemoveItem] = useState<CartItemState>();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartItemSelector);
  const cartItemLength = useMemo(() => Array.isArray(cartItems) && cartItems.length, [cartItems]);

  const handleRemoveCartItem = (cartItem: CartItemState | undefined) => {
    if (!cartItem) return;
    const action = removeFromCart({ ...cartItem });
    dispatch(action);
    setShowRemoveConfirm(!showRemoveConfirm);
  };

  const handleProductClick = (path: string, id: number) => {
    router.push(`${GLOBAL_PATHs.productDetail}${path}?pid=${id}`);
  };

  const handleToggleRemoveConfirm = (item?: CartItemState) => {
    setShowRemoveConfirm(!showRemoveConfirm);
    setCurrentRemoveItem(item);
  };

  return (
    <>
      {cartItemLength > 0 && (
        <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '2px', mb: 8 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 400 }}>
                  {cartTableData?.productTableHead}
                </TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 400 }} align='center'>
                  {cartTableData?.priceTableHead}
                </TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 400 }} align='center'>
                  {cartTableData?.quantityTableHead}
                </TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 400 }} align='center'>
                  {cartTableData?.subtotalTableHead}
                </TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 400 }} align='center'>
                  <DeleteOutlineIcon />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={item.id + item?.size}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                      <Box
                        sx={{
                          flexShrink: 0,
                          border: '1px solid',
                          borderColor: 'grey.200',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleProductClick(item?.product?.path, item?.id)}
                      >
                        <Image
                          src={
                            getStrapiMedia(
                              item?.product?.thumbnails?.data[0]?.attributes?.url ?? ''
                            ) ?? ''
                          }
                          alt={item?.product?.name ?? ''}
                          height={80}
                          width={80}
                        />
                      </Box>

                      <Box ml={3}>
                        <Typography
                          fontWeight={600}
                          sx={{
                            '&:hover': { color: 'primary.main', cursor: 'pointer' },
                          }}
                          onClick={() => handleProductClick(item?.product?.path, item?.id)}
                        >
                          {formatStringWithMaxLength(item?.product?.name ?? '', 100)}
                        </Typography>
                        {item?.size && (
                          <Typography color='grey.600' fontSize='0.75rem'>
                            Size {item?.size}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align='center' sx={{ fontWeight: 600 }}>
                    {item?.product?.salePrice && formatPrice(item?.product?.salePrice)}
                  </TableCell>
                  <TableCell align='center'>
                    <CartQuantityForm productCartData={item} />
                  </TableCell>
                  <TableCell align='center' sx={{ fontWeight: 600 }}>
                    {formatPrice(
                      item.quantity * (item?.product?.salePrice ?? 0),
                      router?.locale ?? 'en'
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton onClick={() => handleToggleRemoveConfirm(item)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={showRemoveConfirm} onClose={() => handleToggleRemoveConfirm}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <WarningAmberIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Box>{cartTableData?.removeDialogTitle}</Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{cartTableData?.removeDialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <OutLinedButton
            sx={{ color: 'common.black', borderColor: 'common.black', letterSpacing: '0.08rem' }}
            onClick={() => handleRemoveCartItem(currentRemoveItem)}
          >
            {cartTableData?.removeDialogYesButton}
          </OutLinedButton>
          <ContainedButton
            onClick={() => handleToggleRemoveConfirm()}
            autoFocus
            sx={{ letterSpacing: '0.08rem' }}
          >
            {cartTableData?.removeDialogNoButton}
          </ContainedButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
