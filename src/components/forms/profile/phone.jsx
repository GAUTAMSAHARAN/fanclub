import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changePhone } from '../../../actions/userAction';

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


const Phone = (props) => {

    const [id, setId] = useState('')
    const currentUserId = useSelector(state => state.userReducer._id)
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('')
    const [bioId, setBioId] = useState(null)

    
    useEffect(() => {
      if(props.user_id != undefined){
          setId(props.user_id)
      }
      if(props.bio != undefined){
        setPhone(props.bio.phone_number)
        setBioId(props.bio.id)
      }
  }, [])


    const formik = useFormik({
        initialValues: {
            numberformat: phone,
        },
        enableReinitialize: true,
        onSubmit: values => {
          dispatch(
            changePhone(values.numberformat, bioId)
          )
        }
    });

  
    return (
        <>

            <form onSubmit={formik.handleSubmit} >
                <div className="data-container">
                    <TextField
                        name="numberformat"
                        value={formik.values.numberformat}
                        onChange={formik.handleChange}
                        id="formatted-numberformat-input"
                        disabled = {id == currentUserId ? false : true}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                    {
                        id == currentUserId ? <Button type="submit" className="save-button-profile" variant="contained" color="primary" disableElevation>
                            Save
                    </Button> : ''
                    }
                </div>
            </form>

        </>
    )
}

export default Phone;