import { useAppSelector } from '@/app/hooks';
import { cartItemSelector } from '@/app/selectors/cart-selector';
import { GLOBAL_PATHs } from '@/constant';
import { formatPrice, formatStringWithMaxLength, getStrapiMedia } from '@/utils';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CartQuantityForm } from './cart-quantity-form';
import { CartItemState } from '@/app/slices/cart-slice';
import { useMemo } from 'react';

export interface CartListCardProps {
  onRemoveConfirm: (item?: CartItemState) => void;
}

export function CartListCard({ onRemoveConfirm }: CartListCardProps) {
  const router = useRouter();
  const cartItems = useAppSelector(cartItemSelector);
  const cartItemLength = useMemo(
    () => (Array.isArray(cartItems) ? cartItems.length : 0),
    [cartItems]
  );

  const handleProductClick = (path: string, id: number) => {
    router.push(`${GLOBAL_PATHs.productDetail}${path}?pid=${id}`);
  };

  const handleToggleRemoveConfirm = (item?: CartItemState) => {
    if (!onRemoveConfirm) return;

    onRemoveConfirm(item);
  };

  return (
    <Paper elevation={0} sx={{ px: 2, borderRadius: '2px' }}>
      {cartItemLength > 0 &&
        cartItems.map((item, index: number) => (
          <Box
            key={item.id + item?.size}
            py={2}
            sx={{ borderBottom: index === cartItemLength - 1 ? 'none' : '1px solid #ddd' }}
          >
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
                    getStrapiMedia(item?.product?.thumbnails?.data[0]?.attributes?.url ?? '') ?? ''
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

            <Stack direction='row' alignItems='center' justifyContent='space-between' mt={2}>
              <Typography sx={{ fontWeight: 600 }}>
                {item?.product?.salePrice && formatPrice(item?.product?.salePrice)}
              </Typography>
              <CartQuantityForm productCartData={item} />
              <Typography sx={{ fontWeight: 600 }}>
                {formatPrice(
                  item.quantity * (item?.product?.salePrice ?? 0),
                  router?.locale ?? 'en'
                )}
              </Typography>
              <IconButton onClick={() => handleToggleRemoveConfirm(item)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}

      {cartItemLength <= 0 && <Typography>There is no items in cart.</Typography>}
    </Paper>
  );
}
