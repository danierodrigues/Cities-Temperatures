import {useState} from 'react'
import './insert-city.css';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {saveCity} from '../../services/api';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


function InsertCity() {
    const [fieldCity, setFieldCity] = useState();
    const [alertMessage, setalertMessage] = useState('');
    const [alertMode, setalertMode] = useState('');
    const [alert, setalert] = useState(false);

    const handleInputChange = (e, inputName) => {
        switch(inputName) {
             case 'city': 
                setFieldCity(e.target.value);
                break;
             default:
                break;
        }
   }

    const setMessage = (textField, alertMode) =>{
        setalert(true);
        setalertMessage(textField);
        setalertMode(alertMode);
        setTimeout(function(){setalert(false)}, 3000);
    }


    const submit = (e) =>{
        e.preventDefault();
        if(!fieldCity){
            setMessage('Campo obrigatório.', 'warning');
            return;
        }
        let body = {
            'city':fieldCity
        }
        saveCity(body).then(response =>{
            setMessage(response.data.message, 'success');
            setFieldCity('');
        }).catch(error =>{
            setMessage(error.response.data.message || 'Erro.', 'error');
        })
    }

    return (
        <div className='CityInsertPrincipalContainer' >
            {alert && <div className={"alert"}>
                <Alert  severity={alertMode} action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setalert(false);
              }}
            ><CloseIcon fontSize="inherit" /></IconButton> } >{alertMessage}</Alert>
            </div>}
            <div className="cityInsertContainer">
                <TextField  label="Insira cidade" onChange={e => handleInputChange(e, 'city')}></TextField>
                <div className="ButtonContainer">
                    <Button className="submitButton" variant="contained" color="primary" onClick={submit}>Guardar</Button>
                </div>
            </div>
        </div>
    );
}

export default InsertCity;