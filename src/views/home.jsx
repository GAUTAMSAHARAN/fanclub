import React from 'react';
import HomeNavbar from '../components/home/navbar';
import PrivateChannels from '../components/home/privateChannels';
import '../styles/home/index.css';

const Home = () => {
    return(
        <>
            <div className="d-flex w-100 h-100">
                <PrivateChannels />
                <div className="fg-2">
                    <HomeNavbar />
                </div>
            </div>
        </>
    )
}
export default Home;