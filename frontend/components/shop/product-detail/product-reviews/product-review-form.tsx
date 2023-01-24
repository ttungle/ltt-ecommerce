import {
  CustomInputField,
  RatingField,
  RichTextField,
  SelectionField,
} from '@/components/common/form-controls';
import { ShopDetailReviewSectionItemData } from '@/models';
import { Box } from '@mui/material';
import { FieldValues } from 'react-hook-form';

export interface ProductReviewFormProps {
  form: any;
  dialogLabelData: ShopDetailReviewSectionItemData;
  onReviewFormSubmit: (values: FieldValues) => void;
}

export function ProductReviewForm({
  form,
  dialogLabelData,
  onReviewFormSubmit,
}: ProductReviewFormProps) {
  const { handleSubmit } = form;

  const handleFormSubmit = async (values: FieldValues) => {
    if (!onReviewFormSubmit) return;
    await onReviewFormSubmit(values);
  };

  return (
    <Box component='form' id='product-review-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <CustomInputField
        form={form}
        name='title'
        label=''
        placeholder={dialogLabelData?.reviewFormTitlePlaceholder}
        sx={{ mb: 2 }}
      />
      <RichTextField
        form={form}
        name='reviewContent'
        label=''
        placeholder={dialogLabelData?.reviewFormContentPlaceholder}
        sx={{ mb: 2 }}
      />
      <SelectionField
        form={form}
        name='bottomLine'
        label=''
        placeholder={dialogLabelData?.reviewFormBottomLinePlaceholder}
        data={[
          {
            id: 1,
            value: dialogLabelData?.reviewFormBottomLineValue,
            title: dialogLabelData?.reviewFormBottomLineValue,
            status: '',
          },
        ]}
        sx={{ width: '100%', mb: 2 }}
      />
      <RatingField
        form={form}
        name='rating'
        label={dialogLabelData?.reviewFormRatingLinePlaceholder}
      />
    </Box>
  );
}
