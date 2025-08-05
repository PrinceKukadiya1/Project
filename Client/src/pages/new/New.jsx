import React, { useContext, useEffect } from 'react';
import './new.scss';
import { Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { AuthContext } from '../../authContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

// Demo movies — replace with actual image paths or links
const newReleases = [
  {
    title: 'Planet of Fire',
    image: 'https://picsum.photos/id/1015/600/400',
    description: 'A sci-fi thriller about planetary warfare.'
  },
  {
    title: 'Lakeside Horror',
    image: 'https://picsum.photos/id/1020/600/400',
    description: 'A haunting tale of a cursed lake.'
  },
  {
    title: 'Quantum Storm',
    image: 'https://picsum.photos/id/1025/600/400',
    description: 'An action-packed adventure through time.'
  },
  {
    title: 'Skywatcher',
    image: 'https://picsum.photos/id/1035/600/400',
    description: 'An astronomer discovers something unexpected.'
  },
  {
    title: 'Urban Shadow',
    image: 'https://picsum.photos/id/1040/600/400',
    description: 'A detective thriller set in a neon-lit city.'
  },
  {
    title: 'Ocean Depths',
    image: 'https://picsum.photos/id/1050/600/400',
    description: 'A mysterious exploration under the sea.'
  },
];

const New = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="new-page">
        <Typography variant="h4" className="new-title">New & Upcoming</Typography>
        <Grid container spacing={3}>
          {newReleases.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="new-card">
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  className="card-img"
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" className="desc">{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Footer />
    </>
  );
};

export default New;
