import { Container } from '@mui/material';
import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import LeftSideBar from './LeftSideBar';
import { Box } from '@mui/system';
import NavBar from './NavBar';

const theme = createTheme();
theme.typography.h1.fontWeight = 900;
theme.typography.h2.fontWeight = 900;
theme.palette.primary.main = '#000';

export default function Texts() {
  return (
    <>
      <NavBar className='navbar'></NavBar>
      <Box sx={{ display: 'flex', width: '100vw' }}>
        <LeftSideBar className='sideBar'></LeftSideBar>
        <Container></Container>
      </Box>
    </>
  );
}
