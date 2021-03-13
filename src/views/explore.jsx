import React, { useEffect, useState } from 'react';
import ExploreGroups from '../components/explore/exploregroups';
import ExploreMenu from '../components/explore/exploremenu';
import "../styles/explore/explore.css";
import { useDispatch, useSelector } from 'react-redux';
import { createUserBio, getUserBio, setUserReducer, getUser } from '../actions/userAction';

const Explore = () => {
    let currentUserId = useSelector(state => state.userReducer._id)
    let userBio = useSelector(state => state.userReducer.userBio)
    let createOrLogin = useSelector(state => state.userReducer.create)
    const dispatch = useDispatch();

    useEffect(() => {
        if(createOrLogin == true){
            let data = {
                bio: userBio['bio'],
                phone_number: userBio['phone_number'],
                user: currentUserId,
            }
            data = JSON.stringify(data)
            dispatch(createUserBio(data))
        }else{
            if(currentUserId != null){
                dispatch(getUserBio(currentUserId))
            }
        }
    }, [currentUserId])

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