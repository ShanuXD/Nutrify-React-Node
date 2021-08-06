import React from 'react'
import { Route, Redirect } from 'react-router'

const ProtectedRoute = (props) => {
    const {component:Component, checkUser:User, isAuth:Auth, ...rest} = {...props}
    // console.log(Auth, User)
    const admin =localStorage.getItem('admin-token') !==""?true:false;
    const user =localStorage.getItem('user-token') !==""?true:false;
    return (
        <div>
            <Route {...rest} component={(props)=>{
                if(User==="user"){
                    return user && Auth? <Component />: <Redirect to={{ pathname: `/` }} />
                }
                else if(User === "admin"){  
                    return admin && Auth? <Component />: <Redirect to={{ pathname: `/admin` }} />
                }
                else{
                    return <Redirect to={{ pathname: `/signup` }} />
                }
            }}></Route>
        </div>
    )
}

export default ProtectedRoute
