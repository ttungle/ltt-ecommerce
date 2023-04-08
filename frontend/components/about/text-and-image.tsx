import { CategoryListData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Box, Container, Grid, Typography } from '@mui/material';

export interface TextAndImageProps {
  contentData: CategoryListData;
  direction?: 'row' | 'row-reverse';
}

export function TextAndImage({ contentData, direction = 'row' }: TextAndImageProps) {
  const { backgroundColor, backgroundImage, description, homeCategoryImage, title } = contentData;

  return (
    <Box
      pt={12.5}
      sx={{
        background: backgroundImage?.data
          ? `url(${
              getStrapiMedia(backgroundImage?.data?.attributes?.url) ?? ''
            }) no-repeat center/cover`
          : `${backgroundColor}`,
      }}
    >
      <Container>
        <Grid container spacing={9} display='flex' alignItems='center' direction={direction}>
          <Grid item lg={6} xs={12}>
            <Typography fontFamily='Cormorant Garamond' fontSize='1.875rem' fontWeight={600} mb={2}>
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </Typography>
            <Typography color='text.secondary'>{description}</Typography>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid container>
              {Array.isArray(homeCategoryImage) && homeCategoryImage.length === 1 && (
                <Grid item lg={6} xs={12}>
                  <Box
                    component='img'
                    display='block'
                    mx='auto'
                    pb={12.5}
                    src={getStrapiMedia(homeCategoryImage[0]?.image?.data?.attributes?.url) ?? ''}
                    sx={{ '&:hover': { opacity: 0.8 } }}
                  ></Box>
                </Grid>
              )}

              {Array.isArray(homeCategoryImage) &&
                homeCategoryImage.length > 1 &&
                homeCategoryImage.map((item: any, index: number) => (
                  <Grid key={item.id} item lg={6} xs={12}>
                    {index === 0 && (
                      <Box
                        component='img'
                        display='block'
                        mx='auto'
                        src={getStrapiMedia(item?.image?.data?.attributes?.url) ?? ''}
                        sx={{ transform: 'translateY(65%)', '&:hover': { opacity: 0.8 } }}
                      ></Box>
                    )}

                    {index !== 0 && (
                      <Box
                        component='img'
                        display='block'
                        mx='auto'
                        pb={31.25}
                        src={getStrapiMedia(item?.image?.data?.attributes?.url) ?? ''}
                        sx={{ '&:hover': { opacity: 0.8 } }}
                      ></Box>
                    )}
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
