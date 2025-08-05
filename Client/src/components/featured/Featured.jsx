// import React, { useEffect } from 'react'
// import './featured.scss'
// import karma from '../../assets/karma.avif'
// import batman from '../../assets/batman.jpg';
// import brother from '../../assets/brother.webp';
// import { PlayArrow, InfoOutline, Add } from '@mui/icons-material';
// import axios, { Axios } from "axios"

// const Featured = ({ type , setGenre}) => {
//     const [content, setContent] = React.useState({})

//     useEffect(() => {
//         const getRandomContent = async () => {
//             try {
//                 const res = await axios.get(`/api/movies/random?type=${type}`, {
//                     headers: {
//                         token: 'no eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Nzc2ZjNkYmIzNWZiYjQ1MmYyM2I1YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc1MjcyOTQ2NSwiZXhwIjoxNzUzMTYxNDY1fQ.3Sg14Dtii1R6foYacyDohELKi_6Qt7ACGUpDRtzTif8'
//                     }
//                 })
//                 setContent(res.data[0])
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         getRandomContent();
//     }, [type])

//     return (
//         <div className='featured'>
//             {type && (
//                 <div className="category">
//                     <span>{type === "movie" ? "Movies" : "Series"}</span>
//                     <select name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
//                         <option>Genre</option>
//                         <option>Adventure</option>
//                         <option>Action</option>
//                         <option>Comedy</option>
//                         <option>Horror</option>
//                         <option>Romance</option>
//                         <option>Documentary</option>
//                     </select>
//                 </div>
//             )}

//             <img src={content.img} alt="" />

//             <div className="info">
//                 <span className='title'>{content.title}</span>
//                 <span className="desc">
//                     {content.desc}
//                 </span>
//                 <div className="buttons">
//                     <button className="play">
//                         <PlayArrow />
//                         <span>Play</span>
//                     </button>
//                     <button className="more">
//                         <InfoOutline />
//                         <span>More Info</span>
//                     </button>
//                     <button className="add">
//                         <Add />
//                     </button>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Featured


import React, { useEffect, useContext, useState } from 'react';
import './featured.scss';
import { PlayArrow, InfoOutline, Add } from '@mui/icons-material';
import axios from "axios";
import { AuthContext } from '../../authContext/AuthContext';
import { Link } from 'react-router-dom';


const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        // Step 1: Get random movie ID from top 10 list
        const res = await axios.get(`/api/lists/top10`, {
          headers: {
            token: "Bearer " + user.accessToken
          }
        });

        const randomMovieId = res.data; // must return an ID

        // Step 2: Get full movie details
        const movieRes = await axios.get(`/api/movies/find/${randomMovieId}`, {
          headers: {
            token: "Bearer " + user.accessToken
          }
        });

        setContent(movieRes.data);
      } catch (error) {
        console.log("Error fetching featured content:", error);
      }
    };

    getRandomContent();
  }, [type, user]);

  return (
    <div className='featured'>
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
            <option>Genre</option>
            <option>Adventure</option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Horror</option>
            <option>Romance</option>
            <option>Documentary</option>
          </select>
        </div>
      )}

      <img src={content.img} alt={content.title || "featured"} />

      <div className="info">
        <span className='title'>{content.title}</span>
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />

            <Link to={`/watch`} state={{ movie: content }} className="link">
              <span>Play</span>
            </Link>

          </button>
          <button className="more">
            <InfoOutline />
            <Link to={`/details/${content._id}`} className="link"> <span>More Info</span></Link>
          </button>
          <button className="add">
            <Add />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
