import React, { useEffect, useContext, useState } from 'react';
import './featured.scss';
import { PlayArrow, InfoOutlined, Add } from '@mui/icons-material';
import api from "../../api/axios";
import { AuthContext } from '../../authContext/AuthContext';
import { Link } from 'react-router-dom';

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await api.get(`/api/lists/top10`, {
          headers: { token: "Bearer " + user?.accessToken }
        });
        const randomMovieId = res.data;
        const movieRes = await api.get(`/api/movies/find/${randomMovieId}`, {
          headers: { token: "Bearer " + user?.accessToken }
        });
        setContent(movieRes.data);
      } catch (error) {
        console.log("Error fetching featured content:", error);
      }
    };

    if (user?.accessToken) getRandomContent();
  }, [type, user?.accessToken]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={e => setGenre(e.target.value.toLowerCase())}
          >
            <option value="">All</option>
            <option value="adventure">Adventure</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}

      {content.trailer ? (
        <video
          className="featured-video"
          autoPlay
          muted
          loop
          playsInline
          poster={content.img}
        >
          <source src={content.trailer} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={content.img} alt={content.title || "featured"} />
      )}

      <div className="overlay"></div>

      <div className="info">
        <h1 className="title">{content.title}</h1>
        <p className="desc">{content.desc}</p>
        <div className="buttons">
          <Link to={`/watch`} state={{ movie: content }} className="btn play">
            <PlayArrow />
            <span>Play</span>
          </Link>

          <Link to={`/details/${content._id}`} className="btn more">
            <InfoOutlined />
            <span>More Info</span>
          </Link>

          <button className="btn add">
            <Add />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
