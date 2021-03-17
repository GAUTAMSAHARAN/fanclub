import apiClient from '../config/apiClient';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

import {
    PATCH_BIO,
    PATCH_PHONE,
    PATCH_USERNAME,
    GET_USER_ERROR,
    GET_USER,
    LOGIN_PENDING,
    SET_TOKEN,
    LOGIN_BOOL,
    CREATE_USER_PENDING,
    LOGGEDINORNOT,
    SET_ID,
    SETS_USER_BIO,
    CREATE_OR_LOGIN,
    GET_ALL_USERS,
} from './userActionType';

import {
    GET_USER_GROUPS,
} from './groupActionType'

import {
    update_user,
    login,
    registration,
    googleLogin,
    facebookLogin,
    get_user,
    get_user_groups,
    create_user_bio,
    update_bio,
    all_users,
} from '../config/urls';
import axios from 'axios';


const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType,
        payload: data,
    };
};

const apiError = error => {
    return {
        type: GET_USER_ERROR,
        error
    }
}

export const getUser = (data2) => {
    let url = get_user;
    return (dispatch) => {
        apiClient
            .get(url)
            .then(res => {
                dispatch(apiDispatch(GET_USER, res.data));
                dispatch(apiDispatch(SET_ID, res.data.pk));
                dispatch(getUserGroup())
                if(data2 != undefined){
                    data2.user = res.data.pk
                    data2 = JSON.stringify(data2)
                    dispatch(createUserBio(data2))
                }
            })
            .catch(error => {
                dispatch(apiError(error));
            })
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


export const createUserBio = (data) => {
    let url = create_user_bio;
    return dispatch => {
        apiClient
            .post(url, data)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export const changeUsername = (username, id) => {
    let url = update_user + `${id}/`;
    let data = {
        'username': username
    }
    data = JSON.stringify(data)
    return dispatch => {
        apiClient
            .patch(url, data)
            .then(res => {
                dispatch(apiDispatch(PATCH_USERNAME, username));
                toast.success('Your Username has been successfully updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const changePhone = (phone, id) => {
    let url = update_bio + `${id}/`;
    let data = {
        phone_number: phone
    }
    data = JSON.stringify(data)
    return dispatch => {
        apiClient
            .patch(url, data)
            .then(res => {
                dispatch(apiDispatch(PATCH_PHONE, res.data));
                toast.success('Your Phone Number has been successfully updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const changeBio = (bio, id) => {
    let url = update_bio + `${id}/`;
    let data = {
        bio: bio
    }
    data = JSON.stringify(data)
    return dispatch => {
        apiClient
            .patch(url, data)
            .then(res => {
                dispatch(apiDispatch(PATCH_BIO, res.data));
                toast.success('Your Bio has been successfully updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const loginWithCookie = (data) => {
    return dispatch => {
        dispatch(apiDispatch(SET_TOKEN, data));
        dispatch(apiDispatch(LOGGEDINORNOT, true));
        toast.success('Welcome back, Logged In Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const toggleLoggedIn = (data) => {
    return dispatch => {
        dispatch(apiDispatch(LOGGEDINORNOT, data))
    }
}

export const loginUser = (data) => {
    let url = login;
    return dispatch => {
        dispatch(apiDispatch(LOGIN_PENDING, true));
        axios({
            method: "post",
            url: url,
            data: data,
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(res => {
                dispatch(apiDispatch(SET_TOKEN, res.data.key));
                dispatch(apiDispatch(LOGGEDINORNOT, true));
                dispatch(apiDispatch(LOGIN_PENDING, false));
                toast.success('Welcome back, Logged In Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                Cookies.set('token', res.data.key, { expires: 7 });
            })
            .catch(error => {
                toast.error(`${error.response.data.non_field_errors[0]}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(apiError(error));
            })
    }
}

export const formSwticher = (data) => {
    return dispatch => {
        dispatch(apiDispatch(LOGIN_BOOL, data));
    }
}

export const createUser = (data, data2) => {
    let url = registration;
    return dispatch => {
        dispatch(apiDispatch(CREATE_USER_PENDING, true));
        axios({
            method: "post",
            url: url,
            data: data,
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(res => {
                dispatch(apiDispatch(SET_TOKEN, res.data.key));
                dispatch(apiDispatch(LOGGEDINORNOT, true));
                dispatch(apiDispatch(CREATE_OR_LOGIN, true))
                dispatch(getUser(data2))
                toast.success('Welcome, Your account is successfully created.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                Cookies.set('token', res.data.key, { expires: 7 });
            })
            .catch(error => {
                console.log(error.response)
                if (error.response.data.password1 != undefined) {
                    console.log('hello')
                    toast.error(`${error.response.data.password1}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if (error.response.data.username != undefined) {
                    toast.error(`${error.response.data.username}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if (error.response.data.email != undefined) {
                    toast.error(`${error.response.data.email}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                dispatch(apiError(error));
            })

        dispatch(apiDispatch(CREATE_USER_PENDING, false));
    }
}

export const GoogleLoginFtn = (data) => {
    let url = googleLogin;
    return dispatch => {
        axios({
            method: "POST",
            url: url,
            data: data,
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(res => {
                dispatch(apiDispatch(SET_TOKEN, res.data.key));
                let data = {
                    bio: '',
                    phone_number: '',
                }
                dispatch(getUser(data))
                dispatch(apiDispatch(LOGGEDINORNOT, true));
                toast.success('Welcome back, Logged In Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                Cookies.set('token', res.data.key, { expires: 7 });

            })
            .catch(error => {
                dispatch(apiError(error));
                toast.error(`User is already signed In with this email, try to login with either facebook or fill the form`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
}

export const FacebookLoginFtn = (data) => {
    let url = facebookLogin;
    return dispatch => {
        axios({
            method: "POST",
            url: url,
            data: data,
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(res => {
                dispatch(apiDispatch(SET_TOKEN, res.data.key));
                dispatch(apiDispatch(LOGGEDINORNOT, true));
                let data = {
                    bio: '',
                    phone_number: '',
                }
                dispatch(getUser(data))
                toast.success('Welcome back, Logged In Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                Cookies.set('token', res.data.key, { expires: 7 });
            })
            .catch(error => {
                dispatch(apiError(error));
                toast.error(`User is already signed In with this email, try to login with either google or fill the form`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
}

export const LogOut = () => {
    return dispatch => {
        dispatch(apiDispatch(SET_TOKEN, ''))
        dispatch(apiDispatch(LOGGEDINORNOT, false))
        dispatch(apiDispatch(LOGIN_BOOL, true))
        dispatch(apiDispatch(CREATE_OR_LOGIN, false))
    }
}


export const setUserData = (data) => {
    return dispatch => {
        dispatch(apiDispatch(SETS_USER_BIO, data))
    }
}

export const setUserReducer = (token) => {
    return dispatch => {
        dispatch(apiDispatch(SET_TOKEN, token));
        dispatch(apiDispatch(LOGGEDINORNOT, true));
        dispatch(apiDispatch(LOGIN_PENDING, false));
    }
}

export const getAllUsers = () => {
    let url = all_users;
    return dispatch => {
        apiClient
            .get(url)
            .then(res => {
                dispatch(apiDispatch(GET_ALL_USERS, res.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}