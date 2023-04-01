import { BlogDataContent } from '@/models';
import { Box, Stack, Typography } from '@mui/material';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { TagList } from './tag-list';
import { getStrapiMedia } from '@/utils';

export interface BlogContentProps {
  contentData: BlogDataContent;
}

export function BlogContent({ contentData }: BlogContentProps) {
  return (
    <Box mb={5} sx={{ lineHeight: 1.5, '& img': { width: '100%' } }}>
      <ReactMarkdown
        transformImageUri={(src) => {
          return getStrapiMedia(`/uploads${src.split('/uploads')[1]}`) ?? src;
        }}
      >
        {contentData?.content}
      </ReactMarkdown>

      <Stack direction='row' alignItems='center' justifyContent='flex-start' mt={5}>
        <Typography mr={1}>Tags:</Typography>
        <TagList tagListData={contentData?.blogTags?.data} />
      </Stack>
    </Box>
  );
}
