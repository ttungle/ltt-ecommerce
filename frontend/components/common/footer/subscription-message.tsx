import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

export interface SubscriptionMessageProps {
  setShowSuccessSubscription: (e: boolean) => void;
}

export function SubscriptionMessage({ setShowSuccessSubscription }: SubscriptionMessageProps) {
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setShowSuccessSubscription(false);
    }, 3000);

    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <>
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          px: 1.5,
          py: 0.5,
          mt: 1.5,
          border: '2px solid',
          borderColor: 'success.light',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: '1rem', color: 'success.light' }} />
        <Typography sx={{ ml: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
          Thank you. It has been sent.
        </Typography>
      </Stack>
    </>
  );
}
