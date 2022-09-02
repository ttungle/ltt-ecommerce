import { Button, SxProps } from '@mui/material';
import { ReactNode } from 'react';

export interface OutLinedButtonProps {
  children: String;
  properties?: Object;
  css?: SxProps;
  icon?: ReactNode;
  isDisabled?: boolean;
}

export function OutLinedButton(props: OutLinedButtonProps) {
  const { children, properties, css, icon, isDisabled } = props;
  return (
    <Button
      variant='outlined'
      disabled={isDisabled}
      endIcon={icon || ''}
      {...properties}
      sx={{
        border: '2px solid',
        borderColor: 'common.white',
        color: 'common.white',
        '&:hover': {
          border: '2px solid',
          borderColor: 'primary.main',
          bgcolor: 'primary.main',
        },
        ...css,
      }}
    >
      {children}
    </Button>
  );
}
