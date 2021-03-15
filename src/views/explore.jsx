import React from 'react';
import ExploreGroups from '../components/explore/exploregroups';
import ExploreMenu from '../components/explore/exploremenu';
import "../styles/explore/explore.css";
import { useDispatch } from 'react-redux';

const Explore = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="explore-outer-div">
                <div className="explore-categories">
                    <ExploreMenu />
                </div>
                <div className="explore-results">
                    <ExploreGroups />
                </div>
            </div>
        </>
    )
}

export default Explore;