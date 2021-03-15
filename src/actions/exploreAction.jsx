import apiClient from '../config/apiClient';

import {
    GET_GROUPS,
    GET_GROUPS_PENDING,
    GET_GROUPS_ERROR,
    GET_SEARCH_GROUPS,
    SET_SEARCH,
} from './exploreActionType';

import {
    get_all_groups,
    get_coding_groups,
    get_movies_groups,
    get_study_groups,
    search_groups,
} from '../config/urls';

const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType,
        payload: data,
    };
};

const apiError = error => {
    return {
        type: GET_GROUPS_ERROR,
        error
    }
}

function modifyUrl(type) {
    switch (type) {
        case 'Home':
            return get_all_groups;
        case 'Movies':
            return get_movies_groups;
        case "Coding":
            return get_coding_groups;
        case "Study":
            return get_study_groups;
        default:
            return get_all_groups;
    }

}


export const getGroups = (type) => {
    let url = modifyUrl(type);
    return dispatch => {

        dispatch(apiDispatch(GET_GROUPS_PENDING, true));

        apiClient
            .get(url)
            .then(res => {
                dispatch(apiDispatch(GET_GROUPS, res.data));
                dispatch(apiDispatch(GET_GROUPS_PENDING, false));
                dispatch(apiDispatch(SET_SEARCH, false))
                dispatch(apiDispatch(GET_SEARCH_GROUPS, []))
            })
            .catch(error => {
                dispatch(apiError(error))
            })
    }
}


export const getSearchResults = (serachQuery) => {
    let url = search_groups + `${serachQuery}`;
    return dispatch => {
        apiClient
            .get(url)
            .then(res => {
                dispatch(apiDispatch(GET_SEARCH_GROUPS, res.data))
                dispatch(apiDispatch(SET_SEARCH, true))
            })
            .catch(error => {
                console.log(error.response)
            })
    }
}