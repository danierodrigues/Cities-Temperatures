import {useState} from 'react'
import './insert-city.css';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {saveCity} from '../../services/api';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


function InsertCity({requestCities:requestCities}) {
    const [fieldCity, setFieldCity] = useState();
    const [alertMessage, setalertMessage] = useState('');
    const [alertMode, setalertMode] = useState('');
    const [alert, setalert] = useState(false);
    const [buttonBlocked, setButtonBlocked] = useState(false);


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
        setButtonBlocked(true);
        document.getElementById("submitButtonCity").disabled = true;
        if(!fieldCity){
            setMessage('Campo obrigatório.', 'warning');
            document.getElementById("submitButtonCity").disabled = false;
            setButtonBlocked(false);
            return;
        }
        let body = {
            'city':fieldCity
        }
        saveCity(body).then(response =>{
            setMessage(response.data.message, 'success');
            setFieldCity('');
            requestCities();
            setButtonBlocked(false);
            document.getElementById("submitButtonCity").disabled = false;
        }).catch(error =>{
            setMessage('Erro.', 'error');
            setButtonBlocked(false);
            document.getElementById("submitButtonCity").disabled = false;
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
                <TextField value={fieldCity} label="Insira cidade" onChange={e => handleInputChange(e, 'city')}></TextField>
                <div className="ButtonContainer">
                    <Button id="submitButtonCity" className={buttonBlocked ? "submitButtonBlocked" : "submitButton"} variant="contained" color="primary" onClick={submit}>Guardar</Button>
                </div>
            </div>
        </div>
    );
}

export default InsertCity;