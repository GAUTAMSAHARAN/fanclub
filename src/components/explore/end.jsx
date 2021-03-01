import React from 'react';
import '../../styles/explore/banner.css'
import Footer from '../../images/footer.svg';

const NoMoreGroups = () => {
    return (
        <>
        <div className="groups-footer">
        <img src={Footer} className="explore-footer-image" />
        <div className="p1">That's the end of the page, Use search to find group that you are interested IN.</div>
        </div>
        </>
    )
}

export default NoMoreGroups;