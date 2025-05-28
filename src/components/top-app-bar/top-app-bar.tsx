import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserAccountMenu } from '../user-account-menu/user-account-menu';
import useAuthenticatedFetch from "../../services/fetchService";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface TopAppBarProps {
  open: boolean;
  onMenuClick: () => void;
  isAuthenticated: boolean;
}

export function TopAppBar({ open, onMenuClick, isAuthenticated }: TopAppBarProps) {
  const { authedFetch } = useAuthenticatedFetch();

  const handleDrawerOpen = () => {
    authedFetch("/users").then((res : any[]) => alert(res[0].username));
    onMenuClick();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ height: "5vh" }}>
        <Tooltip title="Menu">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>

        <Typography variant="h6" noWrap component="div">
          FX Chart
        </Typography>
        
        <UserAccountMenu isAuthenticated={isAuthenticated} />
      </Toolbar>
    </AppBar>
  );
}