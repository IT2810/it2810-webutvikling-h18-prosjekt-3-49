//[]  ()  {}  ⟨⟩
import React, { Component} from 'react';
import {AppRegistry, Text, View} from 'react-native'
import Storage from "./Storage.js"




export default class Contacts extends React.Component{

    constructor(props){
        super(props);
        this.state={ contacts: [
            {fname:"Lars", lname:"Møster"},
            {fname:"Benjamin", lname:"Fimreite"},
            {fname:"Birger", lname:"Topphol"}
            ],
            storage: new Storage()
        };

        this.addContact = this.addContact.bind(this);
    }

    addContact(dic) {
        this.state.contacts.push(dic);
        this.state.storage._storeData(
            "contacts",
            this.state.contacts)
    }

    render() {
        this.addContact({fname:"Jan", lname:"Fosse"});
        return(
            <View>
                <Text>
                    Contacts: {this.state.contacts[0]}
                </Text>
            </View>
        )
    }
}
//contacts: list of dictionaries {fname,lname}

