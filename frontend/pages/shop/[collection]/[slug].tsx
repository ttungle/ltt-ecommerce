import { shopApi } from '@/api-client';
import { BannerImage } from '@/components/common/banner';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { ProductList } from '@/components/common/products';
import {
  ProductPagination,
  ShopActionBar,
  ShopFiltersDrawer,
  ShopFilterViewer,
} from '@/components/shop';
import { ProductFiltersValue, ShopData } from '@/models';
import { fetchAPI } from '@/utils';
import { Container } from '@mui/material';
import { useQueries } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useCallback, useMemo, useRef, useState } from 'react';

export interface ShopListPageProps {
  shop: ShopData;
}

export default function ShopListPage({ shop }: ShopListPageProps) {
  const { metadata, breadcrumb, banner, productListPageSize, sortTypeList, multipleFilterList } =
    shop;

  const router = useRouter();
  const currentQueryRef = useRef<any>();
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [layoutValue, setLayoutValue] = useState('4');

  const queryParams = useMemo(() => {
    const { collection, slug, ...rest } = router.query;
    currentQueryRef.current = { ...router.query };
    return {
      ...rest,
      page: (router.query.page || 1).toString(),
      pageSize: (productListPageSize || 15).toString(),
      sort: router.query.sort || ['updatedAt:desc'],
      ...(router?.query?.filters && { filters: qs.parse(router.query.filters + '') }),
    };
  }, [router.query, productListPageSize]);

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

  const handleToggleFiltersDrawer = useCallback((open: boolean) => {
    setShowFiltersDrawer(open);
  }, []);

  const handlePageChange = useCallback((value: number) => {
    const currentPath = router.pathname;
    currentQueryRef.current.page = value.toString();

    router.push({
      pathname: currentPath,
      query: currentQueryRef.current,
    });
  }, []);

  const handleSortChange = useCallback((value: string) => {
    const sortParams = [];
    const currentPath = router.pathname;
    sortParams.push(value);
    currentQueryRef.current.sort = sortParams;

    router.push({
      pathname: currentPath,
      query: currentQueryRef.current,
    });
  }, []);

  const handleFiltersChange = useCallback((value: ProductFiltersValue | undefined) => {
    const currentPath = router.pathname;
    let filterParams = { ...value };

    if (Object.keys(filterParams).length !== 0) {
      currentQueryRef.current.page = '1';
      currentQueryRef.current.filters = qs.stringify(filterParams);
    } else {
      delete currentQueryRef.current.filters;
    }

    router.push({
      pathname: currentPath,
      query: currentQueryRef.current,
    });
  }, []);

  const handleLayoutChange = useCallback((value: string) => {
    setLayoutValue(value);
  }, []);

  return (
    <>
      <BannerImage banner={banner} />
      <Container>
        <Breadcrumb breadcrumb={breadcrumb} />
        <ShopActionBar
          productPagination={productListData?.meta?.pagination ?? {}}
          sortTypeList={sortTypeList}
          layoutValue={layoutValue}
          onSortChange={handleSortChange}
          onLayoutChange={handleLayoutChange}
          onToggleFilterDrawer={handleToggleFiltersDrawer}
        />

        <ShopFilterViewer filters={queryParams?.filters} onChange={handleFiltersChange} />

        {!isLoading && (
          <>
            <ProductList productsData={productListData?.data ?? []} grid={Number(layoutValue)} />
            <ProductPagination
              pagination={productListData?.meta?.pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Container>

      <ShopFiltersDrawer
        showFiltersDrawer={showFiltersDrawer}
        multipleFilterList={multipleFilterList}
        onFiltersChange={handleFiltersChange}
        onToggleFiltersDrawerClick={handleToggleFiltersDrawer}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const shopData = await fetchAPI('/shop', {
    populate: [
      'metadata.shareImage',
      'banner.bannerImage',
      'breadcrumb.breadcrumbItem',
      'productListPageSize',
      'sortTypeList.sortTypeItem',
      'multipleFilterList.labelAndValue',
      'multipleFilterList.multipleFilterByImages.filterItemImage',
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
