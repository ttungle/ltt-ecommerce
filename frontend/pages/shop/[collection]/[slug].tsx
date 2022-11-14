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
import { useMemo } from 'react';

export interface ShopListPageProps {
  shop: ShopData;
}

export default function ShopListPage({ shop }: ShopListPageProps) {
  const { metadata, breadcrumb, banner, productListPageSize } = shop;
  const router = useRouter();

  const queryParams = useMemo(() => {
    const { collection, slug, ...rest } = router.query;

    return {
      ...rest,
      page: (router.query.page || 1).toString(),
      pageSize: (productListPageSize || 15).toString(),
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
    const currentQuery = { ...router.query };
    currentQuery.page = value.toString();

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <>
      <BannerImage banner={banner} />
      {!isLoading && (
        <Container>
          <Breadcrumb breadcrumb={breadcrumb} />
          <ShopActionBar />
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
