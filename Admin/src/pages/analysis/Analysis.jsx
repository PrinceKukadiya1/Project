// import React, { useEffect, useState, useMemo } from 'react';
// import axios from 'axios';
// import Chart from '../../components/charts/Chart';
// import './analysis.css';

// const Analysis = () => {
//   const [userStats, setUserStats] = useState([]);

//   const MONTHS = useMemo(
//     () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
//     []
//   );

//   const formatStatsFor12Months = (rawStats) => {
//     const monthMap = {};
//     rawStats.forEach((item) => {
//       monthMap[item._id] = item.total;
//     });

//     const fullYearData = MONTHS.map((month, index) => ({
//       name: month,
//       'New User': monthMap[index + 1] || 0,
//     }));

//     return fullYearData;
//   };

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get('http://localhost:3000/api/users/stats');
//         const formatted = formatStatsFor12Months(res.data);
//         setUserStats(formatted);
//       } catch (error) {
//         console.error('Failed to load user stats:', error);
//       }
//     };

//     fetchStats();
//   }, [MONTHS]);

//   return (
//     <div className="analysis">
//       <h1>User Analytics</h1>
//       <Chart data={userStats} title="User Analytics (12 Months)" dataKey="New User" />
//     </div>
//   );
// };

// export default Analysis;



import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Chart from '../../components/charts/Chart';
import './analysis.css';

const Analysis = () => {
  const [userStats, setUserStats] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [monthlyGrowth, setMonthlyGrowth] = useState(0);

  const MONTHS = useMemo(() => [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'
  ], []);

  const formatStatsFor12Months = (rawStats) => {
    const monthMap = {};
    rawStats.forEach((item) => {
      monthMap[item._id] = item.total;
    });

    return MONTHS.map((month, index) => ({
      name: month,
      'New User': monthMap[index + 1] || 0,
    }));
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/users/stats');
        const fullYearData = formatStatsFor12Months(res.data);
        setUserStats(fullYearData);

        // Total Users
        const total = res.data.reduce((acc, curr) => acc + curr.total, 0);
        setTotalUsers(total);

        // Monthly Growth = current month vs previous
        const sorted = res.data.sort((a, b) => a._id - b._id);
        const len = sorted.length;
        if (len > 1) {
          const last = sorted[len - 1]?.total || 0;
          const prev = sorted[len - 2]?.total || 0;
          const growth = prev === 0 ? 100 : Math.round(((last - prev) / prev) * 100);
          setMonthlyGrowth(growth);
        }

      } catch (error) {
        console.error('Failed to load user stats:', error);
      }
    };

    fetchUserStats();
  }, [MONTHS]);

  return (
    <div className="analysis">
      <h1 className="analysisTitle">User Analytics Dashboard</h1>
      <p className="analysisSubtitle">Insights about user growth over the last 12 months</p>

      <div className="analysisStats">
        <div className="statBox">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="statBox">
          <h3>Monthly Growth</h3>
          <p>{monthlyGrowth}%</p>
        </div>
      </div>

      <Chart
        data={userStats}
        title="User Analytics (12 Months)"
        dataKey="New User"
      />
    </div>
  );
};

export default Analysis;
