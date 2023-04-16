import { shopApi } from '@/api-client';
import { GLOBAL_PATHs } from '@/constant';
import { formatPrice, formatStringWithMaxLength, getStrapiMedia } from '@/utils';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
  debounce,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { forwardRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { CircularLoader } from '../loader';

export interface MobileSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export function MobileSearchDialog({ isOpen, onClose }: MobileSearchDialogProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<any>(undefined);

  const { data, isLoading } = useQuery({
    queryKey: ['search', filters],
    queryFn: async () => shopApi.getAllProducts(filters),
    enabled: Boolean(filters),
  });

  const handleCloseDialog = () => {
    if (!onClose) return;

    onClose();
  };

  const handleSearchChange = debounce((event: any) => {
    if (!`${event.target.value}`.trim()) return;

    const params = {
      filters: {
        name: {
          $containsi: `${event.target.value}`.trim(),
        },
      },
      pageSize: 12,
    };

    setFilters(params);
  }, 800);

  console.log(data);

  const handleSearchFormSubmit = (event: any) => {
    event.preventDefault();
  };

  const handleSearchItemClick = (value: string) => {
    if (!value) return;

    const params = {
      filters: {
        name: {
          $containsi: value,
        },
      },
    };

    router.push({ pathname: GLOBAL_PATHs.search, query: qs.stringify(params) });
  };

  return (
    <>
      <Dialog fullScreen open={isOpen} onClose={handleCloseDialog} TransitionComponent={Transition}>
        <DialogContent sx={{ pt: 5 }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography fontSize='1rem'>What are you looking for?</Typography>
            <IconButton onClick={handleCloseDialog}>
              <GrClose />
            </IconButton>
          </Stack>

          <Box component='form' mt={5} onSubmit={handleSearchFormSubmit}>
            <TextField
              label=''
              variant='standard'
              onChange={handleSearchChange}
              sx={{ width: '100%' }}
              InputProps={{
                endAdornment: (
                  <IconButton type='submit'>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>

          {!isLoading && Array.isArray(data?.data) && data?.data.length > 0 && (
            <Grid container pt={5} spacing={2}>
              {data?.data.map((item: any, index: number) => (
                <Grid key={index} item xs={6}>
                  <Box border='1px solid #eee' width={172} height={172} flexShrink={0}>
                    <Image
                      src={
                        getStrapiMedia(item?.attributes?.thumbnails?.data[0]?.attributes?.url) ?? ''
                      }
                      alt='product-thumbnail'
                      width={172}
                      height={172}
                      layout='responsive'
                    />
                  </Box>
                  <Typography
                    textAlign='center'
                    fontWeight={500}
                    pt={1}
                    onClick={() => handleSearchItemClick(item?.attributes?.name)}
                  >
                    {formatStringWithMaxLength(item?.attributes?.name, 50)}
                  </Typography>
                  <Typography textAlign='center' fontWeight={600} color='primary.main'>
                    {formatPrice(item?.attributes?.salePrice)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}

          {!isLoading && data?.data.length <= 0 && filters && (
            <Typography textAlign='center' mt={5}>
              There are no search results.
            </Typography>
          )}

          {isLoading && filters && <CircularLoader sx={{ mt: '50%' }} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
