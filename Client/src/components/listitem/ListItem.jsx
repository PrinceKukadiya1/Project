// import React, { useEffect } from 'react';
// import './listitem.scss';
// import { PlayArrow, Add, ThumbUp, ThumbDown } from '@mui/icons-material';
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../../authContext/AuthContext';



// const ListItem = ({ index, item }) => {
//   const [isHover, setIsHover] = React.useState(false);
//   const [movie, setmovie] = React.useState(null);
//   const { user } = useContext(AuthContext);


//   useEffect(() => {
//     const getMovie = async () => {
//       try {
//         const res = await axios.get("/api/movies/find/" + item, {
//           headers: {
//             token: "Bearer " + user.accessToken
//           }
//         }
//         )
//         setmovie(res.data)
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getMovie()
//   }, [item])

//   // Always calculate and apply the left position
//   const left = index * 225 - 50 + index * 2.5;

//   return (

//     <Link to="/watch" state={{ movie }}>
//       <div
//         className="listItem"
//         style={{ left }}
//         onMouseEnter={() => setIsHover(true)}
//         onMouseLeave={() => setIsHover(false)}
//       >
//         {movie?.img && <img src={movie.img} alt="Thumbnail" />}

//         {isHover && (
//           <>
//             <video src={movie.trailer} autoPlay={true} loop preload='auto' className={`trailerVideo ${isHover ? 'visible' : ''}`} />
//             <div className="itemInfo">
//               <div className="icons">
//                 <button className="button">
//                   <PlayArrow className="icon-b" />
//                   Watch Now
//                 </button>
//                 <Add className="icon" />
//                 <ThumbUp className="icon" />
//                 <ThumbDown className="icon" />
//               </div>

//               <div className="itemInfoTop">
//                 <span>{movie.duration}</span>
//                 <span className="limit">+{movie.limit}</span>
//                 <span>{movie.year}</span>
//               </div>

//               <div className="desc">
//                 {movie.desc}
//               </div>

//               <div className="genre">{movie.genre}</div>
//             </div>
//           </>
//         )}
//       </div>
//     </Link>

//   );
// };

// export default ListItem;


import React, { useEffect, useState, useContext } from 'react';
import './listitem.scss';
import { PlayArrow, Add, ThumbUp, ThumbDown } from '@mui/icons-material';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';

const ListItem = ({ index, item }) => {
  const [isHover, setIsHover] = useState(false);
  const [movie, setMovie] = useState(null);
  const { user } = useContext(AuthContext);

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

  return (
    <Link to="/watch" state={{ movie }} className="link">
      <div
        className="listItem"
        style={{ left }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {movie?.img && <img src={movie.img} alt="Thumbnail" />}

        {isHover && movie && (
          <>
            {movie.trailer && (
              <video
                src={movie.trailer}
                autoPlay
                loop
                preload="auto"
                className="trailerVideo visible"
              />
            )}
            <div className="itemInfo">
              <div className="icons">
                <button className="button">
                  <PlayArrow className="icon-b" />
                  Watch Now
                </button>
                <Add className="icon" />
                <ThumbUp className="icon" />
                <ThumbDown className="icon" />
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
    </Link>
  );
};

export default ListItem;
