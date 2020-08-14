import React, { useState, useEffect } from "react";

const TimerFunction = ({ onComplete, time }) => { //time in seconds
    const [totalSecs, setTotalSecs] = useState(time);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    // const [timerText, setTimerText] = useState('');
    useEffect(() => {
        const myInterval = setInterval(() => {
            if (totalSecs > 0) {
                setTotalSecs((totalSecs) => totalSecs - 1);
                setMinutes(Math.floor(totalSecs / 60));
                setSeconds(totalSecs % 60);
            }
            if (totalSecs === 0) {
                onComplete();
                clearInterval(myInterval);
            }
        }, (minutes > 0 || seconds > 0 ? 1000: 0));
        return () => {
            clearInterval(myInterval);
        };
    });

    return (<span>{ minutes > 0 || seconds > 0 && (`${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(-2)}`)}</span>);
    // return <span>{seconds < 10 ? `0${seconds}` : seconds}</span>;
};

export default TimerFunction;
