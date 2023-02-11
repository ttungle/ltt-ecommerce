import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Paper, Popper, Stack, Typography } from '@mui/material';
import { ContainedButton } from '../custom-button';

export interface ViewCartPopoverProps {
  open: boolean;
  onClose: () => void;
  anchorElCart: any;
  onPopoverViewCartClick: () => void;
}

export function ViewCartPopover(props: ViewCartPopoverProps) {
  const { open, onClose, anchorElCart, onPopoverViewCartClick } = props;
  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorElCart}
        placement='bottom-end'
        sx={{
          position: 'relative',
          zIndex: 10000,
        }}
      >
        <Paper elevation={3} sx={{ p: 2 }}>
          <Stack direction='row' alignItems='center' justifyContent='center' mb={2}>
            <CheckCircleIcon sx={{ color: 'success.light' }} />
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography textAlign='center' ml={1}>
                Add to cart successfully!
              </Typography>

              <IconButton onClick={onClose} sx={{ ml: 1, mt: -2, mr: -2 }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
          <ContainedButton fullWidth onClick={onPopoverViewCartClick}>
            View cart and checkout
          </ContainedButton>
        </Paper>
      </Popper>
    </>
  );
}
