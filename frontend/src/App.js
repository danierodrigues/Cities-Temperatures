import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import InsertCity from './components/insert-city/insert-city';
import BarChart from './components/bar-chart/bar-chart';
import TablesCities from './components/table-cities/table-cities';
import { useEffect } from 'react';
import {getCities} from './services/api';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
  const [data, setData] = useState([]);
  const [request, setRequest] = useState(true);
  const [loading, setLoading] = useState(true);
  const [rendered, setRendered] = useState(false);


  const requestCities = () =>{
    setRendered(false);
    setLoading(true);
    setRequest(!request);
  }

  useEffect(() => {
    getCities().then(response=>{
        setData([...response.data.cities]);
        setLoading(false);
        setRendered(true);
    }).catch(err=>{
        console.log(err);
        setLoading(false);
    })
},[request]);

  return (
    <div className="App">
      <InsertCity requestCities={requestCities}></InsertCity>
      {!loading ? (data.length != 0 && rendered) ? <BarChart data={data}></BarChart> : <div style={{marginTop:'30px'}}>Insira pelo menos uma cidade.</div>  : <div><CircularProgress></CircularProgress></div>}
      {!loading ? data.length != 0 ? <TablesCities data={data}></TablesCities> : <div></div> : <div><CircularProgress></CircularProgress></div>}
    </div>
  );
}

export default App;
