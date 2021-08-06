import React from 'react'
import { Link } from 'react-router-dom'
import {clearCookies} from "../utils/utils"
import { useHistory } from 'react-router-dom'
import { Route, Redirect } from 'react-router'

const Navbar = ({changeUser, changeAuth, checkUser:user, isAuth:auth}) => {
    const history = useHistory()
    const Signout = ()=>{
        history.push("/")
        changeUser("")
        changeAuth(false)
        clearCookies()
    }

    return (
        <header>
            <nav>
                <h3>Nutify</h3>
                <ul>
                    {auth===false?<li><Link to="/">Sign In</Link></li>:null}
                    {auth===false?<li><Link to="/signup">Sign Up</Link></li>:null}
                    {auth === true?<li onClick={Signout}><Link to="/">Signout</Link></li>:null}
                    {user==="user" && auth === true?<li><Link to="/dashboard">Dashborad</Link></li>:null}
                    {user==="user" && auth === true?<li><Link to="/addmeal">Add Meal</Link></li>:null}
                    {user==="user" && auth === true?<li><Link to="/edituser">Edit Profile</Link></li>:null}
                    {user==="admin" && auth === true?<li><Link to="/admin-dashboard">Admin Dashborad</Link></li>:null}
                    {auth === false?<li><Link to="/admin">Admin</Link></li>:null}

                </ul>
            </nav>
        </header>
    )
}

export default Navbar
