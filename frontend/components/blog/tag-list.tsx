import { BlogTagData } from '@/models';
import { Button, Stack } from '@mui/material';

export interface TagListProps {
  tagListData: BlogTagData;
}

export function TagList({ tagListData }: TagListProps) {
  const handleTagClick = () => {};

  return (
    <Stack direction='row' justifyContent='flex-start' alignItems='center' flexWrap='wrap'>
      {tagListData.map((tag) => (
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
  );
}
