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
import { baseURL } from './SignIn';

const gridTemplateSetting = '40% 40% auto';
const gridTemplateSettingList = '30% 30% 30% auto';
const getOccasionsURL = baseURL + 'api/v1/spoc/account/friend/occasion/all';
const postOccasionURL = baseURL + 'api/v1/spoc/account/friend/occasion';
const deleteOccasionURL = postOccasionURL;

export default function OccasionsPage() {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const occasionObjectLabels = ['Occasion', 'Date'];
  const occasionObjectNames = ['occasionName', 'occasionDate'];
  const [allFriends, setAllFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friend, setFriend] = useState({
    friendId: '',
    friendFirstName: '',
    friendLastName: '',
    friendPhoneNumber: '',
    friendDOB: '',
  });
  const [friendLabel, setFriendLabel] = useState('');
  const [occasions, setOccasions] = useState([]);

  const fetchFriends = async (username) => {
    axios
      .get(allUrl, {
        params: {
          username: username,
        },
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        response.data.sort((a, b) =>
          a.friendFirstName.localeCompare(b.friendFirstName)
        );
        setAllFriends(response.data);
        setFriendLabel('All');
        setSelectedFriends(response.data);
        fetchOccasions(response.data);
      });
  };

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromStorage === null || userFromStorage === 'undefined') {
      history.push('/');
    } else {
      fetchFriends(userFromStorage.username).then(
        setSelectedFriends(allFriends)
      );
    }
  }, []);

  const deleteOccasion = (id) => {
    axios
      .delete(deleteOccasionURL, {
        params: {
          occasionId: id,
        },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const newOccasions = occasions.filter((occasion) => occasion.id !== id);
        setOccasions(newOccasions);
      });
  };

  const fetchOccasions = (selectedFriends) => {
    const occ = [];

    selectedFriends.map((friend) => {
      axios
        .get(getOccasionsURL, {
          params: {
            friendId: friend.friendId,
          },
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          res.data.forEach((item) => {
            item.friendFirstName = friend.friendFirstName;
            item.friendLastName = friend.friendLastName;
            occ.push(item);
          });
        })
        .then((res) => {
          setOccasions(() => [...occ]);
        })
        .catch((error) => {
          console.log(error.response);
        });
    });
  };

  const addOccasion = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (friendLabel === 'All') {
      alert('Please select a friend before adding an occasion.');
    } else {
      const newOccasion = {
        occasionName: data.get('occasionName'),
        occasionDate: data.get('occasionDate'),
      };

      axios
        .post(postOccasionURL, newOccasion, {
          params: {
            friendId: friend.friendId,
          },
          headers: {
            Authorization: token,
          },
        })
        .then((resp) => {
          fetchOccasions(selectedFriends);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const handleSelect = (event) => {
    event.preventDefault();

    if (event.target.value === 'All') {
      setFriend({
        friendId: '',
        friendFirstName: '',
        friendLastName: '',
        friendPhoneNumber: '',
        friendDOB: '',
      });
      setSelectedFriends(allFriends);
      fetchOccasions(allFriends);
      setFriendLabel(event.target.value);
    } else {
      const currentFriend = allFriends.filter((friend) => {
        return friend.friendId === event.target.value;
      });
      setFriend(currentFriend[0]);
      setSelectedFriends(currentFriend);
      fetchOccasions(currentFriend);
      setFriendLabel(event.target.value);
    }
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
              <InputLabel>
                <b>Select Friend</b>
              </InputLabel>
              <Select
                value={friendLabel}
                onChange={handleSelect}
                defaultValue={baseURL}>
                <MenuItem value='All'>All</MenuItem>
                {allFriends.map((friend) => (
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
              friends={selectedFriends}></Occasions>
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

const Occasions = ({ occasions, deleteOccasion, friends }) => {
  occasions.sort((a, b) => a.friendLastName.localeCompare(b.friendLastName));

  return (
    <section>
      <h1 style={{ textAlign: 'left', marginLeft: '2%', marginBottom: '3%' }}>
        {friends && friends.length == 1
          ? 'Occasions for ' +
            friends[0].friendFirstName +
            ' ' +
            friends[0].friendLastName
          : 'Occasions for All'}
      </h1>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridTemplateSettingList,
          margin: '10px',
        }}>
        <label>
          <b>Friend</b>
        </label>
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
          gridTemplateColumns: gridTemplateSettingList,
          margin: '10px',
        }}>
        <label style={{ alignSelf: 'center' }}>
          {occasion.friendFirstName + ' ' + occasion.friendLastName}
        </label>
        <label style={{ alignSelf: 'center' }}>{occasion.occasionName}</label>
        <label style={{ alignSelf: 'center' }}>{occasion.occasionDate}</label>
        <IconButton
          size='medium'
          sx={{ alignSelf: 'center', justifySelf: 'center' }}
          onClick={() => {
            deleteOccasion(occasion.id);
          }}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Divider />
    </section>
  );
};
