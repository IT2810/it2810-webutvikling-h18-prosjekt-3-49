import React from 'react';
import {StyleSheet, View} from 'react-native';
import Calendar from './Calendar.js';
import ContactManager from './Contacts.js';
import Goals from './Goals.js';
import { createDrawerNavigator } from 'react-navigation';

class CalendarScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Calendar />
            </View>
        );
    }
}

class ContactsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container, styles.centered}>
                <ContactManager />
            </View>
        )
    }
}

class GoalsScreen extends React.Component {
    render() {
        return(
            <View style={styles.container, styles.centered}>
                <Goals />
            </View>
        )
    }
}

export default createDrawerNavigator({
    Calendar: {
        screen: CalendarScreen,
    },
    Contacts: {
        screen: ContactsScreen,
    },
    Goals: {
        screen: GoalsScreen,
    },
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
    },
    centered: {
        width: '70%',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    }
});
