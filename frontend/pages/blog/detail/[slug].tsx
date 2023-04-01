import { blogApi } from '@/api-client/blog-api';
import { BlogContent } from '@/components/blog/blog-content';
import { MenuList } from '@/components/blog/menu-list';
import { getStrapiMedia } from '@/utils';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiOutlineUser } from 'react-icons/hi';

export interface BlogListPageProps {}

export default function BlogListPage(props: BlogListPageProps) {
  const router = useRouter();
  const { data: blogCategory } = useQuery({
    queryKey: ['getBlogCategory'],
    queryFn: async () => await blogApi.getAllBlogCategories(),
  });

  const { data: blogTag } = useQuery({
    queryKey: ['getBlogTag'],
    queryFn: async () => await blogApi.getAllBlogTags(),
  });

  const { data: blogDetails } = useQuery({
    queryKey: ['getBlogDetails', router.query.id],
    queryFn: async () => await blogApi.getBlog(router.query.id as string),
  });

  return (
    <Container>
      <Stack direction='column' justifyContent='center' alignItems='center' mt={5}>
        <Typography fontWeight={600} sx={{ color: 'primary.main' }}>
          {blogDetails?.data?.attributes?.blogCategory?.data?.attributes.name}
        </Typography>
        <Typography
          fontFamily='Cormorant Garamond'
          fontWeight={600}
          fontSize='2.25rem'
          textTransform='uppercase'
        >
          {blogDetails?.data?.attributes?.title}
        </Typography>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          sx={{
            mb: 2.5,
            color: 'text.secondary',
            cursor: 'pointer',
          }}
        >
          <HiOutlineUser style={{ fontSize: '1.25rem' }} />
          <Typography ml={1} fontSize='0.813rem' sx={{ '&:hover': { color: 'primary.main' } }}>
            {blogDetails?.data?.attributes?.author}
          </Typography>
        </Stack>
      </Stack>

      <Grid container spacing={5} mt={0}>
        <Grid item lg={3}>
          <MenuList blogCategory={blogCategory?.data ?? []} blogTag={blogTag?.data ?? []} />
        </Grid>
        <Grid item lg={9}>
          <Box mb={3}>
            <Image
              src={
                getStrapiMedia(
                  blogDetails?.data?.attributes?.thumbnail?.data?.attributes?.url ?? ''
                ) ?? ''
              }
              alt='blog-detail-image'
              width={blogDetails?.data?.attributes?.thumbnail?.data?.attributes?.width ?? 1030}
              height={blogDetails?.data?.attributes?.thumbnail?.data?.attributes?.height ?? 800}
              layout='responsive'
            />
          </Box>

          {blogDetails?.data && <BlogContent contentData={blogDetails?.data?.attributes} />}
        </Grid>
      </Grid>
    </Container>
  );
}
