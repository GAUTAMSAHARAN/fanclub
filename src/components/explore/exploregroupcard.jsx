import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const GroupCard = () => {
    return (
        <>
            <Card className='explore-group-card'>
                <div className="card-cover-img"></div>
                <Card.Content>
                    <div className="profile-icon"></div>
                    <Card.Header><span className='group-card-heading' >Minecraft</span></Card.Header>
                    <Card.Description>
                        <span className='group-card-desc' >Matthew is a musician living in Nashville.</span>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra className='explore-group-card-extra' >
                <i class="fas fa-user"></i>
                22 members
                </Card.Content>
            </Card>
        </>
    )
}

export default GroupCard;