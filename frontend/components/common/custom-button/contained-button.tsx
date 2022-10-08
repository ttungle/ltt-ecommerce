import { Button, SxProps } from '@mui/material';

export interface ContainedButtonProps {
  children: React.ReactNode;
  properties?: Object;
  sx?: SxProps;
  icon?: React.ReactNode;
  isDisabled?: boolean;
}

export function ContainedButton(props: ContainedButtonProps) {
  const { children, properties, icon, sx, isDisabled } = props;
  return (
    <Button
      disabled={isDisabled}
      {...properties}
      endIcon={icon || ''}
      variant='contained'
      sx={{ borderRadius: '2px', ...sx }}
    >
      {children}
    </Button>
  );
}
