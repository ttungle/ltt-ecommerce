import { ContainedButton } from '@/components/common/custom-button/contained-button';
import { MenuListData } from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useRouter } from 'next/router';
import React from 'react';

export interface UserProfileMenuListProps {
  menuList: Array<MenuListData>;
  onDeleteAccount: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export function UserProfileMenuList({ menuList = [], onDeleteAccount }: UserProfileMenuListProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (path: string) => {
    router.push(path);
  };

  const handleDeleteAccount = async () => {
    if (!onDeleteAccount) return;
    await onDeleteAccount();
  };

  return (
    <>
      {menuList.map((item) => (
        <React.Fragment key={item?.id}>
          {item.color !== 'error' && (
            <Typography
              mb={2}
              fontSize='0.938rem'
              onClick={() => handleClick(item?.path)}
              sx={{
                cursor: 'pointer',
                color: item?.path.includes(router.query.slug as string)
                  ? 'text.primary'
                  : 'grey.600',
                fontWeight: item?.path.includes(router.query.slug as string) ? 'bold' : 400,
                '&:hover': { color: 'text.primary' },
              }}
            >
              {item?.name}
            </Typography>
          )}
        </React.Fragment>
      ))}

      <Divider />

      <Typography
        my={2}
        fontSize='0.938rem'
        onClick={handleClickOpen}
        sx={{
          cursor: 'pointer',
          color: menuList[2]?.color === 'error' ? 'error.main' : 'text.primary',
        }}
      >
        {menuList[2]?.name}
      </Typography>

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DialogTitle fontSize='1.5rem' fontWeight='600'>
          {"We're sorry to see you go"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Be advised, account deletion is final. There will be no way to restore your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction='row' alignItems='center' justifyContent='center'>
            <Button
              variant='contained'
              onClick={handleDeleteAccount}
              sx={{
                mt: 2,
                px: 2,
                mr: 2,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'error.main',
                },
              }}
            >
              Delete my account
            </Button>
            <ContainedButton
              onClick={handleClose}
              sx={{
                mt: 2,
                px: 2,
                bgcolor: 'common.black',
                color: 'common.white',
                fontWeight: 'bold',
              }}
            >
              Nevermind
            </ContainedButton>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
