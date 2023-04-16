import { LinkData } from '@/models';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { IoClose } from 'react-icons/io5';
import { Url } from 'url';

export interface DrawerContentProps {
  navigationLinks: Array<Partial<LinkData>>;
  onDrawerToggle: () => void;
}

export function DrawerContent({ navigationLinks, onDrawerToggle }: DrawerContentProps) {
  const router = useRouter();
  const handleDrawerToggle = () => {
    if (!onDrawerToggle) return;

    onDrawerToggle();
  };

  const handleItemClick = (href: string | null | undefined) => {
    if (!href) return;
    router.push(href);
    onDrawerToggle();
  };

  const activeNavItem = useCallback(
    (item: Partial<LinkData>) =>
      router.asPath === '/'
        ? router.asPath === `${item?.href}`
        : item?.href?.toString().includes(router.asPath.split('/')[1]),
    [router]
  );

  return (
    <Box>
      <Stack direction='row' justifyContent='flex-end' sx={{ bgcolor: 'primary.main' }}>
        <IconButton onClick={handleDrawerToggle} sx={{ position: 'relative', right: 0, p: 1.25 }}>
          <IoClose style={{ fontSize: '1.5rem', color: '#fff' }} />
        </IconButton>
      </Stack>
      <Divider />
      <List>
        {navigationLinks.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(item?.href as string)}
              sx={{
                textAlign: 'left',
                textTransform: 'uppercase',
                color: activeNavItem(item) ? 'primary.main' : 'text.primary',
              }}
            >
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
