import React, { useEffect } from 'react';
import '../styles/rootLayout.css';
import '../styles/variables.css';
import { Container } from 'semantic-ui-react'
import SideMenu from "./sidemenu";
import ROUTES, { RenderRoutes } from "../config/routes";
import { useDispatch, useSelector } from 'react-redux';
import { setUserReducer, getUser, getAllUsers } from '../actions/userAction'
import Cookies from 'js-cookie';
import { getUserGroup } from '../actions/groupAction';

export default function Layout(props) {
    const loggedIn = useSelector(state => state.userReducer.loggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (Cookies.get('token') != undefined) {
            dispatch(
                setUserReducer(Cookies.get('token'))
            )
            dispatch(
                getUser()
            )
        }
        dispatch(
            getUserGroup()
        )
        dispatch(
            getAllUsers()
        )
    }, [])

    return (
        <React.Fragment>
            <Container className='layout-container dark variables' id="root-layout">
                <div style={{ display: loggedIn == true ? 'block' : 'none' }} className="layout-sidemenu">
                    <SideMenu />
                </div>
                <div className="layout-chatbox">
                    <RenderRoutes routes={ROUTES} />
                </div>
            </Container>
        </React.Fragment>
    )
}