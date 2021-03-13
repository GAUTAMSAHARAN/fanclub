import React from  'react';
import {Divider} from 'semantic-ui-react';
import '../../../styles/divider.css';

const DateDivider  = (props) => {
    return (
        <>
            <Divider className="msg-divider" horizontal>{props.date}</Divider>
        </>
    )
}

export default DateDivider;