import { HomeCategoryImageData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box, Button, Grid, Stack, SxProps, keyframes } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface CategoryImageListProps {
  categoryList: Array<HomeCategoryImageData>;
  layout: number;
  spacing: number;
  height?: any;
  sx?: SxProps;
}

const shakeCategoryKeyframe = keyframes` 0%,
100% {
  -webkit-transform: translateX(0);
          transform: translateX(0);
}
10%,
30%,
50%,
70% {
  -webkit-transform: translateX(-6px);
          transform: translateX(-6px);
}
20%,
40%,
60% {
  -webkit-transform: translateX(6px);
          transform: translateX(6px);
}
80% {
  -webkit-transform: translateX(4px);
          transform: translateX(4px);
}
90% {
  -webkit-transform: translateX(-4px);
          transform: translateX(-4px);
}`;

export function CategoryImageList(props: CategoryImageListProps) {
  const { categoryList, layout, spacing, height, sx = {} } = props;
  const router = useRouter();

  const handleButtonClick = (path: string | null) => {
    if (!path) return;
    router.push(path);
  };

  return (
    <>
      <Grid container spacing={spacing} sx={{ ...sx }}>
        {categoryList.map((category) => (
          <Grid item key={category.id} lg={layout} xs={12} sx={{ position: 'relative' }}>
            <Link href={category?.path ?? '#'}>
              <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    animation: `${shakeCategoryKeyframe} 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
                  },
                }}
              >
                <Box
                  component='img'
                  src={getStrapiMedia(category?.image?.data?.attributes?.url) ?? ''}
                  alt='home-category'
                  width={'100%'}
                  height={height ?? 'auto'}
                />
              </Stack>
            </Link>
            {category?.buttonText && (
              <Button
                variant='contained'
                onClick={() => handleButtonClick(category?.path)}
                sx={{
                  position: 'absolute',
                  bottom: '-3%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  textTransform: 'capitalize',
                  fontSize: '0.875rem',
                }}
              >
                {category?.buttonText}
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
