import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

const Countdown = ({
    minutes = 0.1,
    isPaused = true,
    onProgress,
    onEnd
}) => {
    const interval = useRef(null);

    const countDown = () => {
        setMillis((time) => {
            if(time === 0) {
                clearInterval(interval.current);
                return time;
            }
            const timeLeft = time - 1000;

            return timeLeft;
        });
    };

    useEffect(() => {
        if(isPaused) {
            if(interval.current) {
                clearInterval(interval.current);
            }

            return;
        }

        interval.current = setInterval(countDown, 1000);

        return () => clearInterval(interval.current);
    }, [isPaused]);

    const [millis, setMillis] = useState(null);
    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;

    useEffect(() => { 
        if(millis === 0) {
            onEnd();
        }
        onProgress(millis / minutesToMillis(minutes));
    }, [millis]);

    useEffect(() => { 
        setMillis(minutesToMillis(minutes));
    }, [minutes]);

    return (
        <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxl, 
        fontWeight: 'bold',
        color: colors.white,
        padding: spacing.lg,
        backgroundColor: 'rgba(94, 132, 226, 0.3)'
    }
});

export default Countdown;
