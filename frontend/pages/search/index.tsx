import { shopApi } from '@/api-client';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { ProductList, ProductListSkeleton } from '@/components/common/products';
import { ProductPagination } from '@/components/shop';
import { Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useCallback, useMemo, useRef } from 'react';

export interface SearchResultPageProps {}

const breadcrumb = {
  id: 1,
  breadcrumbItem: [
    { id: 1, title: 'Home', path: '/', icon: '' },
    { id: 1, title: 'Search', path: '/search', icon: '' },
  ],
};

export default function SearchResultPage(props: SearchResultPageProps) {
  const router = useRouter();
  const currentQueryRef = useRef<any>();

  const params = useMemo(() => ({ ...qs.parse(router.query as any), pageSize: 9 }), [router]);

  const searchResultQuery = useQuery({
    queryKey: ['search-result', params],
    queryFn: async () => shopApi.getAllProducts(params),
  });

  const { data, isLoading, isError } = searchResultQuery;

  const handlePageChange = useCallback((value: number) => {
    const currentPath = router.pathname;
    currentQueryRef.current = { ...params };
    currentQueryRef.current.page = value.toString();

    router.push({
      pathname: currentPath,
      query: currentQueryRef.current,
    });
  }, []);

  return (
    <Container>
      <Breadcrumb breadcrumb={breadcrumb} />
      <Typography fontSize='1rem' fontWeight={500} py={3}>
        {data?.meta?.pagination?.total ?? 0} results
      </Typography>

      {isLoading && <ProductListSkeleton quantity={9} grid={4} />}

      {!isLoading && (
        <>
          <ProductList productsData={data?.data ?? []} grid={4} />
          <ProductPagination pagination={data?.meta?.pagination} onPageChange={handlePageChange} />
        </>
      )}
    </Container>
  );
}
