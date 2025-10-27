import React, { useEffect, useRef, useState } from 'react';
import './watch.scss';
import { ArrowBack } from '@mui/icons-material';
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef();

  useEffect(() => {
    // Lock body scroll only on this page
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='watch'>
      <Link to="/" className="back">
        <ArrowBack />
        <span>Home</span>
      </Link>

      {/* ✅ Loading Animation */}
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading video...</p>
        </div>
      )}

      <video
        ref={videoRef}
        className='video'
        src={movie?.video}
        controls
        autoPlay
        loop
        onCanPlay={() => setIsLoading(false)}  // hide loader when video is ready
        onLoadedData={() => setIsLoading(false)}
      />
    </div>
  );
};

export default Watch;
