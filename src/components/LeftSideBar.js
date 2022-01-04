import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import { theme } from './CustomTheme';
import { ThemeProvider } from '@emotion/react';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import { useEffect, useState } from 'react';
import { baseURL } from './SignIn';
import axios from 'axios';
import { useGlobalContext } from './context';

const drawerWidth = '17.5vw';
const getUserAcctURL = baseURL + 'api/v1/spoc/account/username=';
const sideBarLinks = [
  '/account/overview',
  '/account/friends',
  '/account/occasions',
  '/account/texts',
];

export default function LeftSideBar() {
  const { openModal } = useGlobalContext();
  const [testTextSent, setTestTextSent] = useState(true);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios
      .get(getUserAcctURL + user.username, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setTestTextSent(res.data.hasTestedText);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            {testTextSent == false ? (
              <>
                <ListItem button onClick={openModal}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <SendToMobileIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Send a Test'}></ListItemText>
                </ListItem>
              </>
            ) : null}
          </List>
        </Box>
      </ThemeProvider>
    </>
  );
}
