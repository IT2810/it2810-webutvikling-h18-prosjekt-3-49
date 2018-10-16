import React, { Component} from 'react';
import {AppRegistry, Text, View, FlatList} from 'react-native'


function contact(props){
    return (
        <Text>Name: {props.fname} {props.lname} </Text>
    );
}

export default class ContactManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [
                {fname: 'Lais', lname:'ADDED MANUALY IN CONSTRUCTOR'},
                {fname: 'Lisa', lname:'ADDED MANUALY IN CONSTRUCTOR'}
            ]
        };


    }

    componentDidMount() {
        this.addContact('Jens', 'ADDED BY ADDCONTACT IN DIDMOUNT');
    }

    addContact(fname,lname) {
        let data = this.state.contacts;
        data.push({fname: fname, lname: lname});
        this.setState( {
                contacts: data
    })}

    //<contact fname="Odd" lname="Kristian" />
/*

 */

    render() {

        {this.state.contacts.map(x =>
            console.log("from map: ",x.fname))}

        return (
            <View>
                {this.state.contacts.map(contact =>
                    <Text>Name: {contact.fname} {contact.lname} </Text>)
                }
            <Text>Halla balla</Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => ContactManager);