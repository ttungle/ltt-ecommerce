import { authApi } from '@/api-client/auth-api';
import { useAppDispatch } from '@/app/hooks';
import { CartItemState, addToCart } from '@/app/slices/cart-slice';
import { showFavoritePopover, showMiniCart } from '@/app/slices/global-slice';
import { GLOBAL_PATHs, REQUIRE_AUTH_MSGs } from '@/constant';
import { useAuthContext } from '@/contexts';
import { ProductData, UserProfilePayloadData } from '@/models';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export interface ProductActionsProps {
  productData: ProductData;
}

export function ProductActions({ productData }: ProductActionsProps) {
  const router = useRouter();
  const { user, refreshUserProfile } = useAuthContext();
  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationKey: ['add-to-favorite'],
    mutationFn: async (payload: UserProfilePayloadData) => await authApi.updateProfile(payload),
    onSuccess: async () => {
      dispatch(showFavoritePopover());
      refreshUserProfile();
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  const handleAddToFavoriteClick = async (event: any) => {
    event.preventDefault();

    if (!user?.id) {
      router.push(GLOBAL_PATHs.login);
      window.alert(REQUIRE_AUTH_MSGs[`${router.locale}`]);
      return;
    }

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
      favoriteProducts: productData?.id
        ? [...favoriteProductsData, productData?.id]
        : [...favoriteProductsData],
    });
  };

  const handleAddToCartClick = (event: any) => {
    event.preventDefault();
    const cartItem = {
      quantity: 1,
      size: '6',
      id: productData?.id,
      product: productData?.attributes,
    } as CartItemState;

    const action = addToCart(cartItem);

    dispatch(action);
    dispatch(showMiniCart());
  };

  return (
    <Stack
      className='product-buttons'
      direction='column'
      alignItems='center'
      justifyContent='space-between'
      sx={{
        display: 'none',
        position: 'absolute',
        bottom: '12%',
        right: 0,
        p: 1,
        zIndex: 1,
      }}
    >
      <Tooltip title='Add to favorite' placement='right-start'>
        <IconButton
          size='large'
          onClick={handleAddToFavoriteClick}
          sx={{
            borderRadius: '2px',
            bgcolor: 'common.white',
            mb: 1,
            transform: 'scale(0.9)',
            opacity: 0.75,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1)',
              opacity: 1,
              bgcolor: 'common.white',
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Add to cart' placement='right-start'>
        <IconButton
          size='large'
          onClick={handleAddToCartClick}
          sx={{
            borderRadius: '2px',
            bgcolor: 'common.white',
            transform: 'scale(0.9)',
            opacity: 0.75,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1)',
              opacity: 1,
              bgcolor: 'common.white',
            },
          }}
        >
          <ShoppingBagIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
