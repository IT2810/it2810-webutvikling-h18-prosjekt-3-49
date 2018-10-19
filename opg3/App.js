import React from 'react';
import {StyleSheet, View} from 'react-native';
import Calendar from './Calendar.js';
import ContactManager from './Contacts.js';
import Goals from './Goals.js';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Calendar />
                <Goals/>
                <ContactManager />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
    },
});
