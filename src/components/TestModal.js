import React from 'react';
import { useGlobalContext } from './context';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './CustomTheme';
import { Button, Typography, Box, TextField } from '@mui/material';
import axios from 'axios';
import { baseURL } from './SignIn';

const testTextURL = baseURL + 'api/v1/spoc/account/testtext=';

const Modal = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const { isModalOpen, closeModal } = useGlobalContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const friendName = data.get('friendName');
    const testOccasion = data.get('testOccasion');
    const friendPhone = data.get('friendPhone');
    const message = `Reminder: Today is ${friendName}'s ${testOccasion}. Make sure you text them at ${friendPhone}.`;
    // console.log(message);
    // console.log(user.username);
    // console.log(token);

    axios.post(testTextURL + user.username, null, {
      params: { message: message },
      headers: {
        Authorization: token,
      },
    });
    closeModal();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          className={`${
            isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'
          }`}>
          <div className='modal-container'>
            <Typography variant='h4' sx={{ fontSize: '2em' }}>
              Send a test text reminder!
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              sx={{ width: '85%', display: 'grid' }}>
              <TextField
                margin='normal'
                required
                id='friendName'
                label='Name of Friend'
                name='friendName'
                autoFocus
                defaultValue='John Doe'
              />
              <TextField
                margin='normal'
                required
                id='testOccasion'
                label='Sample Occasion'
                name='testOccasion'
                autoFocus
                defaultValue='Birthday'
              />
              <TextField
                margin='normal'
                required
                id='friendPhone'
                label='Phone Number of Friend (Friend will not be contacted)'
                name='friendPhone'
                autoFocus
                defaultValue='1234567890'
              />
              <Button type='submit' sx={{ mt: 5 }}>
                Send Test Text
              </Button>
            </Box>
            <button className='close-modal-btn' onClick={closeModal}>
              <CloseIcon></CloseIcon>
            </button>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Modal;
