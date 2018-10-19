import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import Storage from './Storage.js'


class Contact extends Component {
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
                <View style={{flexDirection: 'row'}}>
                    <Text style={{width: '90%'}}> {this.props.fname} {this.props.lname} </Text>
                    <Button
                        onPress={this.delete}
                        title="X"
                        color="#c55"
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
            storage: new Storage(),
            newFname: '',
            newLname: '',
            renderMe: true,
            contacts: [
                /*
                {key:Math.random(), fname:'Lars', lname:'Jens'}
                <Contact
                    removeContact={this.removeContact}
                    key={Math.random()}
                    fname='Lars' lname='Jens' />,
                <Contact
                    removeContact={this.removeContact}
                    key={Math.random()}
                    fname='Ask' lname='Yri' />,
                */
            ]
        };
            console.log(this.state.contacts); //TODO

    }

    componentDidMount() {
        this.state.storage._retrieveData('contacts')
            .then(value => {
                if (value !== undefined) {
                    this.setState({contacts: value});
                }
            })

    }
            /*
            <Contact removeContact={this.removeContact}
                            key={Math.random()}
                           fname={fname} lname={lname} />
             */

    addContact(fname,lname) {
        let contacts = this.state.contacts;
        contacts.push({key:Math.random(), fname:fname, lname:lname});

        this.setState( {
                contacts: contacts,
                newFname: "",
                newLname: "",
        });
        this.state.storage._storeData('contacts', contacts);
    }


    removeContact(key) {
        let contacts = this.state.contacts;
        contacts = contacts.filter(contact => contact.key !== key);
        this.setState({contacts: contacts});
        this.state.storage._storeData('contacts', contacts);
    }

    render() {
    return (
        <View>
        {this.state.renderMe &&
        <View>

            <View>
                {this.state.contacts.map(contact =>
                    <Contact
                        id={contact.key}
                        key={Math.random()}
                        fname={contact.fname}
                        lname={contact.lname}
                        removeContact={this.removeContact}
                    />
                    )}
            </View>

            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({newFname:text})}
                    value={this.state.newFname}
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({newLname:text})}
                    value={this.state.newLname}
                />
                <Button
                    onPress={() => this.addContact
                    (this.state.newFname, this.state.newLname)}
                    title="Add"
                    color="#4a4"
                    accessibilityLabel="accessibilityLabel er denne teksten"
                />
            </View>

        </View>
        }
        </View>
        );
    }
}


const styles = StyleSheet.create({

    picture: {
        backgroundColor: "#abcccc",
        alignItems: "center",
    },

    infoLine: {
        flexDirection: "row",
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#aaa",
    },

    text: {
        fontSize: 18,
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 20,
    },
});
/*
*/
