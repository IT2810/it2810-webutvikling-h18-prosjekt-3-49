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
    constructor(props) {
        super(props);
        this.addContact = this.addContact.bind(this);
        this.state = {contacts : [
            <Contact fname='Lais' lname='Umes'/>,
            <Contact fname='Lisa' lname='Meesa'/>
        ]
    };

    addContact(contact) {
        this.setState((state,contact) =>
            ({
                contacts: state.contacts.append(contact)
            }));
    }

    render() {
        return (
            this.addContact(<Contact fname='Lezz' lname='Esam' />)
            <View>
                <FlatList data = {this.getState.contacts}/>
            </View>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => ContactManager);