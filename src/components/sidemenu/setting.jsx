import React from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import {LogOut} from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const Settings = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const logout = () => {
        Cookies.remove('token', { path: '/'});
        dispatch(LogOut())
        history.push({
            pathname: `/`,
        });
    }

    return (
        <>
        <i class="fas fa-power-off" onClick={logout}></i>
        </>
    )
}

export default Settings;