import React, { useEffect } from 'react';
import '../../../styles/forms/login.css';
import { useFormik } from 'formik';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import GoogleSocialAuth from './googleRegistration';
import FacebookSocialAuth from './facebookRegistration';
import { Button, Icon } from 'semantic-ui-react'
import * as Yup from "yup";
import { loginUser, formSwticher, getUser, loginWithCookie, toggleLoggedIn } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        fontFamily: 'RocknRoll One, sans-serif',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '100%',
    },
}));

const LogInForm = () => {
    let history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.userReducer.loggedIn)

    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const link = () => {
        dispatch(formSwticher(false))
    }

    useEffect(() => {
        if (isLoggedIn == true) {
            dispatch(getUser())
            history.push({
                pathname: `/fanclub/explore`,
            });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if(Cookies.get('token') != undefined){
            dispatch(toggleLoggedIn(false))
            dispatch(loginWithCookie(Cookies.get('token')));
        }
    }, [])

    const formik = useFormik({

        initialValues: {
            username: '',
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            username: Yup.string().required("Required"),
            email: Yup.string().email().required("Required"),
            password: Yup.string().required("Required"),
        }),

        onSubmit: values => {
            let data = {
                username: formik.values.username,
                email: formik.values.email,
                password: formik.values.password,
            }
            data = JSON.stringify(data);
            dispatch(loginUser(data));
        },

    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="login-form">
                <div className="form-heading">Sign In</div>
                <TextField
                    id="outlined-basic"
                    className="email-input-field"
                    label="Username"
                    variant="outlined"
                    color="secondary"

                    name="username"
                    type="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}

                    InputProps={{
                        classes: {
                            input: classes.input,
                        },
                    }}
                />
                <div className="form-error">{formik.errors.username}</div>
                <TextField
                    id="outlined-basic"
                    className="email-input-field"
                    label="Email"
                    variant="outlined"
                    color="secondary"

                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}

                    InputProps={{
                        classes: {
                            input: classes.input,
                        },
                    }}
                />
                <div className="form-error">{formik.errors.email}</div>
                <FormControl
                    className={clsx(classes.margin, classes.textField, classes.input)}
                    variant="outlined"
                    color="secondary"
                >
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        color="secondary"

                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}

                        InputProps={{
                            classes: {
                                input: classes.input,
                            },
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <div className="form-error">{formik.errors.password}</div>
                <div className="social-login">
                    <GoogleSocialAuth />
                    <FacebookSocialAuth />
                </div>
                <Button
                    icon
                    className="login-submit-button"
                    type="submit"
                >
                    <Icon name='arrow right' />
                </Button>
                <div className="new-account" onClick={(e) => link()}>
                    CREATE ACCOUNT
        </div>
            </form>
        </>
    )
}

export default LogInForm;