import { IconButton } from '@mui/material';
import { Container } from '@mui/material';
import * as React from 'react';
import LeftSideBar from './LeftSideBar';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import NavBar from './NavBar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export const addUrl = '/api/v1/spoc/account/friend/add';
export const allUrl = '/api/v1/spoc/account/friend/all';
export const updateURL = '/api/v1/spoc/account/friend/update';
export const deleteUrl = '/api/v1/spoc/account/friend/delete';
export const gridTemplateSetting = '21% 21% 21% 21% auto';

export default function FriendsPage() {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    axios
      .get(allUrl, {
        params: {
          userName: userName,
        },
      })
      .then((response) => {
        response.data.sort((a, b) =>
          a.friendFirstName.localeCompare(b.friendFirstName)
        );
        console.log(response.data);
        setFriends(response.data);
      });
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const addFriend = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newFriend = {
      friendFirstName: data.get('firstName'),
      friendLastName: data.get('lastName'),
      friendPhoneNumber: data.get('phoneNumber'),
      friendDOB: data.get('DOB'),
    };

    axios
      .post(addUrl, newFriend, {
        params: {
          username: userName,
        },
      })
      .then((resp) => {
        fetchFriends();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const deleteFriend = (id) => {
    axios
      .delete(deleteUrl, {
        params: {
          friendId: id,
        },
      })
      .then((res) => {
        const newFriends = friends.filter((friend) => friend.friendId !== id);
        setFriends(newFriends);
      });
  };

  const friendObjectLabels = [
    'First Name',
    'Last Name',
    'Date of Birth',
    'Phone Number',
  ];
  const friendObjectNames = ['firstName', 'lastName', 'DOB', 'phoneNumber'];

  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  const { firstName, lastName, email, phoneNumber, userName } = userFromStorage;

  return (
    <>
      <NavBar className='navbar'></NavBar>
      <Box sx={{ display: 'flex', width: '100vw' }}>
        <LeftSideBar className='sideBar'></LeftSideBar>
        <Container>
          <Box
            component='form'
            onSubmit={addFriend}
            sx={{
              display: 'grid',
              gridTemplateColumns: gridTemplateSetting,
              margin: '10px',
            }}>
            {friendObjectLabels.map((text, index) => (
              <AddFriend
                id={friendObjectNames[index]}
                key={index}
                name={friendObjectNames[index]}
                label={text}></AddFriend>
            ))}
            <Button type='submit' sx={{ margin: 3 }}>
              Add Friend
            </Button>
          </Box>
          <Divider />
          <div>
            <Friends
              friends={friends}
              deleteFriend={deleteFriend}
              fetchFriends={fetchFriends}></Friends>
          </div>
        </Container>
      </Box>
    </>
  );
}

function AddFriend(props) {
  let { label, name } = props;
  let type = '';
  let required = true;
  if (label === 'Date of Birth') {
    type = 'date';
  }

  return (
    <>
      <TextField
        sx={{ margin: '20px' }}
        required={required}
        type={type}
        name={name}
        InputLabelProps={{ shrink: true, required: true }}
        label={label}></TextField>
    </>
  );
}

const Friends = ({ friends, deleteFriend, fetchFriends }) => {
  return (
    <section>
      <h1 style={{ textAlign: 'left', marginLeft: '2%', marginBottom: '3%' }}>
        Your Friends
      </h1>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridTemplateSetting,
          margin: '10px',
        }}>
        <label>
          <b>First Name</b>
        </label>
        <label>
          <b>Last Name</b>
        </label>
        <label>
          <b>Date of Birth</b>
        </label>
        <label>
          <b>Phone Number</b>
        </label>
      </Box>
      <Divider />
      <div>
        {friends.map((friend) => {
          return (
            <Friend
              key={friend.friendId}
              {...friend}
              deleteFriend={deleteFriend}
              fetchFriends={fetchFriends}></Friend>
          );
        })}
      </div>
    </section>
  );
};

const Friend = ({
  friendId,
  friendFirstName,
  friendLastName,
  friendPhoneNumber,
  friendDOB,
  deleteFriend,
  fetchFriends,
}) => {
  const editFriend = (event) => {
    event.preventDefault();

    if (isEdit == true) {
      const data = new FormData(event.currentTarget);

      const newFriend = {
        newFriendPhoneNumber: data.get('phoneNumber'),
        newFriendFirstName: data.get('firstName'),
        newFriendLastName: data.get('lastName'),
        newFriendDOB: data.get('DOB'),
      };

      axios
        .put(updateURL, null, {
          params: {
            newFriendPhoneNumber: data.get('phoneNumber'),
            newFriendFirstName: data.get('firstName'),
            newFriendLastName: data.get('lastName'),
            newFriendDOB: data.get('DOB'),
            friendId: event.currentTarget.id,
          },
        })
        .then((resp) => fetchFriends())
        .catch((error) => alert(error.response.data.message));
    }
    setIsEdit(!isEdit);
  };
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Box
        id={friendId}
        component='form'
        onSubmit={editFriend}
        sx={{
          display: 'grid',
          gridTemplateColumns: gridTemplateSetting,
          marginTop: '5px',
          marginBottom: '5px',
        }}>
        {!isEdit ? (
          <>
            <label style={{ alignSelf: 'center' }}>{friendFirstName}</label>
            <label style={{ alignSelf: 'center' }}>{friendLastName}</label>
            <label style={{ alignSelf: 'center' }}>{friendDOB}</label>
            <label style={{ alignSelf: 'center' }}>{friendPhoneNumber}</label>
          </>
        ) : (
          <>
            <TextField
              sx={{ margin: '0px 20px 0px 20px', textAlign: 'center' }}
              inputProps={{ style: { textAlign: 'center' } }}
              size='small'
              name='firstName'
              defaultValue={friendFirstName}></TextField>
            <TextField
              sx={{ margin: '0px 20px 0px 20px' }}
              inputProps={{ style: { textAlign: 'center' } }}
              name='lastName'
              size='small'
              defaultValue={friendLastName}></TextField>
            <TextField
              sx={{ margin: '0px 20px 0px 20px' }}
              inputProps={{ style: { textAlign: 'center' } }}
              name='DOB'
              size='small'
              defaultValue={friendDOB}></TextField>
            <TextField
              sx={{ margin: '0px 20px 0px 20px' }}
              inputProps={{ style: { textAlign: 'center' } }}
              name='phoneNumber'
              size='small'
              defaultValue={friendPhoneNumber}></TextField>
          </>
        )}
        <section>
          <Button type='submit' sx={{ alignSelf: 'middle' }}>
            {isEdit ? 'Confirm' : 'Edit'}
          </Button>
          <IconButton
            sx={{ alignSelf: 'middle' }}
            onClick={() => {
              deleteFriend(friendId);
            }}>
            <DeleteIcon />
          </IconButton>
        </section>
      </Box>
      <Divider />
    </>
  );
};
