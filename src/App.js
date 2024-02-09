import { useEffect, useState } from 'react'
import './App.css';
import searchIcon from "./Assets/search.png";
import weatherIcon from './Assets/cloud.png';
import humidityIcon from "./Assets/humidity.png";
import windIcon from "./Assets/wind.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState("delhi");
  const API_KEY = "3e69127db3d6a1af4d79720d61fc5999";

  const loadData = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
      if (res.ok) {
        const res_json = await res.json();
        setData(res_json);
      } else {
        toast("Location is not Correct!");
        console.log("Location is incorrect!");
      }
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(data);





  return (
    <>
      <div className='App'>
        <div className='container-1'>
          <input
            id="search-box"
            type='text'
            placeholder='search location'
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className='logo' onClick={loadData}>
            <img src={searchIcon} alt='search' />
          </div>
        </div>


        <div className='container-2'>
          <img src={weatherIcon} alt='cloud' />
        </div>

        <h1>{(data) ? Math.round(data.main.temp - 273.15, 2) : "N/A"} ℃</h1>
        <h2>{data ? data.name : location}</h2>

        <div className='container-3'>
          <div className='container-3-1'>
            <img src={humidityIcon} alt="humi" />
            <div className='container-3-1-1'>
              <p style={{ "fontSize": "2rem" }}>{data ? data.main.humidity : "N/A"}%</p>
              <p>Humidity</p>
            </div>
          </div>

          <div className='container-3-2'>
            <img src={windIcon} alt="wind" />
            <div className='container-3-2-1'>
              <p style={{ "fontSize": "1.6rem" }}>{data ? data.wind.speed : "N/A"} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>

        <br />
        <br />
        <ToastContainer closeOnClick />
      </div>
      <p>Created by @Vishvamitra</p>
    </>
  );
}

export default App;
