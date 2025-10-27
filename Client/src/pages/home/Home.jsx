import React, { useEffect, useState, useContext } from 'react';
import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import axios from "axios";
import Footer from '../../components/footer/Footer';
import { AuthContext } from '../../authContext/AuthContext';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getLists = async () => {
      try {
        let url = '/api/lists';
        const params = [];

        // Only include type if it's not "home"
        if (type && type !== "home") params.push(`type=${type}`);
        // Only include genre if type is selected
        if (type && genre) params.push(`genre=${genre}`);

        if (params.length > 0) url += '?' + params.join('&');

        const res = await axios.get(url, {
          headers: { token: "Bearer " + user.accessToken }
        });

        // Sort fixed list (e.g., "TOP 10 MOVIE") first
        const allLists = res.data;
        const fixedList = allLists.find(list => list.title === "Shadows & Screams");
        const otherLists = allLists.filter(list => list.title !== "Shadows & Screams");
        const shuffled = otherLists.sort(() => 0.5 - Math.random());
        const finalLists = fixedList ? [fixedList, ...shuffled] : shuffled;

        setLists(finalLists);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    getLists();
  }, [type, genre, user.accessToken]);

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type !== "home" ? type : null} setGenre={setGenre} />
      {lists.map((list) => (
        <List key={list._id || list.title} list={list} />
      ))}
      <Footer />
    </div>
  );
};

export default Home;
