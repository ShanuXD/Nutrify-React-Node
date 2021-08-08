import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import "./styles/style.css";
// import "./styles/style.scss";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./routers/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin} />
          <Route path="/addmeal" component={AddMeal} />
          <Route path="/editmeal" component={EditMeal} />
          <Route path="/show-all-meals" component={ShowAllMeals} />
          <Route path="/edituser-by-admin" component={EditUserByAdmin} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/edituser" component={EditUser} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          {/* <ProtectedRoute
            path="/dashboard"
            component={() => <Dashboard changeAuth={changeAuth} />}
            isAuth={isAuth}
            checkUser={checkUser}
          /> */}
          {/* <ProtectedRoute
            path="/admin-dashboard"
            component={() => <AdminDashboard changeAuth={changeAuth} />}
            isAuth={isAuth}
            checkUser={checkUser}
          /> */}
          {/* <ProtectedRoute
            path="/addmeal"
            component={() => <AddMeal changeAuth={changeAuth} />}
            isAuth={isAuth}
            checkUser={checkUser}
          /> */}
          {/* <ProtectedRoute
            path="/edituser"
            component={EditUser}
            isAuth={isAuth}
            checkUser={checkUser}
          /> */}
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
