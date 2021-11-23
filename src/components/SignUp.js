import * as React from 'react';

//Materials UI Imports
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//Other functional imports
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { theme } from './CustomTheme';

export default function SignUp() {
  const history = useHistory();

  const initialErrorState = {
    firstNameErr: '',
    lastNameErr: '',
    phoneNumberErr: '',
    emailErr: '',
    userNameErr: '',
    passwordErr: '',
    confirmPasswordErr: '',
  };

  const [errorObject, setErrors] = useState(initialErrorState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //Create userSignUp object that stores information from the click event and destructure that object into working parameters
    const userSignUp = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      phoneNumber: data.get('phoneNumber'),
      email: data.get('email').toLowerCase(),
      userName: data.get('userName'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
    };

    const {
      lastName,
      firstName,
      phoneNumber,
      email,
      userName,
      password,
      confirmPassword,
    } = userSignUp;

    /*Create a promise that checks the following:
      1. Fields are not blank
      2. Passwords are the same and not blank
      3. Username, Phone Number, and Email are all valid / useable

      If any of these fail, reject the promise
      Else return a pass and load the next screen which is the UserAccountPage. */

    // Check if any fields are blank, if so, inform the user that the form needs to be filled in
    for (let userInput in userSignUp) {
      const errorName = userInput + 'Err';
      if (userSignUp[userInput].localeCompare('') === 0) {
        errorObject[errorName] = 'This field cannot be blank';
        setErrors({ ...errorObject });
      }
    }

    // Check if passwords don't match and set password error below password textfields.
    if (password.localeCompare(confirmPassword) !== 0) {
      setErrors({
        ...errorObject,
        passwordErr: "Passwords don't match",
        confirmPasswordErr: "Passwords don't match",
      });
    }

    //Checks if passwords are the same and have values, then remove error warnings
    else if (
      password.localeCompare(confirmPassword) === 0 &&
      password.localeCompare('') !== 0 &&
      confirmPassword.localeCompare('') !== 0
    ) {
      setErrors({
        ...errorObject,
        passwordErr: '',
        confirmPasswordErr: '',
      });

      //If the passwords match, send a post request to add a userprofile and user account
      //If it sends back an error, parse the error and display the error below the password field
      //Set up an error response UI component below the confirm password field

      console.log('sending post request.');
      setErrors({ ...errorObject });
      axios
        .post('/api/v1/spoc/profile/', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
        })
        .then((response) => {
          axios
            .post(
              'api/v1/spoc/account',
              {
                userName: userName,
                userPassword: password,
              },
              {
                params: {
                  email: email,
                },
              }
            )
            .then((response) => {
              console.log(response.status);
              const user = {
                userName: userName,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
              };
              localStorage.setItem('user', JSON.stringify(user));
              history.push('/account/overview');
            });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <img
            className='logoSmall'
            src='/images/SpOcTexter-logos_transparent_cropped.png'
            alt='image'></img>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  helperText={errorObject.firstNameErr}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  helperText={errorObject.lastNameErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // error variant
                  required
                  fullWidth
                  id='phoneNumber'
                  label='Phone Number'
                  name='phoneNumber'
                  autoComplete='phoneNumber'
                  helperText={errorObject.phoneNumberErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  helperText={errorObject.emailErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='userName'
                  label='Username'
                  id='userName'
                  autoComplete='username'
                  helperText={errorObject.userNameErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  helperText={errorObject.passwordErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  autoComplete='new-password'
                  helperText={errorObject.confirmPasswordErr}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
