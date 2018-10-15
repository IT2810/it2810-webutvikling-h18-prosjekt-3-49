import React from 'react';
import {AsyncStorage} from "react-native";

export default class Storage extends React.Component {

    _storeData = async (key, text) => {
        try {
            await AsyncStorage.setItem(key, text);
        } catch (error) {
            // Error saving data
        }
    };

    _appendData = async (key, text) => {
        try {
            this._retrieveData(key).then(
                (res) => {
                    if (res !== "") {
                        res += ", ";
                    }
                    res += text;
                    this._storeData(key, res);
                }
            );
        } catch (error) {
            // Error saving data
        }
    };

    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    _retrieveMultiple = async (keys) => {
        try {
            const values = await AsyncStorage.multiGet(keys);
            if (values !== null) {
                return values;
            }
        } catch (error) {
            // Error retrieving data
        }
    };
}