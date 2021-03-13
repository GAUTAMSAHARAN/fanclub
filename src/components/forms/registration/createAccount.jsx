import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import '../../../styles/forms/CreateAccount.css';

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
import { Button, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { formSwticher, createUser, getUser, setUserData } from '../../../actions/userAction';
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Popup } from 'semantic-ui-react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

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

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            format="+91 (###) ###-####"
            isNumericString
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


const CreateAccount = () => {
    let history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.userReducer.loggedIn)
    
    const link = () => {
        dispatch(formSwticher(true))
    }

    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (isLoggedIn == true) {
            dispatch(getUser())
            history.push({
                pathname: `/fanclub/explore`,
            });
        }
    }, [[isLoggedIn]])

    const formik = useFormik({

        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            bio: '',
            numberformat: '0000000000',
        },

        validationSchema: Yup.object({
            username: Yup.string().required("Required"),
            email: Yup.string().email().required("Required"),
            password: Yup.string().required("Required").min(8),
            passwordConfirmation: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),

        onSubmit: values => {
            let data = {
                username: formik.values.username,
                email: formik.values.email,
                password1: formik.values.password,
                password2: formik.values.passwordConfirmation,
            }
            let data2 = {
                bio: formik.values.bio,
                phone_number: formik.values.numberformat,
            }
            console.log(data2)
            data = JSON.stringify(data);
            dispatch(
                createUser(data)
            )
            dispatch(setUserData(data2))
        },

    });

    return (
        <>
            <form className="login-form create" onSubmit={formik.handleSubmit} >
                <div className="form-heading">Create an Account</div>
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
                <TextField
                    id="outlined-basic"
                    className="username-input-field"
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
                <Popup
                    trigger={
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
                    }
                    content='Password must of at least 8 characters and it must contains both numeric and alphabetic values.'
                    position='right center'
                    inverted
                />

                <div className="form-error">{formik.errors.password}</div>
                <TextField
                    id="outlined-basic"
                    className="password-input-field"
                    label="password confirmation"
                    variant="outlined"
                    color="secondary"

                    name="passwordConfirmation"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}

                    InputProps={{
                        classes: {
                            input: classes.input,
                        },
                    }}
                />
                <div className="form-error">{formik.errors.passwordConfirmation}</div>
                <TextareaAutosize
                    className="user-bio-textarea"
                    aria-label="minimum height"
                    rowsMin={3}
                    placeholder="Put something about yourself"
                    name="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                />
                <TextField
                    name="numberformat"
                    value={formik.values.numberformat}
                    onChange={formik.handleChange}
                    id="formatted-numberformat-input"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                />
                <Button
                    icon
                    className="login-submit-button"
                    type="submit"
                >
                    <Icon name='arrow right' />
                </Button>
                <div className="forget-password" onClick={(e) => link()} >
                    ALREADY HAVE AN ACCOUNT?
                </div>
            </form>
        </>
    )
}

export default CreateAccount;