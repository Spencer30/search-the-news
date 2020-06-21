import React from 'react';

const Card = props => {
    return (
        <div style={styles.cardContainer}>
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
        height: 300,
        width: 210,
        borderRadius: 25,
        overflow: 'hidden',
        boxShadow: '20px 20px 80px 15px grey', 
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