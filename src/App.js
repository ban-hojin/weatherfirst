import React, { useState, useEffect } from 'react';
import './App.css'; 
const App = () => {
  const [temperature, setTemperature] = useState('');
  const [status, setStatus] = useState('');
  const apiKey = 'ad7fd7137385d57a1107e20e2bf02b2d';

  // A function to fetch weather data from the OpenWeatherMap API
  const getWeather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setTemperature(`${city}의 현재 온도: ${data.main.temp}°C`);
        setStatus(`상태: ${data.weather[0].description}`);
      } else {
        throw new Error(data.message || "날씨 정보를 가져올 수 없습니다.");
      }
    } catch (error) {
      setTemperature(`오류: ${error.message}`);
      setStatus('');
    }
  };

  // Use the useEffect hook to fetch Seoul's weather as the default when the component mounts
  useEffect(() => {
    getWeather('Seoul');
  }, []);

  return (
    <div className="app">
      <div className="weather-box">
        <div>{temperature || '날씨 정보를 불러오는 중...'}</div>
        <div>{status}</div>
      </div>
      <div className="buttons">
        <button onClick={() => getWeather('Seoul')}>서울 날씨 보기</button>
        <button onClick={() => getWeather('New York')}>뉴욕 날씨 보기</button>
        <button onClick={() => getWeather('Sydney')}>시드니 날씨 보기</button>
        <button onClick={() => getWeather('Kyoto')}>교토 날씨 보기</button>
      </div>
    </div>
  );
};

export default App;
