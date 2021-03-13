import apiClient from '../config/apiClient';
import { toast } from 'react-toastify';

import {
    CREATE_GROUP_PENDING,
    SHOW_GROUP_ERROR,
    GET_USER_GROUPS,
    JOIN_GROUP,
    CURRENT_GROUP,
    CURRENT_GROUP_MESSAGES,
    CURRENT_GROUP_ID,
    ADD_NEW_MESSAGE,
    MAKE_ADMIN,
    MAKE_MEMBER,
    REMOVE_ADMIN,
    REMOVE_MEMBER,
    DELETE_MESSAGE,
    EDIT_MESSAGE,
    SET_CURRENT_GROUP_CREATER,
    SET_NEW_IMAGE_MESSAGE,
} from './groupActionType';

import {
    create_group,
    get_user_data,
    get_user_groups,
    join_group,
    update_group,
    delete_msg,
    delete_group,
    get_current_group,
    create_new_message,
} from '../config/urls';

const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType,
        payload: data,
    };
};

const apiError = error => {
    return {
        type: SHOW_GROUP_ERROR,
        error
    }
}

export const createGroup = (data) => {
    let url = create_group;
    return (dispatch) => {
        dispatch(apiDispatch(CREATE_GROUP_PENDING, true));
        apiClient
            .post(url, data)
            .then(res => {
                dispatch(apiDispatch(JOIN_GROUP, res.data))
                toast.success(`${res.data.name} is successfully created.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                dispatch(apiError(error));
                toast.error('Something went wrong while creating your group.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        dispatch(apiDispatch(CREATE_GROUP_PENDING, false));
    }
}

export const getUserGroup = () => {
    let url = get_user_groups;
    return (dispatch) => {
        apiClient
            .get(url)
            .then(res => {
                dispatch(apiDispatch(GET_USER_GROUPS, res.data));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const joinGroup = (data, id) => {
    let url = join_group + `${id}` + '/updatemember/';
    return (dispatch) => {
        apiClient
            .patch(url, data)
            .then(res => {
                dispatch(apiDispatch(JOIN_GROUP, res.data));
                toast.success(`${res.data.name} is successfully Joined.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                dispatch(apiError(error));
                toast.error('Something went wrong while joining this group.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
}
export const makeMember = (data, id) => {
    let url = join_group + `${id}` + '/updatemember/';
    return (dispatch) => {
        apiClient
            .patch(url, data)
            .then(res => {
                dispatch(apiDispatch(JOIN_GROUP, res.data));
                toast.success(`${res.data.name} is now a member of this group.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                dispatch(apiError(error));
                toast.error('Something went wrong while making a user member.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
}

export const makeAdmin = (data, id) => {
    let url = join_group + `${id}` + '/updateadmins/';
    return (dispatch) => {
        apiClient
            .patch(url, data)
            .then(res => {
                dispatch(apiDispatch(JOIN_GROUP, res.data));
                toast.success(`${res.data.name} is now an admin of this group.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                dispatch(apiError(error));
                toast.error('Something went wrong while making a user admin of this group', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
}

export const updateGroup = (data, id) => {
    let url = update_group + `${id}` + '/';
    return dispatch => {
        apiClient
            .patch(url, data)
            .then(res => {
                dispatch(apiDispatch(CURRENT_GROUP, res.data))
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const currentGroup = (data) => {
    return dispatch => {
        dispatch(apiDispatch(CURRENT_GROUP, data));
    }
}

export const currentGroupMessages = (data) => {
    return dispatch => {
        dispatch(apiDispatch(CURRENT_GROUP_MESSAGES, data));
    }
}

export const currentGroupId = (data) => {
    return dispatch => {
        dispatch(apiDispatch(CURRENT_GROUP_ID, data));
    }
}

export const AddMessage = (data) => {
    return dispatch => {
        dispatch(apiDispatch(ADD_NEW_MESSAGE, data));
    }
}

function removeItem(array, user) {
    return array.filter((obj) => obj !== user)
}

function removeMessage(array, id) {
    return array.filter((obj) => obj.id !== id)
}

export const deleteMessage = (currentMessages, id) => {
    let newCurrentGroupMessages = removeMessage(currentMessages, id)
    let url = delete_msg + `${id}/`;
    return dispatch => {
        apiClient
            .delete(url)
            .then(res => {
                dispatch(apiDispatch(DELETE_MESSAGE, newCurrentGroupMessages));
            })
            .catch(error => {
                console.log(error.response);
            })
    }
}

function editMessage(array, msg, id) {
    return array.map((item) => {
        if (item.id !== id) {
            return item
        }
        else {
            item.message = msg.message
            return item
        }
    })
}

export const editMessageHandler = (currentMessages, id, data) => {
    let newCurrentGroupMessages = editMessage(currentMessages, data, id)
    let url = delete_msg + `${id}/`;
    data = JSON.stringify(data);
    return dispatch => {
        apiClient
            .patch(url, data)
            .then(res => {
                console.log(res)
                dispatch(apiDispatch(EDIT_MESSAGE, newCurrentGroupMessages))
            })
            .catch(error => {
                console.log(error);
            })
    }
}


export const deleteGroup = (id, data) => {
    let url = delete_group + `${id}`;
    return dispatch => {
        apiClient
            .delete(url)
            .then(res => {
                dispatch(setCurrentUserGruop(data))
                toast.success(`Group has been successfully deleted.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.log(error.response)
            })
    }
}

export const getCurrentGroup = (id) => {
    let url = get_current_group + `${id}/`;
    return dispatch => {
        apiClient
            .get(url)
            .then(res => {
                dispatch(currentGroupId(res.data.id))
                dispatch(currentGroup(res.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const setCurrentUserGruop = (data) => {
    return dispatch => {
        dispatch(apiDispatch(GET_USER_GROUPS, data))
    }
}

export const getCurrentGroupCreater = (id) => {
    let url = '/users/' + `${id}/`;
    return dispatch => {
        apiClient
            .get(url)
            .then(res => {  
                dispatch(apiDispatch(SET_CURRENT_GROUP_CREATER, res.data))
            })
            .catch(error => {
                console.log(error.response)
            })
    }
}


export const createMessage = (data) => {
    let url  = create_new_message;
    return dispatch => {
        apiClient
            .post(url, data)
            .then(res => {
                dispatch(apiDispatch(SET_NEW_IMAGE_MESSAGE, res.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const resetImageMessage = () => {
    return dispatch => {
        dispatch(apiDispatch(SET_NEW_IMAGE_MESSAGE,null))
    }
}