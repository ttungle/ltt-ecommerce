import { DeliveryMethodData } from '@/models';
import { ToggleButton } from '@mui/material';
import { BiStore } from 'react-icons/bi';
import { CiDeliveryTruck } from 'react-icons/ci';

export interface DeliveryMethodToggleProps {
  selected: DeliveryMethodData;
  onSelected: (value: DeliveryMethodData) => void;
}

export function DeliveryMethodToggle({ selected, onSelected }: DeliveryMethodToggleProps) {
  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    if (!onSelected) return;
    onSelected(value);
  };

  return (
    <>
      <ToggleButton
        color='primary'
        value='store'
        selected={selected === 'store'}
        onChange={handleToggleChange}
        sx={{
          px: 2.3,
          '&.Mui-selected': { border: '1px solid', borderColor: 'primary.main' },
        }}
      >
        <BiStore style={{ marginRight: '8px', fontSize: '1.5rem' }} />
        Store
      </ToggleButton>

      <ToggleButton
        color='primary'
        value='delivery'
        selected={selected === 'delivery'}
        onChange={handleToggleChange}
        sx={{
          ml: 2,
          '&.Mui-selected': { border: '1px solid', borderColor: 'primary.main' },
        }}
      >
        <CiDeliveryTruck style={{ marginRight: '8px', fontSize: '1.5rem' }} />
        Delivery
      </ToggleButton>
    </>
  );
}
