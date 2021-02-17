import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const Settings = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<i class="fas fa-cog"></i>
                }
            >
                <Modal.Content>
                    <Modal.Description>
                        
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        Cancel
        </Button>
                    <Button
                        content="Save"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => setOpen(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default Settings;