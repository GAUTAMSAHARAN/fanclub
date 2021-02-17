import React, { useState } from 'react';
import "../../styles/explore/exploremenu.css";
import { Menu, Icon } from 'semantic-ui-react'

const ExploreMenu = () => {
    const [activeItem, setActiveItem] = useState('Home')

    const handleItemClick = (option) => {
        setActiveItem(option)
    }

    return (
        <>
            <div className="exploremenu">
                <div className="exploremenu-heading">Discover</div>
                <Menu secondary vertical>
                    <Menu.Item
                        name='Home'
                        active={activeItem === 'Home'}
                        onClick={() => handleItemClick('Home')}
                    >
                        <Icon className='explore-menu-icon' name='compass' />
                        <span className="exploremenu-option">Home</span>
                    </Menu.Item>
                    <Menu.Item
                        name='Movies'
                        active={activeItem === 'Movies'}
                        onClick={() => handleItemClick('Movies')}
                    >
                        <Icon className='explore-menu-icon' name='video' />
                        <span className="exploremenu-option">Movies</span>
                    </Menu.Item>
                    <Menu.Item
                        name='Coding'
                        active={activeItem === 'Coding'}
                        onClick={() => handleItemClick('Coding')}
                    >
                        <Icon className='explore-menu-icon' name='keyboard' />
                        <span className="exploremenu-option">Coding</span>
                    </Menu.Item>
                    <Menu.Item
                        name='Study'
                        active={activeItem === 'Study'}
                        onClick={() => handleItemClick('Study')}
                    >
                        <Icon className='explore-menu-icon' name='pencil alternate' />
                        <span className="exploremenu-option">Study</span>
                    </Menu.Item>
                </Menu>
            </div>
        </>
    )
}

export default ExploreMenu;