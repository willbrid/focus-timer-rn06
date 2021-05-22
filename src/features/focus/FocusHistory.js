import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import RoundedButton from '../../components/RoundedButton';

import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';

const HistoryItem = ({ item, index }) => {
    return (
        <Text style={styles.historyItem(item.status)}>
            {item.subject}
        </Text>
    );
};

const FocusHistory = ({ focusHistory, onClear }) => {
    const clearHistory = () => {
        onClear();
    };

    return (
        <>
            <SafeAreaView style={styles.safeAreaView}>
                {
                    !!focusHistory.length &&
                    <>
                        <Text style={styles.title}>Things we've focused on</Text>
                        <FlatList 
                            style={styles.flatList}
                            contentContainerStyle={styles.flatListContentContainer}
                            keyExtractor={(item, index) => index.toString()}
                            data={focusHistory}
                            renderItem={HistoryItem}
                        />
                        <View style={styles.clearContainer}>
                            <RoundedButton size={75} title="Clear" onPress={clearHistory} />
                        </View>
                    </>
                }
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 0.5,
        alignItems: 'center'
    },
    flatList: {
        width: '100%',
        height: '100%'
    },
    flatListContentContainer: {
        flex: 1, 
        alignItems: 'center'
    },
    historyItem: (status) => ({
        color: status > 1 ? "red" : "green",
        fontSize: fontSizes.md
    }),
    title: {
        color: colors.white,
        fontSize: fontSizes.lg
    },
    clearContainer: {
        alignItems: 'center',
        padding: spacing.md
    }
});

export default FocusHistory;
