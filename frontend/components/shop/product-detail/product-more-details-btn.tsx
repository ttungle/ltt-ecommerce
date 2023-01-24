import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, Typography } from '@mui/material';

export interface ProductMoreDetailButtonProps {}

export function ProductMoreDetailButton(props: ProductMoreDetailButtonProps) {
  return (
    <Link
      href='#product-details'
      color='text.primary'
      underline='none'
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        ':hover': { color: 'primary.main' },
      }}
    >
      <MoreVertIcon sx={{ fontSize: '1.2rem' }} />
      <Typography my={3}>More Details</Typography>
    </Link>
  );
}
