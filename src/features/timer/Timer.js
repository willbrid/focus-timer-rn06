import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import Timing from './Timing';
import Countdown from '../../components/Countdown';
import RoundedButton from '../../components/RoundedButton';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;

const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
    useKeepAwake();

    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);

    const handleChangeTime = (min) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    };

    const vibrate = () => {
        if(Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000);
        } else {
            Vibration.vibrate(10000);
        }
    };

    const handleEnd = () => {
        vibrate();
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
        onTimerEnd();
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown 
                    isPaused={!isStarted} 
                    minutes={minutes}
                    onProgress={setProgress}  
                    onEnd={handleEnd}
                />
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={styles.progressBarContainer}>
                <ProgressBar 
                    progress={progress}
                    color="#5E84E2"
                    style={styles.progressBar}
                />
            </View>
            <View style={styles.timingWrapper}>
                <Timing onChangeTime={handleChangeTime} />
            </View>
            <View style={styles.buttonWrapper}>
                {
                    isStarted ? (
                        <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
                    ) : (
                        <RoundedButton title="start" onPress={() => setIsStarted(true)} />
                    )
                }
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton 
                    title="-" 
                    size={50} 
                    onPress={() => clearSubject()} 
                />
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        paddingTop: spacing.xxl
    },
    title: {
        color: colors.white,
        textAlign: 'center'
    },
    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    countdown: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    timingWrapper: {
        flex: 0.1,
        flexDirection: 'row',
        paddingTop: spacing.xxl,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        paddingTop: spacing.xxl,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBarContainer: {
        paddingTop: spacing.sm
    },
    progressBar: {
        height: 10
    },
    clearSubject: {
        paddingBottom: 20,
        paddingLeft: 25
    }
});

export default Timer;
