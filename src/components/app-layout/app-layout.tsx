import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { MainContent } from '../main-content/main-content';
import { useAuth } from '../../auth/use-auth';
import { TopAppBar } from '../top-app-bar/top-app-bar';
import { NavigationDrawer } from '../navigation/navigation-drawer';

import './app-layout.scss';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export function AppLayout() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopAppBar 
        open={open} 
        onMenuClick={handleDrawerOpen} 
        isAuthenticated={isAuthenticated} 
      />
      <NavigationDrawer open={open} onClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        <MainContent />
      </Box>
    </Box>
  );
}