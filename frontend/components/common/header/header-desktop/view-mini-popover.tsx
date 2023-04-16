import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Paper, Popper, Stack, Typography } from '@mui/material';
import { ContainedButton } from '../../custom-button';

export interface ViewMiniPopoverProps {
  open: boolean;
  onClose: () => void;
  anchorEl: any;
  onPopoverViewClick: () => void;
  message: string;
  buttonLabel: string;
}

export function ViewMiniPopover(props: ViewMiniPopoverProps) {
  const { open, anchorEl, message, buttonLabel, onClose, onPopoverViewClick } = props;
  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorEl}
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
                {message}
              </Typography>

              <IconButton onClick={onClose} sx={{ ml: 1, mt: -2, mr: -2 }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
          <ContainedButton fullWidth onClick={onPopoverViewClick}>
            {buttonLabel}
          </ContainedButton>
        </Paper>
      </Popper>
    </>
  );
}
