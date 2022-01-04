import * as React from 'react';

//Materials UI Imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ThemeProvider } from '@mui/material/styles';

//Other functional imports
import { theme } from './CustomTheme';

const fontColor = 'black';

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          className='home-navbar'
          style={{
            height: '10vh',
            alignItems: 'center',
            display: 'grid',
            gridTemplateColumns: '50% 50%',
          }}>
          <img
            className='logoSmall'
            src='/images/SpOcTexter-logos_transparent_cropped.png'
            alt=''
            style={{
              width: '17vw',
              minWidth: '200px',
              justifySelf: 'left',
              marginLeft: '7vw',
            }}></img>
          <div>
            <Button
              className='btn-outlined'
              style={{
                marginRight: '2vw',
                color: theme.palette.primary.dark,
                border: '1px solid ' + theme.palette.primary.dark,
              }}
              variant='outlined'
              color='secondary'>
              <a href='/signin'>Sign In</a>
            </Button>
            <Button
              className='btn-outlined'
              style={{
                color: theme.palette.primary.dark,
                border: '1px solid ' + theme.palette.primary.dark,
              }}
              variant='outlined'
              color='secondary'>
              <a href='/signup'>Sign Up</a>
            </Button>
          </div>
        </div>
        <div className='home-page-hero'>
          <div
            style={{
              width: '60%',
              margin: 'auto',
              justfySelf: 'center',
            }}>
            <Typography variant='h4' sx={{ mt: 2 }} color={fontColor}>
              Welcome to <u>SpOcTexter</u>
            </Typography>
            <Typography
              variant='h4'
              sx={{ mt: 0, fontSize: '1.5em', fontWeight: '600' }}
              color={fontColor}>
              (A "<u>Sp</u>ecial <u>Oc</u>casion <u>Texter</u>")
            </Typography>
            <p className='openingParagraph'>
              SpOcTexter is a simple web app that allows users to send
              themselves text reminders for their friends and family members'
              special occasions.
            </p>
            <p className='openingParagraph'>
              Simply create an account, save some friends, add occasions and
              SpOcTexter will do the rest!
            </p>
            <p className='openingParagraph'>
              Test it out and send yourself a test text reminder once you sign
              up!
            </p>
            <p style={{ marginTop: '5%' }}>
              Currently in beta testing with limited functionality. Recommend
              viewing in a desktop browser.
            </p>
          </div>
          <img
            src='/images/spoctexter_mockup.png'
            style={{
              width: '20vw',
              margin: 'auto',
              justifySelf: 'center',
            }}></img>
        </div>
        <div
          style={{
            height: '10vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <GitHubIcon sx={{ mr: '.5em' }}></GitHubIcon>
          <a
            style={{ marginRight: '2em' }}
            href='https://github.com/srachoor/SpecialOccasionTexterWeb'>
            Front-End Github
          </a>
          <GitHubIcon sx={{ mr: '.5em' }}></GitHubIcon>
          <a href='https://github.com/srachoor/spoctexter_frontend'>
            Back-End Github
          </a>
        </div>
      </ThemeProvider>
    </>
  );
}
