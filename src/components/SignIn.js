// This is a sign-in page from material ui
// Users will input username and password which will get validated via Axios and the backend server

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { theme } from './CustomTheme';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: {
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
      error: {
        emailError: '',
        passwordError: '',
      },
    };
  }

  saveUser = async () => {
    localStorage.setItem('user', JSON.stringify(this.state.user));
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  };

  redirect = async () => {
    const user = await this.saveUser();
    if (user.userName != '') {
      this.props.history.push('/account/overview');
    } else {
      console.log('could not access storage.');
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    this.setState({
      error: {
        emailError: '',
        passwordError: '',
      },
    });

    const userSubmitted = {
      email: data.get('email'),
      password: data.get('password'),
    };

    axios
      .get('/api/v1/spoc/account/email=' + userSubmitted.email)
      .then((response) => {
        this.setState({
          user: {
            ...this.state.user,
            userName: response.data.userName,
            email: userSubmitted.email,
          },
        });
        axios
          .get('/api/v1/spoc/account/pwusername=' + this.state.user.userName, {
            params: {
              password: userSubmitted.password,
            },
          })
          .then((response) => {
            if (response.data === true) {
              axios
                .get('api/v1/spoc/profile/email=' + userSubmitted.email)
                .then((response) => {
                  const userReceived = response.data;
                  console.log(userReceived);
                  this.setState({
                    user: {
                      ...this.state.user,
                      phoneNumber: userReceived.phoneNumber,
                      firstName: userReceived.firstName,
                      lastName: userReceived.lastName,
                    },
                  });
                  this.redirect();
                });
            }
          })
          .catch((error) => {
            console.log(error.response.data.message);
            this.setState({
              error: {
                ...this.state.error,
                passwordError: 'Incorrect password.',
              },
            });
          });
      })
      .catch((error) => {
        console.log(error.response.data.message);
        this.setState({
          error: {
            ...this.state.error,
            emailError: error.response.data.message,
          },
        });
      });
  };

  render() {
    if (
      localStorage.getItem('user') != null &&
      localStorage.getItem('user') != 'undefined'
    ) {
      this.props.history.push('/account/overview');
    }

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
            {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              onSubmit={this.handleSubmit}
              noValidate
              sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                helperText={this.state.error.emailError}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                helperText={this.state.error.passwordError}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Sign In{' '}
              </Button>
              <Grid>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='signup' variant='body2'>
                    "Don't have an account? Sign Up"
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withRouter(SignIn);
