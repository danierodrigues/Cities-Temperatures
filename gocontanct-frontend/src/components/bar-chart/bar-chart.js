import {useState, useEffect, useLayoutEffect} from 'react'
import './bar-chart.css';
import {getCities} from '../../services/api';
import Chart from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';


function BarChart({data:data}) {
    const [dataChart, setDataChart] = useState([['Cidade', 'Temperatura']]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let temporaryArray = dataChart; //[];
        data.forEach(element => {
            let auxArray = [element.name, element.main.temp];
            temporaryArray.push(auxArray);
        });
        setDataChart([...temporaryArray]);
        setLoading(false);
    },[data]);

    return (
        <div className='PrincipalContainerChart' >
            { !loading ?
            <Chart
                width={'1000px'}
                height={'300px'}
                chartType="Bar"
                loader={<CircularProgress />}
                data={dataChart}
                options={{
                    chart: {
                    title: 'Temperatura nas cidades',
                    subtitle: '',
                    },
                }}
            /> : <CircularProgress></CircularProgress>
            }
        </div>
    );
}

export default BarChart;