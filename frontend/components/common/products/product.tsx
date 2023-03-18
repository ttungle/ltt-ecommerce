import { authApi } from '@/api-client/auth-api';
import { useAuthContext } from '@/contexts';
import { ProductData, UserProfilePayloadData } from '@/models';
import { formatPrice, getStrapiMedia } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { CustomIconButton } from '../custom-button';
import { ProductActions } from './product-actions';

export interface ProductProps {
  productData: ProductData;
  showAction?: boolean;
  showDeleteButton?: boolean;
}

export function Product({
  productData,
  showAction = true,
  showDeleteButton = false,
}: ProductProps) {
  const { user, refreshUserProfile } = useAuthContext();
  const product = productData?.attributes;

  const { mutate } = useMutation({
    mutationKey: ['add-to-favorite'],
    mutationFn: async (payload: UserProfilePayloadData) => await authApi.updateProfile(payload),
    onSuccess: () => {
      refreshUserProfile();
    },
  });

  const handleDeleteFavoriteProduct = async (event: any) => {
    event.preventDefault();

    let userInfo = user;
    if (!userInfo?.favoriteProducts) {
      try {
        userInfo = await authApi.getProfile();
      } catch (error: any) {
        toast.error(error?.message);
        return;
      }
    }

    const { id, username, email, birthday, gender, phone, address, favoriteProducts } = userInfo;
    const favoriteProductsData = favoriteProducts.map((item) => item.id);

    mutate({
      id,
      username,
      email,
      birthday,
      gender,
      phone,
      address,
      favoriteProducts: favoriteProductsData.includes(productData?.id)
        ? [...favoriteProductsData].filter((item) => item !== productData?.id)
        : [...favoriteProductsData],
    });
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          cursor: 'pointer',
          '&:hover .product-buttons': {
            display: 'flex',
          },
          '&:hover .product-img-1': { opacity: product?.thumbnails?.data[1] ? 0 : 1 },
          '&:hover .product-img-2': {
            opacity: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            className='product-img-1'
            sx={{
              position: 'relative',
              zIndex: 1,
              transition: 'all 0.15s ease',
            }}
          >
            <Image
              src={getStrapiMedia(product?.thumbnails?.data[0]?.attributes?.url ?? '') ?? ''}
              alt='product-image'
              width={330}
              height={330}
              layout='responsive'
              loading='lazy'
            />
          </Box>
          {product?.thumbnails?.data[1] && (
            <Box
              className='product-img-2'
              sx={{ position: 'absolute', left: 0, top: 0, right: 0, zIndex: 0, opacity: 0 }}
            >
              <Image
                src={getStrapiMedia(product?.thumbnails?.data[1]?.attributes?.url ?? '') ?? ''}
                alt='product-image'
                width={330}
                height={330}
                layout='responsive'
                loading='lazy'
              />
            </Box>
          )}
        </Box>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            p: 1,
            zIndex: 1,
          }}
        >
          {
            <Typography
              fontSize='0.875rem'
              textAlign='center'
              sx={{
                py: 0.2,
                px: 0.8,
                bgcolor: 'primary.main',
                color: 'common.white',
                visibility: !product?.salePercentage ? 'hidden' : 'visibility',
              }}
            >
              {`-${product?.salePercentage}%`}
            </Typography>
          }

          <Stack direction='row'>
            {product?.isSoldOut && (
              <Typography
                fontSize='0.875rem'
                textAlign='center'
                sx={{
                  py: 0.2,
                  px: 0.8,
                  bgcolor: 'grey.500',
                  color: 'common.white',
                }}
              >
                Out Of Stock
              </Typography>
            )}
            {product?.isBestSeller && (
              <Typography
                fontSize='0.875rem'
                textAlign='center'
                sx={{
                  ml: 1,
                  py: 0.2,
                  px: 0.8,
                  bgcolor: '#222',
                  color: 'common.white',
                }}
              >
                HOT
              </Typography>
            )}
          </Stack>
        </Stack>

        {showAction && <ProductActions productData={productData} />}

        {showDeleteButton && (
          <CustomIconButton
            color='primary.main'
            onClick={handleDeleteFavoriteProduct}
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              zIndex: 9999,
              bgcolor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <AiFillDelete style={{ fontSize: '1rem' }} />
          </CustomIconButton>
        )}
      </Box>

      <Box textAlign='center'>
        <Typography
          fontSize='0.875rem'
          fontWeight='600'
          textTransform='uppercase'
          color='common.text.primary'
          mt={1.2}
          mb={0.3}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          {product?.name}
        </Typography>
        <Typography color='common.text.primary' fontSize='1rem' fontWeight='300' mt={0}>
          {formatPrice(product?.salePrice ?? 0, 'en')}
        </Typography>
      </Box>
    </>
  );
}
