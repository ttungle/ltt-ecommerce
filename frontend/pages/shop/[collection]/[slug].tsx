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

export interface ShopListPageProps {
  shop: ShopData;
}

export default function ShopListPage({ shop }: ShopListPageProps) {
  const { metadata, breadcrumb, banner } = shop;
  const router = useRouter();

  const [productList] = useQueries({
    queries: [
      {
        queryKey: [`getProductList-${router.query.slug}`, { page: 1 }],
        queryFn: async ({ queryKey }: any) => await shopApi.getAllProducts(queryKey[1]),
        enabled: router.query.slug === 'all-products',
      },
    ],
  });

  const { data: productListData, isLoading } = productList;

  const handlePageChange = (value: number) => {
    console.log('>>>Page Change: ', value);
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
    populate: ['metadata.shareImage', 'breadcrumb.breadcrumbItem', 'banner.bannerImage'],
  });
  const shop = shopData.data.attributes;

  if (!shop) {
    return {
      notFound: true,
    };
  }

  return { props: { shop } };
};
