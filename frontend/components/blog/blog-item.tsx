import { GLOBAL_PATHs } from '@/constant';
import { BlogData } from '@/models';
import { formatStringWithMaxLength, getStrapiMedia } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HiOutlineUser } from 'react-icons/hi';
import { OutlinedBlackButton } from '../common/custom-button/outlined-black-button';

export interface BlogItemProps {
  blogData: BlogData;
}

export function BlogItem({ blogData }: BlogItemProps) {
  const router = useRouter();
  const { attributes: data } = blogData;

  const handleBlogClick = () => {
    router.push(`/${GLOBAL_PATHs.blogDetail}/${data?.path}?id=${blogData.id}`);
  };

  return (
    <Box mb={7}>
      <Box
        onClick={handleBlogClick}
        sx={{
          border: '1px solid',
          borderColor: 'grey.100',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <Image
          src={getStrapiMedia(data?.thumbnail?.data?.attributes?.url) ?? ''}
          alt='blog-img'
          width='1030px'
          height='645px'
          layout='responsive'
        />
      </Box>

      <Box my={3}>
        <Typography
          onClick={handleBlogClick}
          fontFamily='Cormorant Garamond'
          fontWeight={600}
          fontSize='2.25rem'
          textTransform='uppercase'
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {data?.title}
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
            {data?.author}
          </Typography>
        </Stack>
        <Typography sx={{ color: 'text.secondary' }}>
          {formatStringWithMaxLength(data?.content, 255)}
        </Typography>
      </Box>

      <OutlinedBlackButton onClick={handleBlogClick} sx={{ py: 1.3 }}>
        {router.locale === 'vi' ? 'Xem Thêm' : 'Read More'}
      </OutlinedBlackButton>
    </Box>
  );
}
