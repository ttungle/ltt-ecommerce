import { useAppDispatch } from '@/app/hooks';
import { showMiniCart } from '@/app/slices/cart-slice';
import { CategoryData, ShopDetailSizeSelectionData } from '@/models';
import CloseIcon from '@mui/icons-material/Close';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { Box, Divider, IconButton, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { ContainedButton, OutLinedButton } from '../../common/custom-button';
import { QuantityField } from '../../common/form-controls';
import { ProductSizeSelection } from './product-size-selection';

export interface ProductAddToCartFormProps {
  categoryData: CategoryData | undefined;
  sizeSelectionData: ShopDetailSizeSelectionData | undefined;
  onSubmit: (value: FieldValues) => void;
}

export function ProductAddToCartForm({
  categoryData,
  sizeSelectionData,
  onSubmit,
}: ProductAddToCartFormProps) {
  const router = useRouter();
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<FieldValues>({
    defaultValues: {
      quantity: 1,
      size: categoryData?.data?.attributes?.sizeSelectionList[0]?.value ?? '',
    },
  });

  const { handleSubmit } = form;

  const toggleSizeGuide = (value: boolean) => {
    setShowSizeGuide(value);
  };

  const handleFormSubmit = (value: FieldValues) => {
    if (!onSubmit) return;

    onSubmit(value);
  };

  const handleAddToCartClick = () => {
    dispatch(showMiniCart());
  };

  return (
    <>
      <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
        <Divider sx={{ mb: 1 }} />
        {categoryData && (
          <ProductSizeSelection
            sizeSelectionListData={categoryData?.data?.attributes?.sizeSelectionList}
            form={form}
            label={sizeSelectionData?.title ?? ''}
            name='size'
            placeholder=''
          />
        )}
        <Divider sx={{ mt: 1, mb: 1 }} />

        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          onClick={(e) => toggleSizeGuide(true)}
          sx={{ mb: 1, '&:hover': { cursor: 'pointer', color: 'primary.main' } }}
        >
          <SquareFootIcon sx={{ fontSize: '1.25rem', mr: 0.5 }} />
          <Typography fontSize='0.875rem' sx={{ my: 'auto' }}>
            Size Guide
          </Typography>
        </Stack>

        <QuantityField
          form={form}
          label=''
          name='quantity'
          placeholder=''
          maxQuantity={1000}
          sx={{ '& input': { width: '72px' }, mb: 2 }}
        />

        <ContainedButton
          type='submit'
          fullWidth
          onClick={handleAddToCartClick}
          sx={{ py: 1.5, fontSize: { md: '0.875rem', xs: '0.75rem' } }}
        >
          Add To Cart
        </ContainedButton>
        <OutLinedButton
          fullWidth
          type='submit'
          onClick={() => router.push('/cart')}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: { md: '0.875rem', xs: '0.75rem' },
            borderColor: 'common.black',
            color: 'common.black',
          }}
        >
          Buy Now
        </OutLinedButton>
      </Box>

      <SwipeableDrawer
        anchor='right'
        open={showSizeGuide}
        onClose={(e) => toggleSizeGuide(false)}
        onOpen={(e) => toggleSizeGuide(true)}
      >
        <Box sx={{ width: { lg: '30vw', xs: '80vw' } }}>
          <Stack direction='row' justifyContent='flex-start' alignItems='center' px={1} pt={1}>
            <IconButton onClick={(e) => toggleSizeGuide(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography fontSize='0.875rem' sx={{ p: { lg: '16px 42px 42px', xs: 2 } }}>
            {sizeSelectionData?.sizeDescription}
          </Typography>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
