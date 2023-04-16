import { Box, CircularProgress, SxProps, Typography } from '@mui/material';

export interface CircularLoaderProps {
  loaderContent?: string;
  sx?: SxProps;
}

export function CircularLoader({ loaderContent, sx }: CircularLoaderProps) {
  return (
    <Box
      flexGrow={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 1 }}>{loaderContent}</Typography>
    </Box>
  );
}
