import React from 'react';

const LightDarkButton = props => {
    return <div style={styles.container} onClick={props.onClick}>
            <img style={styles.img} src={props.darkMode ? require('../images/sun.png') :require('../images/moon.png')} alt={props.darkMode ? 'sun' : 'moon'}/>
    </div>
}
const styles={
    container: {
        height: 25,
        width: 25,
        cursor: 'pointer'
    },
    img: {
        width: '100%',
        height: '100%'
    }
}
export default LightDarkButton;