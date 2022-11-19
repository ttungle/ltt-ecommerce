import { shopApi } from '@/api-client';
import { BannerImage } from '@/components/common/banner';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { ProductList } from '@/components/common/products';
import { ProductPagination, ShopActionBar } from '@/components/shop';
import { ShopData } from '@/models';
import { fetchAPI } from '@/utils';
import { Container } from '@mui/material';
import { useQueries } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef } from 'react';

export interface ShopListPageProps {
  shop: ShopData;
}

export default function ShopListPage({ shop }: ShopListPageProps) {
  const { metadata, breadcrumb, banner, productListPageSize, sortTypeList } = shop;
  const router = useRouter();
  const currentQueryRef = useRef<any>();

  const queryParams = useMemo(() => {
    const { collection, slug, ...rest } = router.query;
    currentQueryRef.current = { ...router.query };
    return {
      ...rest,
      page: (router.query.page || 1).toString(),
      pageSize: (productListPageSize || 15).toString(),
      sort: router.query.sort || ['updatedAt:desc'],
    };
  }, [router.query]);

  const [productList] = useQueries({
    queries: [
      {
        queryKey: [`getProductList-${router.query.slug}`, { ...queryParams }],
        queryFn: async () => await shopApi.getAllProducts({ ...queryParams }),
        enabled: router.query.slug === 'all-products',
      },
    ],
  });

  const { data: productListData, isLoading } = productList;

  const handlePageChange = (value: number) => {
    const currentPath = router.pathname;
    currentQueryRef.current.page = value.toString();

    router.push({
      pathname: currentPath,
      query: currentQueryRef.current,
    });
  };

  const handleSortChange = useCallback(async (value: string) => {
    const sortParams = [];
    const currentPath = router.pathname;
    sortParams.push(value);
    currentQueryRef.current.sort = sortParams;

    router.push({
      pathname: currentPath,
      query: currentQueryRef.current,
    });
  }, []);

  return (
    <>
      <BannerImage banner={banner} />
      {!isLoading && (
        <Container>
          <Breadcrumb breadcrumb={breadcrumb} />
          <ShopActionBar sortTypeList={sortTypeList} onChange={handleSortChange} />
          <ProductList productsData={productListData?.data ?? []} grid={4} />
          <ProductPagination
            pagination={productListData?.meta?.pagination}
            onPageChange={handlePageChange}
          />
        </Container>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const shopData = await fetchAPI('/shop', {
    populate: [
      'metadata.shareImage',
      'breadcrumb.breadcrumbItem',
      'banner.bannerImage',
      'productListPageSize',
      'sortTypeList.sortTypeItem',
    ],
  });
  const shop = shopData.data.attributes;

  if (!shop) {
    return {
      notFound: true,
    };
  }

  return { props: { shop } };
};
