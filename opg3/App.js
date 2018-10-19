import React from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import Calendar from './components/Calendar.js';
import ContactManager from './components/Contacts.js';
import Goals from './components/Goals.js';
import Accelerometer from './components/Accelerometer';
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

class AccelerometerScreen extends React.Component {
    render() {
        return(
            <View style={styles.container, styles.centered}>
                <Accelerometer/>
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
    Accelerometer: {
        screen: AccelerometerScreen,
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
