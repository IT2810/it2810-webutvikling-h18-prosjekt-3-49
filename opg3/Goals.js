import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Storage from './Storage';

export default class Goals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            storage: new Storage(),
            goals: ""
        }
    }

    componentDidMount() {
        this.state.storage._retrieveData("key1").then((res) => {
            this.setState({goals: res})
        })
    }

    componentDidUpdate() {
        this.state.storage._retrieveData("key1").then((res) => {
            if (this.state.goals !== res) {
                this.setState({goals: res})
            }
        })
    }

    render() {
        /*let lst = [
            {fname: "per", lname: "persson"},
            {fname: "terje", lname: "terjesson"}
        ];
        this.state.storage._storeData("contacts", lst);
        this.state.storage._retrieveData("contacts").then(value => {
            console.log(value);
        });*/
        return (
            <View>
                <Text>
                    Dine mål er: {this.state.goals}
                </Text>
                <TextInput
                    onSubmitEditing={(e) => {
                        this.state.storage._storeData("key1", e.nativeEvent.text)
                    }}
                />
            </View>
        )
    }
}