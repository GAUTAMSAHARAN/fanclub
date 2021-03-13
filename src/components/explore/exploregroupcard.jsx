import React, { useEffect, useState } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { joinGroup } from '../../actions/groupAction';
import Avatar from 'react-avatar';
import Cover from '../../images/default-cover.jpg';

const GroupCard = (props) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.userReducer._id)
    const [allowed, setAllowed] = useState(true);

    useEffect(() => {
        if (props.group.members.includes(currentUserId)) {
            setAllowed(false)
        } else if (props.group.admins.includes(currentUserId)) {
            setAllowed(false)
        } else if (props.group.creater == currentUserId) {
            setAllowed(false)
        } else {
            setAllowed(true)
        }
    }, [])

    const join = () => {
        let data = []
        props.group.admins.map((user) => 
            data.push(user.id)
        )
        data.push(currentUserId)

        dispatch(
            joinGroup({admin_array: data}, props.group.id)
        )
    }

    return (
        <>
            <Card className='explore-group-card'>
                <div className="card-cover-img">{props.group.cover == null ? <img className="cover-group" src={Cover} /> : <img className="cover-group" src={props.group.cover} /> }</div>
                <Card.Content>
                    <div className="profile-icon">{props.group.icon == null ? <Avatar size="40" classname="groupOptionAvatar" name={props.group.name} /> : <img className="icon-group" src={props.group.icon} />}</div>
                    <Card.Header><span className='group-card-heading' >{props.group.name}</span></Card.Header>
                    <Card.Description>
                        <span className='group-card-desc' >{props.group.desc}</span>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra className='explore-group-card-extra' >
                    <i class="fas fa-user"></i>
                    {props.group.members.length + props.group.admins.length + 1} members
                </Card.Content>
                <div className="group-card-join-button">
                    {allowed == true
                        ?
                        <Button className="join-button" onClick={() => join()} variant="contained" color="primary" disableElevation>
                            Join
                    </Button>
                        :
                        <Button className="join-button" disabled={true} variant="contained" color="primary" disableElevation>
                            Member
                </Button>
                    }
                </div>
            </Card>
        </>
    )
}

export default GroupCard;