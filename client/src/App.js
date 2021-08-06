import React, { useState, } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AddMeal from "./pages/AddMeal";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/DashBoard";
import EditMeal from "./pages/EditMeal";
import EditUser from "./pages/EditUser";
import EditUserByAdmin from "./pages/EditUserByAdmin";
import ShowAllMeals from "./pages/ShowAllMeals";
import ProtectedRoute from "./routers/ProtectedRoute";
import "./styles/style.scss";

function App() {
  const [checkUser, setCheckUser] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const changeUser = (name) => {
    setCheckUser(name);
  };
  const changeAuth = (auth) => {
    setIsAuth(auth);
  };


  // useEffect(() => {
  //   if(localStorage.getItem('admin-token')){
  //     console.log('yo admin')
  //     changeUser("admin")
  //     setIsAuth(true);
  //   }
  //   else if(localStorage.getItem('admin-token')){
  //     console.log('yo ')
  //     changeUser("user")
  //     setIsAuth(true);
  //   }
    
  // }, [])

  return (
    <div className="App">
      <Router>
        <Navbar
          changeUser={changeUser}
          changeAuth={changeAuth}
          checkUser={checkUser}
          isAuth={isAuth}
        />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route
            exact
            path="/"
            component={() => (
              <Signin changeUser={changeUser} changeAuth={changeAuth} />
            )}
          />
          <Route
            path="/admin"
            component={() => (
              <Admin changeUser={changeUser} changeAuth={changeAuth} />
            )}
          />
          <ProtectedRoute
            path="/dashboard"
            component={() => <Dashboard changeAuth={changeAuth} />}
            isAuth={isAuth}
            checkUser={checkUser}
          />
          <ProtectedRoute
            path="/admin-dashboard"
            component={() => <AdminDashboard changeAuth={changeAuth} />}
            isAuth={isAuth}
            checkUser={checkUser}
          />
          <ProtectedRoute
            path="/addmeal"
            component={() => <AddMeal changeAuth={changeAuth} />}
            isAuth={isAuth}
            checkUser={checkUser}
          />
          <ProtectedRoute
            path="/edituser"
            component={EditUser}
            isAuth={isAuth}
            checkUser={checkUser}
          />
          {/* <ProtectedRoute
            path="/edituser-by-admin"
            component={EditUserByAdmin}
            isAuth={isAuth}
            checkUser={checkUser}
          /> */}
          {/* <ProtectedRoute
              path="/editmeal"
              component={EditMeal}
              isAuth={isAuth}
              checkUser={checkUser}
            /> */}
          {/* <ProtectedRoute
            path="/show-all-meals"
            component={ShowAllMeals}
            isAuth={isAuth}
            checkUser={checkUser}
          /> */}
          <Route path="/editmeal" component={EditMeal} />
          <Route path="/show-all-meals" component={ShowAllMeals} />
          <Route  path="/edituser-by-admin" component={EditUserByAdmin} />
          {/* <Route  path="/edituser" component={EditUser} /> */}
          {/* <Route  path="/dashboard" component={Dashboard} /> */}
          {/* <Route  path="/admin-dashboard" component={AdminDashboard} /> */}
          {/* <Route  path="/addmeal" component={AddMeal} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
