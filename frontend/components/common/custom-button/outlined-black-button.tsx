import { Button, SxProps } from '@mui/material';
import * as React from 'react';

export interface OutlinedBlackButtonProps {
  children: React.ReactNode;
  onClick?: (event?: any) => void;
  sx?: SxProps;
}

export function OutlinedBlackButton({ children, onClick, sx }: OutlinedBlackButtonProps) {
  const handleButtonClick = (event: any) => {
    if (!onClick) return;

    onClick(event);
  };

  return (
    <>
      <Button
        variant='outlined'
        onClick={handleButtonClick}
        sx={{
          px: 3,
          py: 1,
          borderWidth: '1px',
          fontWeight: 400,
          fontSize: '0.688rem',
          letterSpacing: '0.16rem',
          color: 'text.primary',
          borderColor: 'text.primary',
          '&:hover': {
            bgcolor: 'primary.main',
            color: 'common.white',
          },
          ...sx,
        }}
      >
        {children}
      </Button>
    </>
  );
}
