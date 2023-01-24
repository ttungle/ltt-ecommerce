import { SizeSelectionItemData } from '@/models';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form/dist/types';
import { SelectionField } from '../../common/form-controls';

export interface ProductSizeSelectionProps {
  sizeSelectionListData: Array<SizeSelectionItemData>;
  form: UseFormReturn<FieldValues, object>;
  label: string;
  name: string;
  placeholder: string;
}

export function ProductSizeSelection(props: ProductSizeSelectionProps) {
  const { form, label, name, placeholder, sizeSelectionListData = [] } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => form.getValues('size') || '');

  useEffect(() => {
    setValue(form.getValues('size') || '');
  }, [form, open]);

  const handleOpenDialogClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography mr={2} flexShrink={0} fontSize='0.875rem' fontWeight='500'>
          {label}
        </Typography>

        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography fontSize={{ md: '0.875rem', xs: '0.75rem' }} flexShrink={0} mr={2}>
            {Boolean(value) ? value : sizeSelectionListData[0]?.title ?? ''}
          </Typography>
          <IconButton onClick={handleOpenDialogClick}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Stack>

        <Dialog
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          sx={{ '& .MuiPaper-root': { py: 1, px: { md: 2, xs: 0 } } }}
        >
          <DialogTitle fontSize={{ md: '1rem', xs: '0.875rem' }}>{label}</DialogTitle>
          <DialogContent>
            <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <SelectionField
                data={sizeSelectionListData}
                form={form}
                label=''
                name={name}
                placeholder={placeholder}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ fontSize: '0.875rem' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
