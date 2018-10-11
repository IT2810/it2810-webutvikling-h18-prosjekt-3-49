import React, { Component} from 'react';
import {AppRegistry, Text, View} from 'react-native'

class Contact extends Component {
    render() {
        return (
            <Text>Name: {this.props.fname} {this.props.lname} </Text>
        );
    }
}

export default class ContactManager extends Component {
    render () {
        return (
            <View>
            <Contact fname='Lais' lname='Umes'/>
            <Contact fname='Lisa' lname='Meesa'/>
            </View>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => ContactManager);