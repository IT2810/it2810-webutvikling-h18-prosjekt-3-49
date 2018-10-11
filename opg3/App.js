import React from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Goals from './Goals.js';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "Sampletext"
        };
        this.callBack = this.callBack.bind(this);
    }

    _storeData = async (key, text) => {
        try {
            await AsyncStorage.setItem(key, text);
        } catch (error) {
            // Error saving data
        }
    };

    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                console.log(value);
                this.setState({text: value});
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    callBack(key, text) {
        this._storeData(key, text);
        this._retrieveData("key");
    }

    componentDidMount() {
        this._retrieveData("key");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.text}</Text>
                <Goals callBack={this.callBack}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
