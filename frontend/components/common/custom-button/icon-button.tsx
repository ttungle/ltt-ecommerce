import { ButtonProps, IconButton, SxProps } from '@mui/material';

export interface CustomIconButtonProps extends ButtonProps {
  children: React.ReactNode;
  color: any;
  sx?: SxProps;
  onClick?: (event?: any) => void;
}

export function CustomIconButton(props: CustomIconButtonProps) {
  const { children, color, sx, onClick = null, ...restProps } = props;
  const handleClick = (event?: any) => {
    if (!onClick) return;
    onClick(event);
  };
  return (
    <IconButton
      onClick={handleClick}
      sx={{
        border: '1px solid',
        borderRadius: '2px',
        borderColor: color,
        color,
        fontSize: '0.75rem',
        '&:hover': {
          color: 'common.white',
          bgcolor: 'common.black',
          borderColor: 'common.black',
        },
        ...sx,
      }}
      {...restProps}
    >
      {children}
    </IconButton>
  );
}
