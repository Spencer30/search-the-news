import React from 'react';

const Card = props => {
    return (
        <div style={{...styles.cardContainer, ...{boxShadow:props.darkMode ? 'none' : '10px 10px 20px 10px #ccc', border: props.darkMode ? '1px solid #888' : ''}}}>
            <div style={styles.imgContainer}>
                <img src={props.img} style={styles.img} />
                <div style={styles.topTextContainer}>
                    <h2 style={styles.topText}>{props.title}</h2>
                    <h4 style={styles.topText}>{props.subTitle}</h4>
                </div>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}

const styles = {
    cardContainer: {
        height: '100%',
        width: 210,
        borderRadius: 25,
        overflow: 'hidden',
        // boxShadow: , 
    },
    imgContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: 'black',
        padding: 0,
        position: 'relative', 
        color: 'white'
    },
    img: {
        width: '100%',
        height: '100%',
        opacity: .3,
    },
    topTextContainer: {
        position: 'absolute',
        left: 15,
        bottom: 10,
    },
    topText: {
        margin: 4
    }
}

export default Card