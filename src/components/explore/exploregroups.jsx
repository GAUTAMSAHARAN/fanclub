import React from 'react';
import "../../styles/explore/exploregroups.css";
import ExploreCover from '../../images/explore_cover_image.svg';
import GroupCard from './exploregroupcard';
import { Card } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

const ExploreGroups = () => {
    return (
        <>
            <div className="explore-search">
                <img src={ExploreCover} className="explore-cover-image" />
                <div className="group-searchbar">
                    <div className="group-search-heading-primary">Find your place on Discord</div>
                    <div className="group-search-heading-secondary">From Movies, to Coding, to Study, there's a place for you.</div>
                    <div className="group-search-input"><Input icon='search' className='group-find' placeholder='Search...' /></div>
                </div>
            </div>
            <div className="explore-heading">
                Featured communities
            </div>
            <div className="explore-groups">
                <Card.Group itemsPerRow={5}>
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                </Card.Group>
            </div>
        </>
    )
}

export default ExploreGroups;