import React, { useEffect } from 'react';
import './widgetSm.css';
import avatar from '../../assets/avatar.png';
import { Visibility } from '@mui/icons-material';
import axios from "axios";

const WidgetSm = () => {
  const [newUsers, setNewUsers] = React.useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const TOKEN = user?.accessToken;

        const res = await axios.get("http://localhost:3000/api/users?new=true", {
          headers: {
            token: "Bearer " + TOKEN,
          },
        });

        setNewUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch new users:", error);
      }
    };

    getNewUsers();
  }, []);

  return (
    <div className='widgetSm'>
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user => (
          <li className="widgetSmListItem" key={user._id}>
            <img src={user.profilePic || avatar} alt="" className="widgetSmImage" />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">{user.username}</span>
            </div>
            <button className='widgetSmButton'>
              <Visibility className='widgetSmIcon' />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
