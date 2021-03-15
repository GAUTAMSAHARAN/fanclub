import React from 'react';
import LoadingSvg from '../images/Pulse-1s-200px.svg';
import '../styles/loading.css';

const Loading = () => {
    return (
        <>
        <div className="loading">
        <img src={LoadingSvg} />
        </div>
        </>
    )
}

export default Loading;