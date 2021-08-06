import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Uers = ({ user, allUsers, updateUsers, updateMessage }) => {
  const [error, setError] = useState("");
  const { _id, name, email, calories } = user;
  const history = useHistory();

  const deleteUser = async () => {
    setError("");
    const response = await axios.delete(`admin/deleteuser/${_id}`);
    if (response.data.success) {
      const newUsers = allUsers.filter((user) => user._id !== _id);
      updateUsers(newUsers);
      updateMessage(response.data.message);
    } else {
      setError(response.data.message);
    }
  };

  const editUser = async () => {
    console.log("edituser-by-admin");
    history.push({
      pathname: "/edituser-by-admin",
      state: { id: _id },
    });
  };

  const showMeals = () => {
    console.log("show-all-meals");
    history.push({
      pathname: "/show-all-meals",
      state: { id: _id },
    });
  };

  return (
    <div className="user-card">
      {<div className="error-message">{error}</div>}
      <div className="name">
        Name: <span>{name}</span>
      </div>
      <div className="email">
        Email: <span>{email}</span>{" "}
      </div>
      <div className="calories">
        Calories: <span>{calories}</span>
      </div>
      <div className="user-btns">
        <button className="btn" onClick={deleteUser}>
          Delete User
        </button>
        <button className="btn" onClick={editUser}>
          Edit User
        </button>
        <button className="btn" onClick={showMeals}>
          User Meals
        </button>
      </div>
    </div>
  );
};

export default Uers;
