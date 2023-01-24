import { Button, SxProps, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface OutLinedButtonProps extends ButtonProps {
  children: String;
  properties?: Object;
  sx?: SxProps;
  icon?: ReactNode;
  isDisabled?: boolean;
}

export function OutLinedButton(props: OutLinedButtonProps) {
  const { children, properties, sx, icon, isDisabled, ...resProps } = props;
  return (
    <Button
      variant='outlined'
      disabled={isDisabled}
      endIcon={icon || ''}
      {...properties}
      sx={{
        border: '1px solid',
        borderColor: 'common.white',
        color: 'common.white',
        '&:hover': {
          border: '1px solid',
          borderColor: 'primary.main',
          bgcolor: 'primary.main',
          color: 'common.white',
        },
        ...sx,
      }}
      {...resProps}
    >
      {children}
    </Button>
  );
}
