import React from 'react';
import '../styles/rootLayout.css';
import '../styles/variables.css';
import { Container } from 'semantic-ui-react'
import SideMenu from "./sidemenu";
import ROUTES, { RenderRoutes } from "../config/routes";
import Explore from './explore';
import Chatroom from './chatroom';

export default function Layout(props) {
    return (
        <React.Fragment>
            <Container className='layout-container dark variables'>
                <div className="layout-sidemenu">
                    <SideMenu />
                </div>
                <div className="layout-chatbox">
                    {/* <RenderRoutes routes={ROUTES} />                */}
                    <Chatroom />
                </div>
            </Container>
        </React.Fragment>
    )
}