import React from 'react';

const NewsArticlePopUp = props => {
    return (
        <div style={styles.container}>
            <div style={styles.btnContainer}><button style={styles.button}>X</button></div>
            <div style={styles.contentContainer}>
                <h2>Title</h2>
                <img alt="article" />
                <h3>SubTitle</h3>
                <h3>Author:</h3>
                <h4>Date:</h4>
                <p>Content</p>
            </div>
        </div>
    )
}

const styles = {
    container: {
        zIndex: 5,
        backgroundColor: '#121212',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    btnContainer:{
        width: '100%'
    },
    button: {
        width: 35,
        height: 35,
        margin: 10,
        borderRadius: 5,
    },
    contentContainer: {
        width: '80%',
        borderLeft: '1px solid #888',
        borderRight: '1px solid #888',
        textAlign:'center'
    }
}
export default NewsArticlePopUp;