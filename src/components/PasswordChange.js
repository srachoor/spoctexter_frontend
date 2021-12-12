import * as React from 'react';

//Materials UI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

//Other functional imports
import axios from 'axios';
import { useHistory } from 'react-router';
import { theme } from './CustomTheme';
import NavBar from './NavBar';
import LeftSideBar from './LeftSideBar';
import { baseURL } from './SignIn';

const validatePWURL = baseURL + 'api/v1/spoc/account/pwusername=';
const changePWURL = baseURL + 'api/v1/spoc/account/pwchange=';

export default function PasswordChange() {
  const history = useHistory();

  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const { username } = userFromStorage;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const currentPassword = data.get('currentPassword');
    const newPassword = data.get('newPassword');
    const confirmNewPassword = data.get('confirmNewPassword');

    if (newPassword !== confirmNewPassword) {
      alert('Your new password must match the confirm new password field.');
    } else if (currentPassword === newPassword) {
      alert(
        'You must change your password to something different from your current password.'
      );
    } else {
      axios
        .get(validatePWURL + username, {
          params: {
            password: currentPassword,
          },
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data === true) {
            axios
              .put(changePWURL + username, null, {
                params: {
                  currentPassword: currentPassword,
                  newPassword: newPassword,
                },
                headers: {
                  Authorization: token,
                },
              })
              .then((res) => {
                console.log(res);
                window.confirm('Password has been updated.');
                history.push('/account/overview');
              })
              .catch((err) => {
                alert(err.response.data.message);
              });
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <>
      <NavBar className='navbar'></NavBar>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <LeftSideBar className='sideBar'></LeftSideBar>
        <Container className='container'>
          <ThemeProvider theme={theme}>
            <Box
              className='box'
              component='form'
              noValidate
              onSubmit={handleSubmit}>
              <Typography
                variant='h1'
                fontSize='3rem'
                className='header'
                color='secondary'
                sx={{ mb: 5, mt: 3 }}>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='currentPassword'
                    required
                    fullWidth
                    label='Current Password'
                    type='password'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='newPassword'
                    required
                    fullWidth
                    label='New Password'
                    type='password'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='confirmNewPassword'
                    required
                    fullWidth
                    label='Confirm New Password'
                    type='password'
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                className='editBtn'
                variant='outlined'
                color='secondary'
                fullWidth
                style={{
                  color: theme.palette.primary.dark,
                  border: '1px solid ' + theme.palette.primary.dark,
                }}
                sx={{ mt: 7, mb: 2, height: '3em' }}>
                Confirm Changes
              </Button>
            </Box>
          </ThemeProvider>
        </Container>
      </Box>
    </>
  );
}
