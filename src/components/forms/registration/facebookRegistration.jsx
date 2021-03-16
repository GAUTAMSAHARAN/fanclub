import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { FacebookLoginFtn, getUser } from '../../../actions/userAction';
import { useHistory } from "react-router-dom";


const FacebookSocialAuth = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const isLoggedIn = useSelector(state => state.userReducer.loggedIn)

    useEffect(() => {
        if(isLoggedIn == true){
            dispatch(getUser())

            history.push({
                pathname: `/fanclub/explore`,
              });
        }
    }, [isLoggedIn]);


    const responseFacebook = (response) => {
        let data = {
            access_token: response["accessToken"],
            code: response["userID"]
        }
        data = JSON.stringify(data)
        dispatch(
            FacebookLoginFtn(data)
        )
    }
    return (
        <div className="App">
            <FacebookLogin
                appId="<put your facebook app id here>"
                callback={responseFacebook}
                render={renderProps => (
                    <Button
                        className="facebook-login-button"
                        color='facebook'
                        onClick={renderProps.onClick}
                    >
                        <Icon name='facebook' /> Facebook
                    </Button>
                )}
            />
        </div>
    );
}

export default FacebookSocialAuth;


