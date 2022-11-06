import { IconButton, SxProps } from '@mui/material';

export interface CustomIconButtonProps {
  children: React.ReactNode;
  color: string;
  sx?: SxProps;
  properties?: Object;
  onClick?: () => void;
}

export function CustomIconButton(props: CustomIconButtonProps) {
  const { children, color, sx, properties, onClick = null } = props;
  const handleClick = () => {
    if (!onClick) return;
    onClick();
  };
  return (
    <IconButton
      {...properties}
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
    >
      {children}
    </IconButton>
  );
}
