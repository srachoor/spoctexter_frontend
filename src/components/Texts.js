import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import LeftSideBar from './LeftSideBar';
import NavBar from './NavBar';
import dynamicSort from './dynamicSort';
import { Box } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import {
  Container,
  TableHead,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { baseURL } from './SignIn';

const theme = createTheme();
theme.typography.h1.fontWeight = 900;
theme.typography.h2.fontWeight = 900;
theme.palette.primary.main = '#000';
const getTextsByUserURL = baseURL + 'api/v1/spoc/texts/';

export default function Texts() {
  const [texts, setTexts] = useState([]);
  const token = localStorage.getItem('token');
  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  const { username } = userFromStorage;

  const fetchTexts = async () => {
    axios
      .get(getTextsByUserURL + username, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // console.log(response.data);
        response.data.sort(dynamicSort('id'));
        setTexts(response.data);
      });
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  return (
    <>
      <NavBar className='navbar'></NavBar>
      <Box sx={{ display: 'flex', width: '100vw' }}>
        <LeftSideBar className='sideBar'></LeftSideBar>
        <Container>
          <TableContainer sx={{ mt: 3 }} component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Phone Number</TableCell>
                  <TableCell align='center'>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {texts.map((text, index) => (
                  <TableRow>
                    <TableCell align='left'>{index + 1}</TableCell>
                    <TableCell align='center'>{text.sentTime}</TableCell>
                    <TableCell align='center'>{text.sentPhone}</TableCell>
                    <TableCell align='center'>{text.smsMessage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
}
