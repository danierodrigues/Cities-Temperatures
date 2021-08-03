import {useState, useEffect} from 'react'
import './table-cities.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataGrid } from "@material-ui/data-grid";

function TablesCities({data:data}) {
    const [loading, setLoading] = useState(true);
    const [dataTableColumns, setDataTableColumns] = useState(
        [
            { field: 'city',
             headerName: 'Cidade',
             width:'300'
            },
            {
              field: 'temp',
              headerName: 'Temperatura',
              width:'300'
            },
            {
              field: 'dayBegin',
              headerName: 'Início do dia',
              width:'300'
            },
            {
              field: 'nightBegin',
              headerName: 'Início da noite',
              width:'300'
            },
          ]
    );
    const [dataTableRows, setDataTableRows] = useState([]);

    
    


    useEffect(() => {
        let counter = 1;
        let copyArray = dataTableRows;
        data.forEach(element => {
            let date = new Date(element.sys.sunrise * 1000);
            let date1 = new Date(element.sys.sunset * 1000);
            let sunrise = arrangeDate(date.getHours(),date.getMinutes(), date.getSeconds());
            let sunset = arrangeDate(date1.getHours(),date1.getMinutes(), date1.getSeconds());
            let auxArray = { id:counter,city:element.name, temp:element.main.temp,dayBegin: sunrise, nightBegin: sunset };
            counter += 1;
            copyArray.push(auxArray);
        });
        setDataTableRows([...copyArray]);
        setLoading(false);
    }, [data]);

    const arrangeDate = (hour, minutes, seconds) =>{
        if(hour.toString().length == 1){
            hour = "0" + hour;
        }
        if(minutes.toString().length == 1){
            minutes = "0" + minutes;
        }
        if(seconds.toString().length == 1){
            seconds = "0" + seconds;
        }

        return hour + ":" + minutes + ":" + seconds
    }


    return (
        <div className='PrincipalContainerTable' >
            
            <div className="table-cities">
            { !loading ?
            <DataGrid
                rows={dataTableRows}
                columns={dataTableColumns}
                disableColumnMenu={true}
                disableColumnFilter={true}
                hideFooterPagination={true}
            /> : <CircularProgress></CircularProgress>
            }  
            </div>
        </div>
    );
}

export default TablesCities;