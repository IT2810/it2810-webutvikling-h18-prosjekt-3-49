import React from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Goals from './Goals.js';
import Storage from './Storage';


export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Goals/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
