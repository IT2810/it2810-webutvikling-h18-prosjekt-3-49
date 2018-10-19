import React from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import Calendar from './Calendar.js';
import ContactManager from './Contacts.js';
import Goals from './Goals.js';
import { createDrawerNavigator } from 'react-navigation';

class CalendarScreen extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' enabled>
                <Calendar />
            </KeyboardAvoidingView>
        );
    }
}

class ContactsScreen extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <ContactManager />
            </KeyboardAvoidingView>
        )
    }
}

class GoalsScreen extends React.Component {
    render() {
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <Goals />
            </KeyboardAvoidingView>
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
        width: '70%',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    }
});
