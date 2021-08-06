import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signin = ({ changeUser, changeAuth }) => {
  let history = useHistory();
  const [error, setError] = useState("");
  const signinUser = async (email, password) => {
    const { data } = await axios.post("/", {
      email: email,
      password: password,
    });

    console.log(data);
    if (data.success) {
      const token = data.token;
      document.cookie = `token=${token}`;
      setError("");
      changeUser("user");
      changeAuth(true);
      localStorage.setItem("user-token", token);
      history.push("/dashboard");
    } else {
      setError(data.error);
      if (data.auth === false) {
        changeAuth(false);
      }
    }
  };

  const handelSignIn = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    event.target.elements.email.value = "";
    event.target.elements.password.value = "";
    signinUser(email, password);


  };

  return (
    <div className="app-container">
      <div className="form-feild">
        <h2>Welcome Back!</h2>
        <div className="error-message">
          <span>{error !== "" ? error : null}</span>
        </div>
        <form onSubmit={handelSignIn}>
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
        <div className="name">Email: test@gmail.com</div>
        <div className="password">Password: 12345</div>
      </div>
    </div>
  );
};

export default Signin;

// useEffect(()=>{

//   axios.post("/",{
//     email:"shanu09.sm@gmail.com",
//     password:"12345"
//   }).then(res=>{
//     console.log(res.data)
//     const token = res.data.token
//     document.cookie = `token=${token}`
//     console.log(document.cookie)

//     // axios.get("/dummy",{
//     //   headers:{"x-access-token":document.cookie.split("=")[1]}
//     // }).then((data)=>{
//     //   console.log("dummy:",data.data)
//     // })

//   })

// })
