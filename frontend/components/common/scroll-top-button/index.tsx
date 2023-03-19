import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
            position: 'fixed',
            zIndex: 10000,
            bottom: '24px',
            right: '24px',
            p: { lg: 1.25, xs: 1 },
            bgcolor: 'rgba(0, 0, 0, 0.25)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <MdVerticalAlignTop style={{ color: '#fff', fontSize: '2rem' }} />
        </IconButton>
      )}
    </>
  );
}
