import { Button, Container, Typography } from '@mui/material';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import LeftSideBar from './LeftSideBar';
import NavBar from './NavBar';
import { Box } from '@mui/system';
import { theme } from './CustomTheme';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

export default function UserAccountPage() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userName: '',
  });

  const history = useHistory();

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromStorage == null || userFromStorage == 'undefined') {
      history.push('/');
    }
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const { firstName, lastName, email, phoneNumber, userName } = user;

  return (
    <>
      <NavBar className='navbar'></NavBar>
      <Box sx={{ display: 'flex', width: '100vw' }}>
        <LeftSideBar className='sideBar'></LeftSideBar>
        <Container>
          <ThemeProvider theme={theme}>
            <Grid
              sx={{
                display: 'flex',
                width: '100%%',
              }}>
              <Container
                sx={{
                  width: '70%',
                  paddingTop: '2%',
                  paddingBottom: '2%',
                  paddingLeft: '0%',
                }}>
                <Typography
                  variant='h1'
                  fontSize='3rem'
                  className='header'
                  color='secondary'>
                  Account overview
                </Typography>
                <div className='second-row'>
                  <Typography
                    variant='h2'
                    fontSize='1.5rem'
                    className='subheader'
                    padding
                    color='secondary'
                    sx={{ paddingTop: '3%', paddingLeft: '0%' }}>
                    Profile
                  </Typography>
                </div>
                <AccountDetail
                  label='First Name'
                  value={firstName}></AccountDetail>
                <AccountDetail
                  label='Last Name'
                  value={lastName}></AccountDetail>
                <AccountDetail label='Email' value={email}></AccountDetail>
                <AccountDetail
                  label='Phone Number'
                  value={phoneNumber}></AccountDetail>
                <AccountDetail
                  label='Username'
                  value={userName}></AccountDetail>
                <Button
                  className='editBtn'
                  variant='outlined'
                  color='secondary'
                  style={{
                    color: theme.palette.primary.dark,
                    border: '1px solid ' + theme.palette.primary.dark,
                  }}
                  sx={{ mr: 2, mt: 4, mb: 2, height: '3em' }}>
                  Update Profile
                </Button>
                <Button
                  className='editBtn'
                  variant='outlined'
                  color='secondary'
                  style={{
                    color: theme.palette.primary.dark,
                    border: '1px solid ' + theme.palette.primary.dark,
                  }}
                  sx={{ ml: 2, mt: 4, mb: 2, height: '3em' }}>
                  Change Password
                </Button>
              </Container>
            </Grid>
          </ThemeProvider>
        </Container>
      </Box>
    </>
  );
}

function AccountDetail(props) {
  return (
    <>
      <div className='accountdetail'>
        <label className='acctlabel1'>{props.label}</label>
        <label className='acctlabel2'>{props.value}</label>
      </div>
    </>
  );
}
