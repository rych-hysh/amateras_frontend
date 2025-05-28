import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/use-auth';

interface UserAccountMenuProps {
  isAuthenticated: boolean;
}

export function UserAccountMenu({ isAuthenticated }: UserAccountMenuProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path: string) => {
    setAnchorEl(null);
    if(path === "/charts") signOut();
    navigate(path)
  };

  if (!isAuthenticated) return null;

  return (
    <div className='accountCircle'>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle fontSize='large'/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose.bind(null, '/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleClose.bind(null, '/charts')}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}