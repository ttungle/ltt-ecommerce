import { shopApi } from '@/api-client';
import { authApi } from '@/api-client/auth-api';
import { ContainedButton } from '@/components/common/custom-button';
import { ProductList } from '@/components/common/products';
import { useAuthContext } from '@/contexts';
import { UserData, UserProfilePayloadData } from '@/models';
import { Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

export interface FavoriteProductListProps {
  userData: UserData | null;
}

export function FavoriteProductList({ userData }: FavoriteProductListProps) {
  const { user, refreshUserProfile } = useAuthContext();
  const [productData, setProductData] = useState([]);
  const ids = useMemo(
    () =>
      user?.favoriteProducts
        ? user?.favoriteProducts.map((item) => item?.id)
        : userData?.favoriteProducts.map((item) => item?.id),
    [userData, user]
  );

  useQuery({
    queryKey: ['getProductList', ids],
    queryFn: async () => await shopApi.getAllProducts({ filters: { id: { $in: ids } } }),
    enabled: Boolean(Array.isArray(ids) && ids?.length > 0),
    onSuccess: (data) => {
      setProductData(data?.data);
    },
  });

  useEffect(() => {
    if (Array.isArray(ids) && ids?.length === 0) {
      setProductData([]);
    }
  }, [ids]);

  const { mutate } = useMutation({
    mutationKey: ['add-to-favorite'],
    mutationFn: async (payload: UserProfilePayloadData) => await authApi.updateProfile(payload),
    onSuccess: () => {
      refreshUserProfile();
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  const handleDeleteAllFavorite = async () => {
    let userInfo = user;
    if (!userInfo?.favoriteProducts) {
      try {
        userInfo = await authApi.getProfile();
      } catch (error: any) {
        toast.error(error?.message);
        return;
      }
    }

    mutate({
      ...userInfo,
      favoriteProducts: [],
    });
  };

  return (
    <>
      {Array.isArray(productData) && productData.length > 0 && (
        <>
          <ContainedButton
            onClick={handleDeleteAllFavorite}
            sx={{ mb: 2 }}
            startIcon={<AiFillDelete />}
          >
            Clear all list
          </ContainedButton>
          <ProductList
            productsData={productData ?? []}
            grid={6}
            showAction={false}
            showDeleteButton={true}
          />
        </>
      )}

      {productData.length === 0 && <Typography>There is no favorite products.</Typography>}
    </>
  );
}
