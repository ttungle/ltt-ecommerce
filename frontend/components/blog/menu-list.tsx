import { GLOBAL_PATHs } from '@/constant';
import { BlogCategoryData, BlogTagData } from '@/models';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { TagList } from './tag-list';

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

      <TagList tagListData={blogTag} />
    </Box>
  );
}
