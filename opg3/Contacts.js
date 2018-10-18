import React, { Component} from 'react';
import {AppRegistry, Text, View, Button, TextInput} from 'react-native'



class Contact extends Component{
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {renderMe: true};
    }
    delete() {
        this.props.removeContact(this.props.id);
        this.setState({renderMe: false});
    }

    render() {
        return (
            <View>
                {this.state.renderMe &&
                <View>
                    <Text> {this.props.fname} {this.props.lname} </Text>
                    <Button
                        onPress={this.delete}
                        title="Delete"
                        color="#FF2018"
                        accessibilityLabel="accessibilityLabel er denne teksten"
                    />
                </View>
                }
            </View>
        );
    }
}

export default class ContactManager extends Component {
    constructor(props) {
        super(props);
        this.removeContact = this.removeContact.bind(this);
        this.state = {
            newFname: '',
            newLname: '',
            renderMe: true,
            contacts: [
                <Contact
                    removeContact={this.removeContact}
                    id={Math.random()}
                    fname='Lars' lname='Jens' />,
                <Contact
                    removeContact={this.removeContact}
                    id={Math.random()}
                    fname='Ask' lname='Yri' />,
            ]
        };

    }

    componentDidMount() {
        this.addContact('Nils', 'Oshuendo');
    }

    addContact(fname,lname) {
        let contacts = this.state.contacts;
        contacts.push(<Contact removeContact={this.removeContact}
                           id={Math.random()}
                           fname={fname} lname={lname} />);
        this.setState( {
                contacts: contacts
    })}


    removeContact(id) {
        let contacts = this.state.contacts;
        contacts = contacts.filter(contact => contact.id !== id);
        this.setState({contacts: contacts});

        /*
        //for (let item of list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === key) {
                list.splice(i);
            }
        }
        throw new Error("Failed to remove contact! key: " + key);
        */
    }



    //<contact fname="Odd" lname="Kristian" />
/*
{fname=contact.fname} {lname=contact.lname} />
                    <Text key = {Math.random()}>Name: {contact.fname} {contact.lname}</Text>)

        {this.state.contacts.map(x =>
            console.log("from map: ",x.fname))}


            ***NB!***
                <FlatList
                    data={this.state.contacts}
                    renderItem={({contact}) => {contact}}
                    />
                        <Contact key={contact.key} fname={contact.fname} lname={contact.lname}  />)
 */


    render() {
    return (
        <View>
        {this.state.renderMe &&
        <View>

            <View>
                {this.state.contacts.map(contact => contact)}
            </View>

            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.newFname}
                    id={}
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.newLname}
                    id={}
                />
                <Button
                    onPress={() => this.addContact(this.state.newFname, this.state.newLname)}
                    title="Add"
                    color="#20FF18"
                    accessibilityLabel="accessibilityLabel er denne teksten"
                />
            </View>
            
        </View>
        }
        </View>
        );
    }
}


class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
        );
    }
}


//AppRegistry.registerComponent('AwesomeProject', () => ContactManager);