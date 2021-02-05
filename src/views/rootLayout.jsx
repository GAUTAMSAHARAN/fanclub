import React from 'react';
import '../styles/rootLayout.css';
import { Container } from 'semantic-ui-react'
import SideMenu from "./sidemenu";
import ROUTES, { RenderRoutes } from "../config/routes";

export default function Layout(props) {
    return (
        <React.Fragment>
            <Container className='layout-container dark'>
                <div className="layout-sidemenu">
                    <SideMenu />
                </div>
                <div className="layout-chatbox">
                    <RenderRoutes routes={ROUTES} />               
                </div>
            </Container>
        </React.Fragment>
    )
}