import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import { theme } from './CustomTheme';
import { ThemeProvider } from '@emotion/react';

//Unused imports from default SideBar
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = '17.5vw';
const sideBarLinks = [
  '/account/overview',
  '/account/friends',
  '/account/occasions',
  '/account/texts',
];

export default function LeftSideBar() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            width: drawerWidth,
          }}>
          <List
            sx={{
              bgcolor: theme.palette.primary.dark,
              color: 'white',
              minHeight: '100vh',
              height: '100%',
            }}>
            {['Account Overview', 'Friends', 'Occasions', 'Texts'].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  component='a'
                  href={sideBarLinks[index]}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    {index === 0 && <AccountCircleIcon />}
                    {index === 1 && <GroupIcon />}
                    {index === 2 && <EventIcon />}
                    {index === 3 && <MessageIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </ThemeProvider>
    </>
  );
}
