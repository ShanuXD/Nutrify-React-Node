import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const EditUser = (props) => {

    const [error, setError] = useState("");
    const [user, setUser] = useState({})
    const history = useHistory()


    const editUser = async (event)=>{
        event.preventDefault()
        const newPassword = event.target.elements.newPassword.value
        const oldPassword = event.target.elements.oldPassword.value
        const name = event.target.elements.name.value
        const calories = event.target.elements.calories.value
        event.target.elements.newPassword.value =""
        event.target.elements.oldPassword.value = ""
        event.target.elements.name.value = ""
        event.target.elements.calories.value = ""
        
        const body = {oldPassword, newPassword, name, calories}
        const response = await axios.put("/user", body)

        if(response.data.success){
            // console.log("ok")
            history.push("/dashboard")
        }else{
            setError(response.data.error)
            history.push("/");
        }

    }

    const getUserData = async()=>{
        setError("")
        const response = await axios.get("/user")
        if(response.data.success){
            setUser(response.data.user)
        }else{
            setError(response.data.error)
            history.push("/");
        }
    }

    useEffect(() => {
        getUserData()

    }, [])

    if(error){
        <h3>{error}</h3>
    }


    return (
        <>
        <UserNavbar />
        <div className="app-container">
            <form className="form-feild"
             onSubmit={editUser}>
                <input type="text" name="name"  required placeholder="Name"/>
                <br />
                <input type="number" step="any" required name="calories" placeholder="Your Calorie Limit"/>
                <br />
                <div className="error-message">{error}</div>
                <input type="password" name="oldPassword"  required placeholder="Your Old Password"/>
                <input type="password" name="newPassword"  required placeholder="Your New password"/>
                <button className="btn-update" >Update User</button>
                <Link className="btn-cancel" to="/dashboard">Cancel</Link>
            </form>
        </div>
        </>
    )
}

export default EditUser
