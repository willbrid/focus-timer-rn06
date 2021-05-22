import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Focus from './src/features/focus/Focus';
import FocusHistory from './src/features/focus/FocusHistory';
import Timer from './src/features/timer/Timer';

import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2
};

const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const handleClear = () => {
      setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch(e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if(history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {
        focusSubject ? (
          <Timer 
            focusSubject={focusSubject} 
            onTimerEnd={() => {
              addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED);
              setFocusSubject(null);
            }}
            clearSubject={() => {
              addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
              setFocusSubject(null)
            }} 
          />
        ) : (
          <View style={{flex: 1}}>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory focusHistory={focusHistory} onClear={handleClear} />
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.sm,
    backgroundColor: colors.darkBlue
  }
});

export default App;
