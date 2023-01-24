import { ContainedButton } from '@/components/common/custom-button';
import { GLOBAL_PATHs } from '@/constant';
import { useAuthContext } from '@/contexts';
import { ProductReviewItemData, ShopDetailReviewSectionItemData } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ProductReviewForm } from './product-review-form';
import { ProductReviewItem } from './product-review-item';

export interface ProductReviewsProps {
  productReviewSectionData: ShopDetailReviewSectionItemData;
  productReviewsList: Array<ProductReviewItemData>;
  onReviewFormSubmit: (value: FieldValues) => void;
}

export function ProductReviews({
  productReviewSectionData,
  productReviewsList,
  onReviewFormSubmit,
}: ProductReviewsProps) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewPerPage, setReviewPerPage] = useState(() => 5);
  const [reviewData, setReviewData] = useState(() => productReviewsList.slice(0, reviewPerPage));

  const schema = yup
    .object({
      title: yup.string().required(`${productReviewSectionData.reviewFormTitleValidateMessage}`),
      reviewContent: yup
        .string()
        .required(`${productReviewSectionData.reviewFormContentValidateMessage}`),
      rating: yup
        .number()
        .typeError(`${productReviewSectionData.reviewFormRatingValidateMessage}`)
        .required(`${productReviewSectionData.reviewFormRatingValidateMessage}`),
    })
    .required();

  const form = useForm<FieldValues>({
    defaultValues: {
      title: '',
      rating: null,
      reviewContent: '',
      bottomLine: '',
      reviewer: null,
      product: null,
    },
    resolver: yupResolver(schema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  const reviewCount = useMemo(() => productReviewsList.length, [productReviewsList]);
  const reviewAverageRating = useMemo(
    () =>
      (
        productReviewsList.reduce((prev, curr) => prev + Number(curr?.attributes?.rating), 0) /
        reviewCount
      ).toFixed(1),
    [productReviewsList]
  );

  const handleShowMoreClick = () => {
    setReviewPerPage(reviewPerPage + reviewPerPage);
    setReviewData(productReviewsList.slice(0, reviewPerPage + reviewPerPage));
  };

  const handleAddReviewClick = () => {
    if (user?.id) {
      setOpenDialog(true);
    } else {
      router.push(GLOBAL_PATHs.login);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleReviewFormSubmit = async (values: FieldValues) => {
    if (!onReviewFormSubmit) return;
    const payload = {
      ...values,
      reviewer: user?.id,
    };
    await onReviewFormSubmit(payload);
    setOpenDialog(false);
    form.reset();
  };

  return (
    <>
      <Typography component='h5' fontSize='1.125rem' fontWeight={600} mt={22} mb={2}>
        {productReviewSectionData.title}
      </Typography>

      <Divider />

      <Stack direction='column' alignItems='center' py={5}>
        {reviewCount <= 0 && (
          <Typography textAlign='center' mb={5}>
            {productReviewSectionData.emptyReviewMessage}
          </Typography>
        )}

        {reviewCount > 0 && (
          <>
            <Typography fontSize='0.875rem'>{reviewAverageRating}</Typography>
            <Rating
              name='read-only'
              value={Number(reviewAverageRating)}
              size='medium'
              readOnly
              sx={{ my: 1.5, color: 'common.black' }}
            />
            <Typography>{`Based on ${reviewCount} ${
              reviewCount > 1 ? 'reviews' : 'review'
            }`}</Typography>

            <Typography mt={3} mb={1.5}>
              {productReviewSectionData.addReviewButtonLabel}
            </Typography>
          </>
        )}

        <ContainedButton onClick={handleAddReviewClick} sx={{ minWidth: '200px' }}>
          {productReviewSectionData.addReviewButtonTitle}
        </ContainedButton>
      </Stack>

      {reviewCount > 0 && <Divider />}

      {reviewCount > 0 && <ProductReviewItem reviewData={reviewData} />}

      {reviewCount > 0 && (
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <Button
            variant='contained'
            disabled={reviewData.length === reviewCount}
            onClick={handleShowMoreClick}
            sx={{ my: 5, fontWeight: 500 }}
          >
            {productReviewSectionData.showMoreButton}
            <ArrowDropDownIcon />
          </Button>
        </Stack>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <IconButton sx={{ marginLeft: 'auto' }} onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>

        <DialogTitle sx={{ mb: 1.5 }}>Review Information</DialogTitle>
        <DialogContent>
          <ProductReviewForm
            form={form}
            dialogLabelData={productReviewSectionData}
            onReviewFormSubmit={handleReviewFormSubmit}
          />
        </DialogContent>
        <DialogActions>
          <ContainedButton
            variant='contained'
            type='submit'
            form='product-review-form'
            fullWidth
            disabled={isSubmitting}
            sx={{ mb: 2, mx: 1.5, py: 1.5 }}
          >
            {isSubmitting ? <CircularProgress sx={{ color: 'common.white' }} /> : 'Submit Review'}
          </ContainedButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
