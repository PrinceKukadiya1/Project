// import React, { useEffect, useState } from 'react'
// import './home.scss'
// import Navbar from '../../components/navbar/Navbar';
// import Featured from '../../components/featured/Featured';
// import List from '../../components/list/List';
// import axios from "axios"

// const Home = ({ type }) => {

//   const [lists, setLists] = useState([])
//   const [genre, setGenre] = useState(null)

//   useEffect(() => {
//     const getRandomLists = async () => {
//       try {
//         let url = '/api/lists';
//         const params = [];

//         if (type) params.push(`type=${type}`);
//         if (genre) params.push(`genre=${genre}`);
//         if (params.length > 0) url += '?' + params.join('&');

//         const res = await axios.get(url, {
//           headers: {
//             token: 'no eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Nzc2ZjNkYmIzNWZiYjQ1MmYyM2I1YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc1MjcyOTQ2NSwiZXhwIjoxNzUzMTYxNDY1fQ.3Sg14Dtii1R6foYacyDohELKi_6Qt7ACGUpDRtzTif8'
//           }
//         });

//         setLists(res.data)
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getRandomLists()
//   }, [type, genre])

//   return (
//     <div className='home'>
//       <Navbar />
//       <Featured type={type} />
//       {lists.map(list => (
//         <List key={list._id || list.title} list={list}/>
//       )
//       )}

//     </div>

//   )
// }

// export default Home



import React, { useEffect, useState } from 'react';
import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import axios from "axios";
import Footer from '../../components/footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../../authContext/AuthContext';


const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const getRandomLists = async () => {
      try {
        let url = '/api/lists';
        const params = [];

        if (type) params.push(`type=${type}`);
        if (genre) params.push(`genre=${genre}`);
        if (params.length > 0) url += '?' + params.join('&');

        const res = await axios.get(url, {
          headers: {
            token: "Bearer " + user.accessToken
          }
        });

        const allLists = res.data;

        // Find the fixed list (e.g., with specific title or type === "fixed")
        const fixedList = allLists.find(list => list.title === "TOP 10 MOVIE");
        const otherLists = allLists.filter(list => list.title !== "TOP 10 MOVIE"); 
        
        // const fixedList = allLists.find(list => list.title === "Nightmares from the Subcontinent");
        // const otherLists = allLists.filter(list => list.title !== "Nightmares from the Subcontinent");

        // Optional: shuffle the other lists
        const shuffled = otherLists.sort(() => 0.5 - Math.random());

        // Set final list with fixed at top
        const finalLists = fixedList ? [fixedList, ...shuffled] : shuffled;

        setLists(finalLists);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List key={list._id || list.title} list={list} />
      ))}
      <Footer />
    </div>
  );
};

export default Home;
