import React, { useState, useEffect } from 'react';
import "../../styles/sidemenu/sidemenuOption.css";
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from 'semantic-ui-react'

const CreateGroup = (props) => {
    const active = useSelector(state => state.sidemenuReducer.id)
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Popup
                trigger={
                    <div
                        className={active == props.title ? 'extra extra-active' : 'extra'}
                    >
                        <i class="fas fa-plus extra-plus"></i>
                    </div>
                }
                position='right center'
                offset={[0, 20]}
                inverted
                size='small'
            >
                <Popup.Header>{props.title}</Popup.Header>
            </Popup>
        </React.Fragment>
    )
}

export default CreateGroup;