import { blogApi } from '@/api-client/blog-api';
import { BlogItem } from '@/components/blog/blog-item';
import { MenuList } from '@/components/blog/menu-list';
import { ListPagination } from '@/components/shop';
import { Container, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef } from 'react';

export interface BlogListPageProps {}

const productListPageSize = 10;

export default function BlogListPage(props: BlogListPageProps) {
  const router = useRouter();
  const currentQueryRef = useRef<any>(null);

  const params = useMemo(() => {
    const { category, slug, ...rest } = router.query;
    currentQueryRef.current = { ...router.query };
    const filters = {
      blogCategory: {
        path: {
          $containsi: `${category}`,
        },
      },
    };

    return {
      ...rest,
      page: (router.query.page || 1).toString(),
      pageSize: (productListPageSize || 15).toString(),
      ...(category !== 'all' && { filters }),
    };
  }, [router.query]);

  const { data: blog } = useQuery({
    queryKey: ['getBlogList', params],
    queryFn: async () => blogApi.getAllBlogs(params),
  });

  const { data: blogCategory } = useQuery({
    queryKey: ['getBlogCategory'],
    queryFn: async () => await blogApi.getAllBlogCategories(),
  });

  const { data: blogTag } = useQuery({
    queryKey: ['getBlogTag'],
    queryFn: async () => await blogApi.getAllBlogTags(),
  });

  const handlePageChange = useCallback((value: number) => {
    const currentPath = router.pathname;
    currentQueryRef.current.page = value.toString();

    router.push({
      pathname: currentPath,
      query: currentQueryRef.current,
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={5} mt={5}>
        <Grid item lg={3}>
          <MenuList blogCategory={blogCategory?.data ?? []} blogTag={blogTag?.data ?? []} />
        </Grid>
        <Grid item lg={9}>
          {Array.isArray(blog?.data) && (
            <>
              {blog?.data.map((blog: any) => (
                <BlogItem key={blog.id} data={blog?.attributes} />
              ))}
              <ListPagination pagination={blog?.meta?.pagination} onPageChange={handlePageChange} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
