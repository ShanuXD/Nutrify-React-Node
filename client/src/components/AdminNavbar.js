import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import {clearCookies} from "../utils/utils"
import { useHistory } from 'react-router-dom'
import {FaBars} from "react-icons/fa"


export const AdminNavbar = () => {
    const overlayRef = useRef(null)

    const handelMenu = ()=>{
        if(overlayRef.current.classList.contains("overlay")){
            overlayRef.current.classList.remove("overlay")
            overlayRef.current.classList.add("hide-menubox")
        }
        else{
            overlayRef.current.classList.add("overlay")
            overlayRef.current.classList.remove("hide-menubox")
        }
    }



    const history = useHistory()
    const Signout = ()=>{
        history.push("/")
        clearCookies()
    }
    return (
        <div>
            <header>
            <nav>
                <h3>Nutrify</h3>
                <ul>
                    <li onClick={Signout}><Link to="/">Signout</Link></li>
                    <li><Link to="/admin-dashboard">Admin Dashborad</Link></li>
                </ul>
                <FaBars className="menu" onClick={handelMenu} />
                <div ref={overlayRef} className="hide-menubox">
                  <div className="overlay__container">
                    <div className="link"><Link to="/">Signout</Link></div>
                    <div className="link"><Link to="/admin-dashboard">Admin Dashborad</Link></div>
                  </div>
                </div>
            </nav>
        </header>
        </div>
    )
}


export default AdminNavbar