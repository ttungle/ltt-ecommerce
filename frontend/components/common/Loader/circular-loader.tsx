import { Box, CircularProgress, Typography } from '@mui/material';

export interface CircularLoaderProps {
  loaderContent?: string;
}

export function CircularLoader({ loaderContent }: CircularLoaderProps) {
  return (
    <Box
      flexGrow={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 1 }}>{loaderContent}</Typography>
    </Box>
  );
}
