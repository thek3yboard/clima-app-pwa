import React, { useState } from 'react';
import { fetchClima } from './api/fetchClima';
import './App.css';

const App = () => {
    const [ query, setQuery ] = useState(''); 
    const [ clima, setClima ] = useState(''); 

    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchClima(query);
            console.log(data);
            setClima(data);
            setQuery('');
        }
    }

    return(
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            { clima.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{ clima.name }</span>
                        <sup>{ clima.sys.country }</sup>
                    </h2>

                    <div className="city-temp">
                        { Math.round(clima.main.temp) }
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} alt={clima.weather[0].description}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App;