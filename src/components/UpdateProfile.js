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
import { CodeSharp } from '@mui/icons-material';
import { baseURL } from './SignIn';

const updateProfileURL = baseURL + 'api/v1/spoc/profile/update';
const getUserProfileURL = baseURL + 'api/v1/spoc/profile/email=';
const getUserAcctURL = baseURL + 'api/v1/spoc/account/email=';

export default function UpdateProfile() {
  const history = useHistory();

  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const { username, email, firstName, lastName, phoneNumber } = userFromStorage;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const updatedUserParams = {
      newPhoneNumber:
        data.get('phoneNumber') === phoneNumber ? '' : data.get('phoneNumber'),
      newFirstName:
        data.get('firstName') === firstName ? '' : data.get('firstName'),
      newLastName:
        data.get('lastName') === lastName ? '' : data.get('lastName'),
      newEmail: data.get('email') === email ? '' : data.get('email'),
      newUsername:
        data.get('username') === username ? '' : data.get('username'),
      currentEmail: email,
    };

    console.log(updatedUserParams);

    axios
      .put(updateProfileURL, null, {
        params: updatedUserParams,
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const newToken = res.headers.authorization;
        localStorage.setItem('token', newToken);
        const lookupEmail =
          data.get('email') === email ? email : data.get('email');
        axios
          .get(getUserProfileURL + lookupEmail, {
            headers: {
              Authorization: newToken,
            },
          })
          .then((res) => {
            console.log(res.data);
            const user = {
              email: res.data.email,
              phoneNumber: res.data.phoneNumber,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              username: '',
            };
            axios
              .get(getUserAcctURL + lookupEmail, {
                headers: {
                  Authorization: newToken,
                },
              })
              .then((resp) => {
                user.username = resp.data.username;
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/account/overview');
              })
              .catch((error) => alert(error.response.data.message));
            console.log(user);
          });
      })
      .catch((error) => alert(error.response.data.message));
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
                Update Profile
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    // id='firstName'
                    label='First Name'
                    defaultValue={firstName}
                    autoFocus
                    // helperText={errorObject.firstNameErr}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    // id='lastName'
                    label='Last Name'
                    name='lastName'
                    defaultValue={lastName}
                    autoComplete='family-name'
                    // helperText={errorObject.lastNameErr}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // error variant
                    required
                    fullWidth
                    // id='phoneNumber'
                    label='Phone Number'
                    name='phoneNumber'
                    defaultValue={phoneNumber}
                    autoComplete='phoneNumber'
                    // helperText={errorObject.phoneNumberErr}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    // id='email'
                    label='Email Address'
                    name='email'
                    type='email'
                    defaultValue={email}
                    autoComplete='email'
                    // helperText={errorObject.emailErr}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='username'
                    label='Username'
                    defaultValue={username}
                    autoComplete='username'
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
