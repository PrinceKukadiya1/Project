
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../authContext/AuthContext';
import { PlayArrow, ArrowBack } from '@mui/icons-material';
import './details.scss';

const Details = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/find/${id}`, {
          headers: {
            token: 'Bearer ' + user.accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.error('Error loading movie:', err);
      }
    };
    fetchMovie();
  }, [id, user]);

  if (!movie) {
    return <div className="details">Loading...</div>;
  }

  return (
    <div className="details" style={{ backgroundImage: `url(${movie.img})` }}>
      <div className="info-box">
        <h1 className="title">{movie.title}</h1>
        <p className="desc">{movie.desc}</p>
        <p className="desc">{movie.ldesc}</p>

        <div className="meta">
          <span><strong>Duration:</strong> {movie.duration}</span>
          <span><strong>Genre:</strong> {movie.genre}</span>
          <span><strong>Year:</strong> {movie.year}</span>
          <span><strong>Age Limit:</strong> {movie.limit}+</span>
        </div>

        <div className="buttons">
          <Link to="/watch" state={{ movie }} className="btn play">
            <PlayArrow />
            <span>Play</span>
          </Link>

          <Link to="/" className="btn back">
            <ArrowBack />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
