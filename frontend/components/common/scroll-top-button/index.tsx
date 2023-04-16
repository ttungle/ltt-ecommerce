import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdVerticalAlignTop } from 'react-icons/md';

export interface ScrollTopButtonProps {}

export function ScrollTopButton(props: ScrollTopButtonProps) {
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 150) {
        setScrollTop(true);
      }

      if (scrolled <= 150) {
        setScrollTop(false);
      }
    });
  }, []);

  const handleScrollToTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {scrollTop && (
        <IconButton
          onClick={handleScrollToTopClick}
          sx={{
            display: { lg: 'block', xs: 'none' },
            position: 'fixed',
            zIndex: 10000,
            bottom: '24px',
            right: '24px',
            width: 48,
            height: 48,
            borderRadius: '2px',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            '&:hover': {
              bgcolor: 'primary.main',
            },
          }}
        >
          <MdVerticalAlignTop style={{ color: '#fff', fontSize: '1.75rem' }} />
        </IconButton>
      )}
    </>
  );
}
