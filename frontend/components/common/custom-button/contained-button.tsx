import { Button, ButtonProps, SxProps } from '@mui/material';

export interface ContainedButtonProps extends ButtonProps {
  children: React.ReactNode;
  properties?: Object;
  sx?: SxProps;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function ContainedButton(props: ContainedButtonProps) {
  const { children, properties, icon, sx, isDisabled, onClick, ...resProps } = props;

  const handleClick = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <Button
      disabled={isDisabled}
      {...properties}
      endIcon={icon || ''}
      variant='contained'
      onClick={handleClick}
      sx={{ borderRadius: '2px', bgcolor: 'common.black', color: 'common.white', ...sx }}
      {...resProps}
    >
      {children}
    </Button>
  );
}
