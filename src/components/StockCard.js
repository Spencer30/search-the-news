import React, { useState, useEffect, useRef } from 'react';
import { images, dowStocks } from './dataFiles/data'
import axios from 'axios';
import ApiUrl from "../config";
import Card from './Card';
const moment = require('moment');

const randomStock = (n) => Math.floor(Math.random() * n);
const randomImage = () => Math.floor(Math.random() * images.length);

const StockCard = props => {
    const [stockData, setStockData] = useState({});
    const [stockName, setStockName] = useState({});
    const imageNum = useRef(randomImage())

    const getStockData = () => {
        let num = randomStock(dowStocks.length);
        setStockName(() => ({ ticker: dowStocks[num].ticker, name: dowStocks[num].name }))
        let weekendCheck = moment().format('dddd');
        let momentDate;
        
        if (weekendCheck === 'Saturday' || weekendCheck === 'Sunday') {
            let day = weekendCheck === 'Sunday' ? moment().subtract(2, 'days') : moment().subtract(1, 'days');
            momentDate = moment(day).format('YYYY MM DD')

        } else {
            momentDate = moment().format('YYYY MM DD');
        }
        momentDate = momentDate.split(' ').join('-');
        axios.get(`${ApiUrl}/stockData`, { params: { stock: dowStocks[num].ticker, date: momentDate } }).then(res => {
            console.log(res);
            // console.log(Object.values(res.data.slice(0, -2)));
            let myDataObj = res.data;
            for (let key in myDataObj) {
                myDataObj[key] = Number(myDataObj[key]).toFixed(2)
            }
            setStockData(() => myDataObj)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        // console.log(dowStocks[1].name)
        getStockData();
    }, [])
    const stockPrice = stockData['4. close'] === undefined ? '$0' : '$' + stockData['4. close'];
    const noPriceFound = <h4>Sorry, stock cannot be retrieved at this time. Try again later.</h4>
    return (
        <Card img={images[imageNum.current]} title={stockPrice} subTitle={`${stockName.name} (${stockName.ticker})`} alt="random Unsplash picture" darkMode={props.darkMode}>
            <div style={{...styles.bottomCardContainer, ...{backgroundColor:props.darkMode ? '#1c1c1c' : '', color:props.darkMode ? '#888' : ''}}}>
                {stockData['4. close'] === undefined ? noPriceFound : <div style={{ wordSpacing: 8 }}>
                    <h5><span style={{ fontWeight: 'lighter' }}> Open: </span><span style={{ color: '#5cdb95' }}> $</span> {stockData['1. open']} </h5>
                    <h5><span style={{ fontWeight: 'lighter' }}> High: </span><span style={{ color: '#5cdb95' }}> $</span> {stockData['2. high']} </h5>
                    <h5><span style={{ fontWeight: 'lighter' }}> Low:  </span><span style={{ color: '#5cdb95' }}> $</span> {stockData['3. low']}  </h5>
                    <h5><span style={{ fontWeight: 'lighter' }}> Close:</span><span style={{ color: '#5cdb95' }}> $</span> {stockData['4. close']}</h5>
                </div>}

                <div style={{ textAlign: 'center' }}>
                    <button onClick={getStockData} style={styles.button}>Get New Stock</button>
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
        height: '100%',
        padding: 15
    },
    button: {
        marginTop: '1rem',
        backgroundColor: '#4285F4',
        border: '.1px solid #4285F4',
        borderRadius: 15,
        padding: '.2rem',
        width: '70%',
        color: 'white'
    }
}

export default StockCard;