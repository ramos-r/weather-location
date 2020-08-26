// Fragment → serve para colocar um elemento vazio sem a
// necessidade de usar uma div.
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // useState → Muda o estado, não o conteúdo da variável.
  // Usuário aprovou o uso da location:
  const [location, setLocation] = useState(false);

  // State weather usado para guardar os dados que vem da API.
  const [weather, setWeather] = useState(false);

  // Function express responsável por chamar a API
  // Chamada assincrona → async
  let getWeather = async (lat, long) => {
    // await → Diz pro JavaScript esperar o valor ser retornado antes de pular pra próxima linha.
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt', 
        units: 'metric'
      }
    });
    setWeather(res.data);
  }
  // Executado assim que o app for montado:
  useEffect(() => {
    // Pedir autorização para o usuário da sua localização:
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, []) // Retorna a latitude e longitude.

  // Exibir mensagem caso o usuário não permita a sua localização:
  if (location === false) { // "===" → Estritamente igual, exatamente igual.
    return (
      <Fragment>
        Você precisa habilitar a localização no browser.
      </Fragment>
    )
  } // Se o clima não tiver chegado à página ainda:
  else if(weather === false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else { // Exibir os dados na tela
    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
          <ul>
            <li>Temperatura atual: {weather['main']['temp']}°</li>
            <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li>Temperatura mínima: {weather['main']['temp_min']}°</li>
            <li>Pressão atmosférica: {weather['main']['pressure']} hpa</li>
            <li>Umidade: {weather['main']['humidity']}%</li>
          </ul>
      </Fragment>
    )
  }
}

export default App;