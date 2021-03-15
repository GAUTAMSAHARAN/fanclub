import React, { useState, useEffect } from 'react';
import "../../styles/sidemenu/sidemenuOption.css";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveElement } from '../../actions/sidemenuAction';
import { Popup } from 'semantic-ui-react'

const ExploreOption = (props) => {
    const active = useSelector(state => state.sidemenuReducer.id)
    const dispatch = useDispatch();


    const setActiveMe = () => {
        dispatch(
            setActiveElement(props.title)
        )
    }

    return (
        <React.Fragment>
            <Popup
                trigger={
                    <div
                        onClick={() => setActiveMe()}
                        className={active == props.title ? 'extra extra-active' : 'extra'}
                    >
                        <i class="fas fa-compass extra-compass"></i>
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

export default ExploreOption;