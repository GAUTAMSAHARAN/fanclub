import React from 'react';
import '../styles/registration.css';
import LogInForm from '../components/forms/registration/login';
import CreateAccount from '../components/forms/registration/createAccount';
import { useSelector } from 'react-redux';


const Registration = () => {
    const loginForm = useSelector(state => state.userReducer.logbool)

    return (
        <>
      <div className="registration-container">
        <div className="registration-form">
          {loginForm == true ? <LogInForm /> : <CreateAccount />}
        </div>
      </div>
        </>
    )
}

export default Registration;