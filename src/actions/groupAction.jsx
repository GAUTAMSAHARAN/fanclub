import apiClient from '../config/apiClient';

import {
    CREATE_GROUP,
    CREATE_GROUP_PENDING,
    SHOW_GROUP_ERROR,
    GET_USER_GROUPS,
    JOIN_GROUP,
    CURRENT_GROUP,
} from './groupActionType';

import {
    create_group,
    get_user_groups,
    join_group,
    update_group,
} from '../config/urls';
import update from 'react-addons-update';

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
            })
            .catch(error => {
                dispatch(apiError(error));
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
    let url = join_group + `${id}` + '/';
    return (dispatch) => {
        apiClient
            .patch(url, data)
            .then(res => {
                dispatch(apiDispatch(JOIN_GROUP, res.data));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const updateGroup = (data, id) => {
    let url =  update_group + `${id}` + '/' ;
    return dispatch => {
        apiClient
            .patch(url, data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const currentGroup = (data) => {
    return dispatch => {
        dispatch(apiDispatch(CURRENT_GROUP,  data));
    }
}