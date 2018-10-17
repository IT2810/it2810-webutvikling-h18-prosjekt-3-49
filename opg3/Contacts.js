import React, { Component} from 'react';
import {AppRegistry, Text, View, FlatList} from 'react-native'


class Contact extends Component{
    render() {
        return (
            <Text>Name: {this.props.fname} {this.props.lname} </Text>
        );
    }
}

export default class ContactManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [
                {fname: 'Lais', lname:'Jens'},
                {fname: 'Lisa', lname:'Samog'}
            ]
        };


    }

    componentDidMount() {
        this.addContact('Jens', 'Oshuendo');
        this.removeContact('Lais', 'Jens');
    }

    addContact(fname,lname) {
        let data = this.state.contacts;
        data.push({fname: fname, lname: lname});
        this.setState( {
                contacts: data
    })}

    removeContact(fname,lname) {
        let data = this.state.contacts;
        let index = data.indexOf({fname,lname});
        if (index > -1) {
            data.splice(index, 1);
        }
        this.setState( {
            contacts: data
        })}

    //<contact fname="Odd" lname="Kristian" />
/*
{fname=contact.fname} {lname=contact.lname} />
                    <Text key = {Math.random()}>Name: {contact.fname} {contact.lname}</Text>)
 */

    render() {

        {this.state.contacts.map(x =>
            console.log("from map: ",x.fname))}

        return (
            <View>
                <View>
                {this.state.contacts.map(contact =>
                    <Contact fname={contact.fname} lname={contact.lname} key={Math.random()} />)
                }
                    {console.log(this.state.contacts)}
                </View>
            <View>
            {}
            </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => ContactManager);