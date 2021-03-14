import React, {useEffect, useState} from 'react';
import ChatBox from '../components/chatroom/chatbox';
import Members from '../components/chatroom/chatmembers';
import MediaHeader from '../components/chatroom/mediaheader';
import ChatNavbar from '../components/chatroom/navbar';
import "../styles/chatroom/chatroomlayout.css";
import { useDispatch, useSelector } from 'react-redux';
import {getCurrentGroup, setUserRole} from '../actions/groupAction';

const Chatroom = ({match}) => {
    const dispatch = useDispatch();
    const [id, setId]= useState(parseInt(match.params.id))
    const group = useSelector(state => state.groupReducer.currentGroup)
    const user = useSelector(state => state.userReducer.user)
    
    useEffect(() => {
        if(group.length != 0 && user != null){
            const isUserAdmin = group.admins && group.admins.some(ele => ele.id == user.pk)
            const isUserMember = group.members && group.members.some(ele => ele.id == user.pk)
            const isUserCreater = group.creater && group.creater == user.pk
            const data = {
                admin: isUserAdmin,
                creater: isUserCreater,
                member: isUserMember
            }
            dispatch(setUserRole(data))
        }
    }, [group, user])

    useEffect(() => {
        setId(parseInt(match.params.id))
    }, [match])

    useEffect(() => {
        dispatch(getCurrentGroup(id))
    }, [id])

    return (
        <>
        <div className="chatroom-layout">
            <div className="chatroom-media">
                <MediaHeader />
            </div>
            <div className="chatroom-chatbox">
                <div className="chatroom-navbar">
                    <ChatNavbar />
                </div>
                <div className="chatroom-main">
                    <div className="outer-chatbox">
                        <ChatBox />
                    </div>
                    <div className="outer-members">
                        <Members />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Chatroom;