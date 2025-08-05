import React from 'react'
import './watch.scss'
import { ArrowBack } from '@mui/icons-material';
import dhadak from '../../assets/Trailers/Dhadak.mp4'
import { Link, useLocation } from "react-router-dom";


const Watch = () => {
  const location = useLocation()
  const movie = location.state?.movie;


  return (
    <div className='watch'>
      <Link to="/">
        <div className="back">
          <ArrowBack />
          Home
        </div>
      </Link>

      <video className='video' src={movie.trailer} autoPlay loop controls />
      {/* <video className='video' src={movie.video} autoPlay loop progress controls /> */}
      {/* <video className='video' src={dhadak} autoPlay loop controls /> */}
    </div>
  )
}

export default Watch
