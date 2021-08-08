import React from 'react'
import { Link } from 'react-router-dom'
import {clearCookies} from "../utils/utils"
import { useHistory } from 'react-router-dom'

const Navbar = () => {
    const history = useHistory()
    const Signout = ()=>{
        history.push("/")
        clearCookies()
    }

    return (
        <header>
            <nav>
                <h3>Nutrify</h3>
                <ul>
                   <li><Link to="/">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li onClick={Signout}><Link to="/">Signout</Link></li>
                    <li><Link to="/dashboard">Dashborad</Link></li>
                    <li><Link to="/addmeal">Add Meal</Link></li>
                    <li><Link to="/edituser">Edit Profile</Link></li>
                    <li><Link to="/admin-dashboard">Admin Dashborad</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
                <div className="overlay">
                    
                </div>
            </nav>
        </header>
    )
}

export default Navbar
