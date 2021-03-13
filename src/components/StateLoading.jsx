import React from 'react';
import '../styles/StateLoading.css';
import stateLoading from '../images/StateLoading.svg';

const StateLoading = () => {
    return (
        <>
        <div className="state-loading">
        <img src={stateLoading} />
        </div>
        </>
    )
}

export default StateLoading;