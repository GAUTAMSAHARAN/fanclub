import React from 'react';
import '../styles/rootLayout.css';
import '../styles/variables.css';
import { Container } from 'semantic-ui-react'
import SideMenu from "./sidemenu";
import ROUTES, { RenderRoutes } from "../config/routes";
import { useSelector } from 'react-redux';


export default function Layout(props) {
    const loggedIn = useSelector(state => state.userReducer.loggedIn)
    return (
        <React.Fragment>
            <Container className='layout-container dark variables'>
                <div style={{display: loggedIn == true ? 'block' : 'none' }} className="layout-sidemenu">
                    <SideMenu />
                </div>
                <div className="layout-chatbox">
                    <RenderRoutes routes={ROUTES} />               
                </div>
            </Container>
        </React.Fragment>
    )
}