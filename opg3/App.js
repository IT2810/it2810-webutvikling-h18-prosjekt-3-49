import React from 'react';
import {StyleSheet, View} from 'react-native';
    import { Calendar } from 'react-native-calendars';
    import ContactManager from './Contacts.js';
    import Goals from './Goals.js';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Goals/>
                <Calendar />
                <ContactManager />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

