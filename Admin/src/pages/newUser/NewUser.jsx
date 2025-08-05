import React from 'react'
import "./newUser.css"

const NewUser = () => {
    return (
        <div className='newUser'>
            <h1 className="newUserTitle">
                New User
            </h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label> User Name</label>
                    <input type="text" placeholder='John' />
                </div>

                <div className="newUserItem">
                    <label> Full Name</label>
                    <input type="text" placeholder='John Smith' />
                </div>

                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder='John@gmail.com' />
                </div>

                <div className="newUserItem">
                    <label> Password </label>
                    <input type="password" placeholder='Password' />
                </div>

                <div className="newUserItem">
                    <label> Phone </label>
                    <input type="text" placeholder='+91 95874 87458' />
                </div>

                <div className="newUserItem">
                    <label> Address </label>
                    <input type="text" placeholder='Delhi | INDIA' />
                </div>

                <div className="newUserItem">
                    <label> Gender </label>
                    <div className="newUserGender">
                    <input type="radio" name='Gender' id='male' value="male" />
                    <label For="male">Male</label>

                    <input type="radio" name='Gender' id='female' value="female" />
                    <label For="female">Female</label>

                    <input type="radio" name='Gender' id='other' value="other" />
                    <label For="other">Other</label>
                    </div>
                </div>

                <div className="newUserItem">
                    <label>Active</label>
                    <select name="active" id="active" className='newUserSelect'>
                        <option value="y">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <button className="newUserButton">
                    Create
                </button>
            </form>
        </div>
    )
}

export default NewUser
