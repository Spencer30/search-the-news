
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import {images} from './dataFiles/data';
const moment = require('moment');

const randomNum = ()=> Math.floor(Math.random() * images.length);  

const WeatherCard = props => {
    const [weatherDesc, setWeatherDesc] = useState('');
    const [weatherTemp, setWeatherTemp] = useState('');
    const [highTemp, setHighTemp] = useState('');
    const [lowTemp, setLowTemp] = useState('');
    const [city, setCity] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const imageNum = useRef(randomNum())

    function geoFindMe() {
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            if (!latitude || !longitude) return;

            getWeather(latitude, longitude);
        }

        function error() {
            console.log('Unable to retrieve your location');
            getWeather(39.099724, -94.5786)
        }
        if (!navigator.geolocation) {
            console.log('Can\'t determine location');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }


    }

    useEffect(() => {
        geoFindMe()

        // eslint-disable-next-line
    }, [])

    const getWeather = (lat, lon) => {
        if (!city) {
            axios.get('weather', {
                params: {
                    lat: lat,
                    lon: lon,
                    msg: 'Fetching weather...'
                }
            }).then(res => {
                // console.log(res.data.weather[0].main);
                let weatherType = res.data.weather[0].main;
                  let icon = determineWeatherIcon(weatherType);
                  setWeatherIcon(() => icon);
                let des = res.data.weather[0].description;
                setWeatherDesc(() => des);
                let temp = res.data.main.temp;
                temp = convertKtoF(temp);
                setWeatherTemp(() => temp);
                let low = res.data.main.temp_min;
                low = convertKtoF(low);
                setLowTemp(() => low);
                let high = res.data.main.temp_max;
                high = convertKtoF(high);
                setHighTemp(() => high);
                let cityName = res.data.name;
                setCity(() => cityName);
                return;
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
        <Card img={images[imageNum.current]} title={weatherTemp+'°'} subTitle={city} alt="random Unsplash picture" darkMode={props.darkMode}>
            <div style={{...styles.bottomCardContainer, ...{backgroundColor:props.darkMode ? '#1c1c1c' : '', color:props.darkMode ? 'white' : ''}}}>
                <div style={styles.dateContainer}>
                    <h3>{moment().format('dddd')} | {moment().format('MMMM Do')}</h3>
                </div>
                <div style={styles.weatherReport}>
                    <h5 style={styles.weatherText}>{weatherDesc}</h5>
                    <h5 style={styles.weatherText}>{highTemp}° | {lowTemp}° </h5>
                    {weatherIcon}
                </div>
            </div>
        </Card>
    )
}

const styles = {
    bottomCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    dateContainer: {
        margin: '15px 0 10px 15px'
    },
    weatherReport: {
        color: '#888',
        position: 'relative',
        height: '100%',
        width: '100%',
        margin: '10px 10px 10px 15px',

    },
    weatherText: {
        fontSize: 16
    },
    img: {
        height: 30,
        width: 30,
        position: 'absolute',
        right: 35,
        top: '30%'
    }
}
const determineWeatherIcon = term => {
    switch(term){
      case 'Sunny':
        return <img style={styles.img} src={require('../images/sun.png')} alt='sun' />
      case 'Clouds':
        return <img style={styles.img} src={require('../images/cloud.png')} alt='clouds'/>
      case 'Rain':
        return <img style={styles.img} src={require('../images/rain.png')} alt='rain'/>
      case 'Snow':
        return <img style={styles.img} src={require('../images/snow.png')} alt='snow'/>
      case 'Partly Cloudy':
        return <img style={styles.img} src={require('../images/sunC.png')} alt='sun'/>
      case 'Clear':
        return <img style={styles.img} src={require('../images/sun.png')} alt='sun' />
      default:
        return <img style={styles.img} src={require('../images/sunC.png')} alt='sun'/>
    } 
  }

const convertKtoF = (temp) => {
    temp = (temp - 273.15) * (9 / 5) + 32;
    temp = Math.round(temp);
    return (temp);
}

export default WeatherCard;