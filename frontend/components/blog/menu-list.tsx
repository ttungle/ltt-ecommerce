import { GLOBAL_PATHs } from '@/constant';
import { BlogCategoryData, BlogTagData } from '@/models';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export interface MenuListProps {
  blogCategory: BlogCategoryData;
  blogTag: BlogTagData;
}

export function MenuList({ blogCategory, blogTag }: MenuListProps) {
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    router.push(`/${GLOBAL_PATHs.blog}/${slug}`);
  };

  const handleTagClick = () => {};

  return (
    <Box p={2}>
      <Typography fontSize='1.5rem' fontWeight={700} fontFamily='Cormorant Garamond' mb={1}>
        Category
      </Typography>

      <Box ml={2}>
        {blogCategory.map((category) => (
          <Typography
            key={category.id}
            mb={1}
            fontWeight={400}
            onClick={() => handleCategoryClick(`${category?.attributes?.path}`)}
            sx={{
              cursor: 'pointer',
              color:
                router.query.category === category?.attributes?.path ? 'primary.main' : 'grey.600',
            }}
          >
            {category?.attributes?.name}
          </Typography>
        ))}
      </Box>

      <Typography fontSize='1.5rem' fontWeight={700} fontFamily='Cormorant Garamond' mb={1}>
        Tags
      </Typography>

      <Stack direction='row' justifyContent='flex-start' alignItems='center' flexWrap='wrap'>
        {blogTag.map((tag) => (
          <Button
            key={tag?.id}
            variant='outlined'
            onClick={handleTagClick}
            sx={{ textTransform: 'none', mr: 1, mb: 1, color: 'grey.600', borderColor: 'grey.300' }}
          >
            {tag?.attributes?.tagName}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
