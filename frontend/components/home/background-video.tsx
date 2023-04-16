import { BackGroundVideoData } from '@/models';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface BackgroundVideoProps {
  backgroundVideoData: BackGroundVideoData;
}

export function BackgroundVideo({ backgroundVideoData }: BackgroundVideoProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!backgroundVideoData?.path) return;
    router.push(backgroundVideoData.path);
  };
  return (
    <>
      {backgroundVideoData && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { lg: '660px', xs: '428px' },
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            component='iframe'
            src={`${backgroundVideoData?.videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=9WpiS9R__18`}
            title='introduction-video'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: -2,
              minWidth: '100%',
              minHeight: '100vw',
              transform: 'translate(-50%, -50%)',
            }}
          ></Box>
          <Stack
            justifyContent='center'
            alignItems='center'
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              minWidth: '100%',
              minHeight: '100%',
              textAlign: 'center',
            }}
          >
            <Typography
              color='common.white'
              fontFamily='Cormorant Garamond'
              fontSize={{ lg: '4.375rem', xs: '2rem' }}
              fontWeight='600'
            >
              {backgroundVideoData?.title}
            </Typography>
            <Button
              variant='contained'
              sx={{ fontWeight: 500, letterSpacing: '0.16rem', py: 1, px: 3, mt: { lg: 0, xs: 2 } }}
              onClick={handleClick}
            >
              {backgroundVideoData?.buttonText}
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}
