import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import {FaBars} from "react-icons/fa"

const HomeNavbar = () => {
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

    return (
        <header>
            <nav>
                <h3>Nutrify</h3>
                <ul>
                   <li><Link to="/">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
                <FaBars className="menu" onClick={handelMenu} />
                <div ref={overlayRef} className="hide-menubox">
                  <div className="overlay__container">
                    <div className="link"><Link to="/">Sign In</Link></div>
                    <div className="link"><Link to="/signup">Sign Up</Link></div>
                    <div className="link"><Link to="/admin">Admin</Link></div>
                  </div>
                </div>
            </nav>
        </header>
    )
}

export default HomeNavbar
