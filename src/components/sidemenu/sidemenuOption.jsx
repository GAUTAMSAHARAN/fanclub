import React, {useState, useEffect} from 'react';
import "../../styles/sidemenu/sidemenuOption.css";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveElement } from '../../actions/sidemenuAction';

const SideMenuOption = (props) => {
    const active = useSelector(state => state.sidemenuReducer.id)
    const dispatch = useDispatch();


    const setActiveMe = () => {
        dispatch(
            setActiveElement(props.title)
        )
    }

    return (
        <React.Fragment>
            <div 
            onClick = {() => setActiveMe()}
            className={active == props.title ? 'sidemenuoption active': 'sidemenuoption'}
            >
            </div>
        </React.Fragment>
    )
}

export default SideMenuOption;