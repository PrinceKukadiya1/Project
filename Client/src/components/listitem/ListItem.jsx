
import React, { useEffect, useState, useContext } from 'react';
import './listItem.scss';
import { PlayArrow, Add, ThumbUp, ThumbDown, InfoOutlined } from '@mui/icons-material';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';

const ListItem = ({ index, item }) => {
  const [isHover, setIsHover] = useState(false);
  const [movie, setMovie] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/api/movies/find/" + item, {
          headers: {
            token: "Bearer " + user?.accessToken,
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };
    if (item && user?.accessToken) getMovie();
  }, [item, user]);

  // Safe positioning
  const left = index * 225 - 50 + index * 2.5;

  // ✅ Handle navigation only via buttons
  const handleWatchNow = (e) => {
    e.stopPropagation();
    navigate("/watch", { state: { movie } });
  };

  const handleDetails = (e) => {
  e.stopPropagation();
  navigate(`/details/${movie._id}`, { state: { movie } });
};


  return (
    <div
      className="listItem"
      style={{ left }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {movie?.img && <img src={movie.img} alt="Thumbnail" />}

      {isHover && movie && (
        <>
          {movie.video && (
            <video
              src={movie.video}
              autoPlay
              loop
              preload="auto"
              className="trailerVideo visible"
            />
          )}
          <div className="itemInfo">
            <div className="icons">
              {/* ✅ Watch button navigates to watch page */}
              <button className="button" onClick={handleWatchNow}>
                <PlayArrow className="icon-b" />
                Watch Now
              </button>

              {/* ✅ Details button navigates to details page */}
              <button className="button details-btn" onClick={handleDetails}>
                <InfoOutlined className="icon-b" />
                Details
              </button>

              <Add className="icon" />
              {/* <ThumbUp className="icon" />
              <ThumbDown className="icon" /> */}
            </div>

            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>

            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
