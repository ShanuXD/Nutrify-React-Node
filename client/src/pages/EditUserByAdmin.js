import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const EditUserByAdmin = (props) => {

    const [error, setError] = useState("");
    const history = useHistory()


    const updateUser = async (event)=>{
        event.preventDefault()
        setError("")
        const name = event.target.elements.name.value
        const calories = event.target.elements.calories.value
        event.target.elements.name.value = ""
        event.target.elements.calories.value = ""

        try{

            const id = props.location.state.id;
            const body = {name, calories, id}
            const response = await axios.put("/admin/user/edit", body)

            if(response.data.success){
                history.push("/admin-dashboard")
            }else{
                setError(response.data.error)
            }


        }catch(err){
            setError("Please check if yo are  sign-in")
        }
        

    }


    if(error){
        <h3>{error}</h3>
    }


    return (
        <>
        <AdminNavbar />
        <div className="app-container">
            <form className="form-feild" onSubmit={updateUser}>
                <input type="text" name="name"  required placeholder="Name"/>
                <br />
                <input type="number" step="any" required name="calories" placeholder="Your Calorie Limit"/>
                <br />
                <div className="error-message">{error}</div>
                <button className="btn-update">Update User</button>
                <Link className="btn-cancel" to="/admin-dashboard">Cancel</Link>
            </form>
        </div>
        </>
    )
}

export default EditUserByAdmin
