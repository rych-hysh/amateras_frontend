import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { TbChartCandle } from "react-icons/tb";
import { BsCalculator, BsCodeSlash } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

interface NavigationListProps {
  open: boolean;
}

export function NavigationList({ open }: NavigationListProps) {
  const navigate = useNavigate();

  const navTo = (path: any) => {
    navigate(path);
  }

  return (
    <>
      <List>
        <Tooltip title="Chart" placement='right'>
          <ListItem key="Charts" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={navTo.bind(null, '/charts')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <TbChartCandle fontSize="x-large" />
              </ListItemIcon>
              <ListItemText primary="Charts" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <Tooltip title="Simulator" placement='right'>
          <ListItem key="Simulator" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={navTo.bind(null, "/simulator")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <BsCalculator fontSize="x-large" />
              </ListItemIcon>
              <ListItemText primary="Simulator" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <Tooltip title="Algorythms" placement='right'>
          <ListItem key="Algorythm" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={navTo.bind(null, "/algorythm")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <BsCodeSlash fontSize="x-large" />
              </ListItemIcon>
              <ListItemText primary="Algorythm" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <Tooltip title="Notification" placement='right'>
          <ListItem key="Notification" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={navTo.bind(null, "/notification")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <IoMdNotifications fontSize="x-large" />
              </ListItemIcon>
              <ListItemText primary="Notification" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>

      <Divider />

      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={navTo.bind(null, index % 2 === 0 ? "/grid" : "grid2")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}