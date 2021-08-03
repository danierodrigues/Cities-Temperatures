import {useState, useEffect, useLayoutEffect} from 'react'
import './bar-chart.css';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {getCities} from '../../services/api';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chart from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';


function BarChart() {
    const [dataChart, setDataChart] = useState([['Cidade', 'Temperatura']]);

    useEffect(() => {
        getCities().then(response=>{
            console.log(response.data.cities);
            response.data.cities.forEach(element => {
                let auxArray = [element.name, element.main.temp];
                console.log(auxArray);
                dataChart.push(auxArray);
                setDataChart(dataChart);
            });

        }).catch(err=>{
            console.log(err);
        })
    });

    return (
        <div className='PrincipalContainerChart' >
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="Bar"
                loader={<CircularProgress />}
                data={dataChart}
                options={{
                    // Material design options
                    chart: {
                    title: 'Temperatura nas cidades',
                    subtitle: '',
                    },
                }}
                // For tests
                rootProps={{ 'data-testid': '2' }}
            />
        </div>
    );
}

export default BarChart;