import React from 'react'
import "./user.css"
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material';


const User = () => {
    return (
        <div className='user'>
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>

                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>

            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={avatar} alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowuserName">Anna Becker</span>
                            <span className="userShowuserTitle">Software Engineer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className='userShowIcon' />
                            <span className="userShowInFoTitle">AnnaBeck99</span>
                        </div>

                        <div className="userShowInfo">
                            <CalendarToday className='userShowIcon' />
                            <span className="userShowInFoTitle">10.12.1999</span>
                        </div>

                        <span className="userShowTitle">Contect Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className='userShowIcon' />
                            <span className="userShowInFoTitle">+91 95879 78542</span>
                        </div>

                        <div className="userShowInfo">
                            <MailOutline className='userShowIcon' />
                            <span className="userShowInFoTitle">AnnaBeck99@gmail.com</span>
                        </div>

                        <div className="userShowInfo">
                            <LocationSearching className='userShowIcon' />
                            <span className="userShowInFoTitle"> Delhi | INDIA</span>
                        </div>

                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text" placeholder='AnnaBeck99' className='userUpdateInput' />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input type="text" placeholder='Anna Becker' className='userUpdateInput' />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder='AnnaBeck99@gmail.com' className='userUpdateInput' />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input type="text" placeholder='+91 95879 78542' className='userUpdateInput' />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input type="text" placeholder='Delhi | INDIA' className='userUpdateInput' />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img src={avatar} alt="" className="userUpdateImg" />

                                <label htmlFor="file">
                                    <Publish className='userUpdateIcon' />
                                </label>
                                <input type="file" id='file' style={{ display: "None" }} />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User
