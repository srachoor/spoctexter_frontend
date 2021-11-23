import { Container, FormControl } from '@mui/material';
import * as React from 'react';
import LeftSideBar from './LeftSideBar';
import { Box } from '@mui/system';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { allUrl } from './FriendsPage';
import { Divider } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router';

const gridTemplateSetting = '40% 40% auto';
const getOccasionsURL = '/api/v1/spoc/account/friend/occasion/all';
const postOccasionURL = '/api/v1/spoc/account/friend/occasion';
const deleteOccasionURL = postOccasionURL;

export default function OccasionsPage() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userName: '',
  });

  const history = useHistory();

  const occasionObjectLabels = ['Occasion', 'Date'];
  const occasionObjectNames = ['occasionName', 'occasionDate'];
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({
    friendId: '',
    friendFirstName: '',
    friendLastName: '',
    friendPhoneNumber: '',
    friendDOB: '',
  });
  const [friendLabel, setFriendLabel] = useState('');
  const [occasions, setOccasions] = useState([]);

  const fetchFriends = async (userName) => {
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
        setFriends(response.data);
      });
  };

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromStorage == null || userFromStorage == 'undefined') {
      history.push('/');
    } else {
      setUser(JSON.parse(localStorage.getItem('user')));
      fetchFriends(userFromStorage.userName);
    }
  }, []);

  const deleteOccasion = (id) => {
    axios
      .delete(deleteOccasionURL, {
        params: {
          occasionId: id,
        },
      })
      .then((res) => {
        const newOccasions = occasions.filter((occasion) => occasion.id !== id);
        setOccasions(newOccasions);
      });
  };

  const fetchOccasions = (friendId) => {
    axios
      .get(getOccasionsURL, {
        params: {
          friendId: friendId,
        },
      })
      .then((res) => {
        setOccasions(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const addOccasion = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newOccasion = {
      occasionName: data.get('occasionName'),
      occasionDate: data.get('occasionDate'),
    };

    axios
      .post(postOccasionURL, newOccasion, {
        params: {
          friendId: friend.friendId,
        },
      })
      .then((resp) => {
        fetchOccasions(friend.friendId);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleSelect = (event) => {
    event.preventDefault();
    const selectedFriend = friends.filter((friend) => {
      return friend.friendId == event.target.value;
    });

    setFriend(selectedFriend[0]);
    const friendId = event.target.value;
    fetchOccasions(friendId);
    setFriendLabel(event.target.value);
  };

  return (
    <>
      <NavBar className='navbar'></NavBar>
      <Box sx={{ display: 'flex', width: '100vw' }}>
        <LeftSideBar className='sideBar'></LeftSideBar>
        <Container>
          <Box
            sx={{
              margin: '30px 30px 0px 30px',
              width: '30%',
              alignSelf: 'center',
            }}>
            <FormControl fullWidth>
              <InputLabel>Select Friend</InputLabel>
              <Select value={friendLabel} onChange={handleSelect}>
                {friends.map((friend) => (
                  <MenuItem value={friend.friendId} key={friend.friendId}>
                    {friend.friendFirstName + ' ' + friend.friendLastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            component='form'
            onSubmit={addOccasion}
            sx={{
              display: 'grid',
              gridTemplateColumns: gridTemplateSetting,
              margin: '10px',
            }}>
            {occasionObjectLabels.map((text, index) => (
              <AddOccasion
                id={occasionObjectNames[index]}
                key={index}
                name={occasionObjectNames[index]}
                label={text}></AddOccasion>
            ))}
            <Button type='submit' sx={{ margin: 3 }}>
              Add Occasion
            </Button>
          </Box>
          <Box>
            <Occasions
              deleteOccasion={deleteOccasion}
              occasions={occasions}
              friend={friend}></Occasions>
          </Box>
        </Container>
      </Box>
    </>
  );
}

function AddOccasion(props) {
  let { label, name } = props;
  let type = '';
  let required = true;
  if (label === 'Date') {
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

const Occasions = ({ occasions, deleteOccasion, friend }) => {
  return (
    <section>
      <h1 style={{ textAlign: 'left', marginLeft: '2%', marginBottom: '3%' }}>
        {friend.friendFirstName
          ? 'Occasions for ' +
            friend.friendFirstName +
            ' ' +
            friend.friendLastName
          : 'Occasions'}
      </h1>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridTemplateSetting,
          margin: '10px',
        }}>
        <label>
          <b>Occasion Name</b>
        </label>
        <label>
          <b>Occasion Date</b>
        </label>
      </Box>
      <Divider />
      <div>
        {occasions.map((occasion) => {
          return (
            <Occasion
              occasion={occasion}
              deleteOccasion={deleteOccasion}
              key={occasion.Id}></Occasion>
          );
        })}
      </div>
    </section>
  );
};

const Occasion = ({ occasion, deleteOccasion }) => {
  return (
    <section>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridTemplateSetting,
          margin: '10px',
        }}>
        <label style={{ alignSelf: 'center' }}>{occasion.occasionName}</label>
        <label style={{ alignSelf: 'center' }}>{occasion.occasionDate}</label>
        <IconButton
          size='medium'
          sx={{ alignSelf: 'center', justifySelf: 'center' }}
          onClick={() => {
            deleteOccasion(occasion.id);
            console.log(occasion.id);
          }}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Divider />
    </section>
  );
};
