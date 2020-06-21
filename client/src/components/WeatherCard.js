import React from 'react';
import Card from './Card';

const WeatherCard = props => {
    return (
        <Card img={require('../images/lake.jpg')} title="75 *" subTitle="Kansas City, MO">
            <div style={styles.bottomCardContainer}>
                <div style={styles.dateContainer}>
                    <h3>Friday | June 19th</h3>
                </div>
                <div style={styles.weatherReport}>
                    <h5 style={styles.weatherText}>broken clouds</h5>
                    <h5 style={styles.weatherText}>87 * | 64 * </h5>
                    <img src={require('../images/sun.png')} style={styles.img}/>
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

export default WeatherCard;