import * as React from 'react';
import { Box } from '@mui/system';
import { AppBar, Toolbar } from '@mui/material';
import { CssBaseline } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/private-theming';
import { Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router';

import { theme } from './CustomTheme';

export default function NavBar() {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMyAccount = () => {
    setAnchorEl(null);
    setTimeout(() => {
      history.push('/account/overview');
    }, 1000);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar
          position='static'
          style={{ background: theme.palette.primary.light }}>
          <CssBaseline />
          <Toolbar className='toolbar' disableGutters={true}>
            <a
              href='overview'
              style={{
                flexGrow: 1,
                textAlign: 'left',
              }}>
              <img
                className='logoMini'
                src='/images/SpOcTexter-logos_transparent_cropped.png'
                alt=''
                style={{ verticalAlign: 'middle' }}></img>
            </a>
            <IconButton
              edge='start'
              className='accountIcon'
              size='medium'
              aria-controls='basic-menu'
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
              <AccountCircle fontSize='large' />
            </IconButton>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              <MenuItem onClick={handleMyAccount}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
