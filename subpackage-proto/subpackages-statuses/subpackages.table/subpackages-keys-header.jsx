import React from 'react';

const styles = {
    wrapper : {
        width: "100%", 
        backgroundColor: "transparent",
        display: "flex",
        paddingLeft: "50px",
        paddingTop: "10px",
        paddingBottom: "10px",
        alignItems: "center"
    },
    keyContainer: {
        display: "flex",
        marginRight: "10px"
    },
    colorBoxGreen: {
        backgroundColor: "rgb(26, 227, 82)",
        height: "25px",
        width: "25px",
        outline: "solid black 1px",
        marginRight: ".5rem"
    },
    colorBoxBlue: {
        backgroundColor: "rgb(24, 172, 255)",
        height: "25px",
        width: "25px",
        outline: "solid black 1px",
        marginRight: ".5rem"
    },
    colorBoxOrange: {
        backgroundColor: "rgb(255, 150, 73)",
        height: "25px",
        width: "25px",
        outline: "solid black 1px",
        marginRight: ".5rem"
    },
    text: {
        display:"inline-block",
        paddingTop: "3px"
    }
}
export default () => {
    return (
        <div style={styles.wrapper}>
            <div style={styles.keyContainer}>
                <div style={styles.colorBoxGreen}></div>
                <span style={styles.text}>= Current or One Behind Latest</span>
            </div>
            <div style={styles.keyContainer}>
                <div style={styles.colorBoxBlue}></div>
                <span style={styles.text}>= Two Behind Latest</span>
            </div>
            <div style={styles.keyContainer}>
                <div style={styles.colorBoxOrange}></div>
                <span style={styles.text}>= Three Or More Behind Latest</span>
            </div>
        </div>
    )
}