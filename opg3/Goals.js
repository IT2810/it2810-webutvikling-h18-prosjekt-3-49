import React from 'react';
import {View, TextInput} from 'react-native';

export default class Goals extends React.Component {
    render() {
        return (
            <TextInput
                onSubmitEditing={(e) => {
                    this.props.callBack("key", e.nativeEvent.text)
                }}
            />
        )
    }
}