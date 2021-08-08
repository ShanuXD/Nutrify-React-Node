import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import HomeNavbar from "../components/HomeNavbar";

const Addmin = ({ changeUser, changeAuth }) => {
  let history = useHistory();
  const [error, setError] = useState("");

  const checkAdmin = async (email, password) => {
    const { data } = await axios.post("/admin/", {
      email: email,
      password: password,
    });

    if (data.success) {
      const token = data.token;
      document.cookie = `admin-token=${token}`;
      setError("");
      history.push("/admin-dashboard");
    } else {
      setError(data.error);
    }
  };

  const handelForm = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    event.target.elements.email.value = "";
    event.target.elements.password.value = "";
    checkAdmin(email, password);
  };

  return (
    <>
    <HomeNavbar />
      <div className="app-container">
        <div className="form-feild">
          <h2>Log-in as Admin!</h2>
          <div className="error-message">
            <span>{error !== "" ? error : null}</span>
          </div>
          <form onSubmit={handelForm}>
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
              type="text"
              name="pssword"
              id="password"
              placeholder="Enter Your Password"
            />
            <br />
            <button>LogIn</button>
          </form>
        </div>
        <div className="test">
          <div className="name">Email: admin@gmail.com</div>
          <div className="password">Password: 12345</div>
        </div>
      </div>
    </>
  );
};

export default Addmin;
