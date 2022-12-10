import { Grid, Skeleton, Stack } from '@mui/material';

export interface ProductListSkeletonProps {
  quantity: number;
  grid: number;
}

export function ProductListSkeleton({ quantity = 9, grid = 4 }: ProductListSkeletonProps) {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(quantity)).map((item, index) => (
        <Grid item key={index} md={grid} xs={12} sm={6} mb={5}>
          <Skeleton
            variant='rectangular'
            height={480}
            sx={{ margin: 'auto', maxWidth: 480, minWidth: 230 }}
          />

          <Stack direction='column' justifyContent='center' alignItems='center' sx={{ pt: 0.5 }}>
            <Skeleton width='60%' height={30} />
            <Skeleton width='30%' />
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
