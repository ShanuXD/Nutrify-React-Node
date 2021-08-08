import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { clearCookies } from "../utils/utils";
import HomeNavbar from "../components/HomeNavbar"

const Signup = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  const addUser = async (event) => {
    clearCookies();
    setError("");
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const name = event.target.elements.name.value;
    const calories = event.target.elements.calories.value;
    event.target.elements.email.value = "";
    event.target.elements.password.value = "";
    event.target.elements.name.value = "";
    event.target.elements.calories.value = "";

    const body = {
      name,
      email,
      password,
      calories,
    };

    const response = await axios.post("/signup", body);
    console.log(response.data);
    if (response.data.success) {
      history.push("/");
    } else {
      setError(response.data.error);
    }
  };

  return (
    <>
    <HomeNavbar />
    <div className="app-container">
      <div className="form-feild">
        <h2>Create A New Account!</h2>
        {error !== "" && <div>{error}</div>}
        <form onSubmit={addUser}>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
          />
          <br />
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
          />
          <br />
          <input
            required
            type="password"
            name="password"
            id="passwword"
            placeholder="Enter Your Password"
          />
          <br />
          <input
            required
            type="number"
            name="calories"
            step="any"
            id="calories"
            placeholder="Calories"
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
