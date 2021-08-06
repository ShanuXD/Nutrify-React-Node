import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import User from "../components/User";

// Alert the user when delting is done

const AdminDashboard = ({changeAuth}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState("")

  const updateUsers = (newUsers) => {
    setAllUsers(newUsers);
  };

  const updateMessage = (message) => {
    setAlertMessage(message);
  };

  const getAllUsers = async () => {
    setIsLoading(true);
    setError("")
    const response = await axios.get("admin/allusers");
    console.log(response.data);
    if (response.data.success) {
      const { users } = response.data;
      setAllUsers(users.length > 0 ? users : []);
    }else{
      setError(response.data.error)
      if(response.data.auth === false){
        changeAuth(false)
        // localStorage.setItem("admin-token", '');
      }
    }


    setIsLoading(false);
    // localStorage.setItem("admin-token", '');
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  if (isLoading) {
    return <Loading />
  }

  if(error){
    return <h3 className="alert-message">Please Sign In Again!</h3>;
  }

  return (
    <div className="container ">
      {alertMessage !== "" && (
        <div className="alert-message">{alertMessage}</div>
      )}
      {allUsers.length === 0 ? (
        <div>No Users Present</div>
      ) : (
        <div className="admin-page">
          {allUsers.map((user, index) => {
            return (
              <User
                key={index}
                user={user}
                allUsers={allUsers}
                updateUsers={updateUsers}
                updateMessage={updateMessage}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
