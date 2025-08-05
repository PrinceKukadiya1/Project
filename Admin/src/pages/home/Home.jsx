// import React, { useMemo } from "react"
// import './home.css'
// import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
// import Chart from '../../components/charts/Chart'
// import WidgetSm from '../../components/widgetSm/WidgetSm'
// import WidgetLg from '../../components/widgetLg/WidgetLg'
// import { useEffect } from "react";
// import axios from 'axios'
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext/AuthContext";

// const Home = () => {

//   const { user } = useContext(AuthContext);


//   const MONTHS = useMemo(() => [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Agu',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ], [])

//   const [userStats, setUserStats] = React.useState([]);

//   useEffect(() => {
//     const getStats = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/users/stats", {
//           headers: {
//             Authorization: `Bearer ${user?.accessToken}`,
//           },
//         });


//         const sorted = res.data
//           .sort((a, b) => a._id - b._id)
//           .map(item => ({
//             name: MONTHS[item._id - 1],
//             "New User": item.total
//           }));

//         setUserStats(sorted);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getStats()
//   }, [])


//   return (
//     <div className='home'>
//       <FeaturedInfo />
//       <Chart data={userStats} title='User Analytics' dataKey='New User' />
//       <div className='homeWidgets'>
//         <WidgetSm />
//         <WidgetLg />
//       </div>
//     </div>
//   )
// }

// export default Home


import React, { useMemo, useEffect, useState, useContext } from "react";
import './home.css';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/charts/Chart';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import axios from 'axios';
import { AuthContext } from "../../context/authContext/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  const MONTHS = useMemo(() => [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ], []);

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/stats", {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });

        const sorted = res.data
          .sort((a, b) => a._id - b._id)
          .map(item => ({
            name: MONTHS[item._id - 1],
            "New User": item.total,
          }));

        setUserStats(sorted);
      } catch (error) {
        console.log(error);
      }
    };

    getStats();
  }, [MONTHS, user]);

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart data={userStats} title='User Analytics' dataKey='New User' />
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
