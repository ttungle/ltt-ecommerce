import { shopApi } from '@/api-client';
import { GLOBAL_PATHs } from '@/constant';
import { formatStringWithMaxLength, getStrapiMedia } from '@/utils';
import theme from '@/utils/theme';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  ClickAwayListener,
  InputBase,
  Paper,
  Stack,
  Typography,
  alpha,
  debounce,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect, useState } from 'react';

export interface SearchBoxProps {}

export function SearchBox(props: SearchBoxProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<any>(undefined);
  const [isSearchSuggestionOpen, setIsSearchSuggestionOpen] = useState<boolean>(false);
  const [searchBoxWidth, setSearchBoxWidth] = useState('12ch');

  const { data } = useQuery({
    queryKey: ['search', filters],
    queryFn: async () => shopApi.getAllProducts(filters),
    enabled: Boolean(filters),
  });

  useEffect(() => {
    if (data?.data?.length > 0) {
      setIsSearchSuggestionOpen(true);
    } else {
      setIsSearchSuggestionOpen(false);
    }
  }, [data, filters]);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    if (!`${event.target[0]?.value}`.trim()) return;

    const params = {
      filters: {
        name: {
          $containsi: `${event.target[0]?.value}`.trim(),
        },
      },
    };

    setIsSearchSuggestionOpen(false);
    router.push({ pathname: GLOBAL_PATHs.search, query: qs.stringify(params) });
  };

  const handleSearchChange = debounce((event: any) => {
    if (!`${event.target.value}`.trim()) {
      setIsSearchSuggestionOpen(false);
      return;
    }

    const params = {
      filters: {
        name: {
          $containsi: `${event.target.value}`.trim(),
        },
      },
      pageSize: 6,
    };

    setFilters(params);
  }, 800);

  const handleSearchItemClick = (value: string) => {
    if (!value) return;

    const params = {
      filters: {
        name: {
          $containsi: value,
        },
      },
    };

    setIsSearchSuggestionOpen(false);
    router.push({ pathname: GLOBAL_PATHs.search, query: qs.stringify(params) });
  };

  const handleSearchSuggestionClickAway = () => {
    setSearchBoxWidth('12ch');
    setIsSearchSuggestionOpen(false);
  };

  const handleSearchBoxFocus = () => {
    setSearchBoxWidth('15vw');
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          borderRadius: '2px',
          backgroundColor: alpha(theme.palette.common.black, 0.06),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.1),
          },
          marginLeft: 0,
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
          },
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SearchIcon />
        </Box>
        <Box component='form' id='search-form' onSubmit={handleFormSubmit}>
          <InputBase
            placeholder='Search…'
            onChange={handleSearchChange}
            onFocus={handleSearchBoxFocus}
            onBlur={() => (isSearchSuggestionOpen ? null : setSearchBoxWidth('12ch'))}
            sx={{
              '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: { sm: searchBoxWidth, xs: '100%' },
              },
            }}
          />
        </Box>

        {isSearchSuggestionOpen && (
          <ClickAwayListener onClickAway={handleSearchSuggestionClickAway}>
            <Box sx={{ position: 'absolute', top: '105%', left: 0, right: 0 }}>
              <Paper elevation={1} sx={{ pt: 1 }}>
                {data?.data.slice(0, 6).map((item: any, index: number) => (
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='flex-start'
                    key={index}
                    px={2}
                    py={1.5}
                    sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.15)' } }}
                  >
                    <Box border='1px solid #ccc' width={50} height={50} flexShrink={0}>
                      <Image
                        src={
                          getStrapiMedia(item?.attributes?.thumbnails?.data[0]?.attributes?.url) ??
                          ''
                        }
                        alt='product-thumbnail'
                        width={50}
                        height={50}
                        layout='responsive'
                      />
                    </Box>
                    <Typography
                      textAlign='left'
                      fontWeight={500}
                      pl={2}
                      onMouseDown={() => setSearchBoxWidth('15vw')}
                      onClick={() => handleSearchItemClick(item?.attributes?.name)}
                    >
                      {formatStringWithMaxLength(item?.attributes?.name, 50)}
                    </Typography>
                  </Stack>
                ))}

                <Button
                  type='submit'
                  form='search-form'
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  <Typography fontWeight={500} p={1.2}>
                    View all results
                  </Typography>
                </Button>
              </Paper>
            </Box>
          </ClickAwayListener>
        )}
      </Box>
    </>
  );
}
