import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { Button, Icon } from 'semantic-ui-react'
import { GoogleLoginFtn, getUser } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


const GoogleSocialAuth = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.userReducer.loggedIn)
    let history = useHistory();

    useEffect(() => {
        if(isLoggedIn == true){
            dispatch(getUser())

            history.push({
                pathname: `/fanclub/explore`,
              });
        }
    }, [isLoggedIn])

    const responseGoogle = (response) => {
        let data = {
            access_token: response["accessToken"],
            code: response["googleId"],
        }
        data = JSON.stringify(data)
        dispatch(
            GoogleLoginFtn(data)
        )
    }

    return (
        <div className="App">
            <GoogleLogin
                clientId="<put your google client id here>"
                render={renderProps => (
                    <Button
                        className="google-login-button"
                        color='google plus'
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <Icon name='google' /> Google
                    </Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </div>
    )
}


export default GoogleSocialAuth;