import React, { useState, useContext, useEffect } from 'react';
import './mylist.scss';
import { Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { AuthContext } from '../../authContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const demoList = [
  {
    title: 'The Shadow Code',
    image: 'https://picsum.photos/id/1042/600/400',
  },
  {
    title: 'City of Neon',
    image: 'https://picsum.photos/id/1062/600/400',
  },
  {
    title: 'Cyber Heist',
    image: 'https://picsum.photos/id/1052/600/400',
  },
  {
    title: 'Frozen Signal',
    image: 'https://picsum.photos/id/1050/600/400',
  },
  {
    title: 'Echo Drift',
    image: 'https://picsum.photos/id/1011/600/400',
  },
];


const MyList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myList, setMyList] = useState(demoList);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const removeFromList = (title) => {
    setMyList(myList.filter(movie => movie.title !== title));
  };

  return (
    <>
    <Navbar/>
    <div className="mylist-page">
      <Typography variant="h4" className="mylist-title">My List</Typography>
      {myList.length === 0 ? (
        <Typography variant="body1">Your list is empty. Start adding movies!</Typography>
      ) : (
        <Grid container spacing={3}>
          {myList.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="list-card">
                <CardMedia component="img" height="200" image={item.image} alt={item.title} />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Button variant="outlined" color="error" size="small" onClick={() => removeFromList(item.title)}>
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default MyList;
