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

export const baseURL = 'http://spoctexter-env.eba-7vhu62ka.us-east-2.elasticbeanstalk.com/';
// export const baseURL = '/spoctexter/';
const loginURL = baseURL + 'login';
const getUserAcctURL = baseURL + 'api/v1/spoc/account/';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
      error: {
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
    if (user.userName !== '') {
      this.props.history.push('/account/overview');
    } else {
      console.log('could not access storage.');
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.get(baseURL).then((res) => console.log(res));

    this.setState({
      error: {
        emailError: '',
        passwordError: '',
      },
    });

    const userSubmitted = {
      username: data.get('username'),
      password: data.get('password'),
    };

    axios
      .post(loginURL, {
        username: userSubmitted.username,
        password: userSubmitted.password,
      })
      .then((res) => {
        console.log(res);
        const token = res.headers.authorization;
        console.log(token);
        localStorage.setItem('token', token);
        this.state.user.username = userSubmitted.username;
        axios
          .get(getUserAcctURL + userSubmitted.username, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            const { firstName, lastName, email, phoneNumber } = res.data;
            this.state.user.firstName = firstName;
            this.state.user.lastName = lastName;
            this.state.user.email = email;
            this.state.user.phoneNumber = phoneNumber;
            this.redirect();
          });
      })
      .catch((err) => {
        this.setState({
          error: {
            ...this.state.error,
            passwordError: 'Incorrect username or password.',
          },
        });
      });
  };

  render() {
    if (
      localStorage.getItem('user') != null &&
      localStorage.getItem('user') !== 'undefined' &&
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token') !== 'undefined'
    ) {
      this.props.history.push('/account/overview');
    }

    return (
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <img
              className='logoSmall'
              src='/images/SpOcTexter-logos_transparent_cropped.png'
              alt=''></img>
            <Typography component='h3'>
              Currently in Beta Version (Functionality Limited)
            </Typography>
            <p></p>
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
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
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
              {/* <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Sign In{' '}
              </Button>
              <Grid>
                {/* <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href='signup' variant='body2'>
                    "Don't have an account? Sign Up"
                  </Link>
                </Grid>
                <Grid item>
                  <p>
                    Welcome to SpocTexter, a web app that sends you text
                    reminders about special occasions in your friends' and
                    family's lives. This web app is not currently launched.
                  </p>
                  <p></p>
                  <p>
                    Built by:&nbsp;
                    <a href='https://www.linkedin.com/in/sai-rachoor-71108713/'>
                      Sai Rachoor
                    </a>
                  </p>
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
