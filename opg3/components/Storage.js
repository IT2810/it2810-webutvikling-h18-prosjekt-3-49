import {AsyncStorage} from "react-native";

export default class Storage {

    _storeData = async (key, text) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(text));
        } catch (error) {
            // Error saving data
        }
    };

    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    _removeMultiple = async (keys) => {
        try {
            AsyncStorage.multiRemove(keys);
        } catch (error) {
            // Error removing data
        }
    };

    _removeAll = async () => {
        try {
            AsyncStorage.clear();
        } catch (error) {
            // Error removing data
        }
    }
}
