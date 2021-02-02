import React from 'react';
import '../styles/rootLayout.css';
import { Container } from 'semantic-ui-react'


export default function Layout(){
    return (
        <React.Fragment>
            <Container className='layout-container dark'>
                <div className="layout-sidemenu">
                </div>
                <div className="layout-chatbox">
                </div>
            </Container>
        </React.Fragment>
    )
}