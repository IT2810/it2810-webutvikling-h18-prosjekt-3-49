import React from 'react';
import {Accelerometer} from "expo";
import {Text, View} from "react-native";
import roundTo from 'round-to';


export default class Acc extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            accelerometerData: {},
        };
    }

    componentDidMount() {
        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _subscribe = () => {
        this._subscription = Accelerometer.addListener(accelerometerData => {
            this.setState({ accelerometerData });
        });
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        let {x, y, z} = this.state.accelerometerData;
        if (x !== undefined && y !== undefined && z !== undefined) {
            x = roundTo(x, 1);
            y = roundTo(y, 1);
            z = roundTo(z, 1);
        }
        return (
            <View>
                <Text>Accelerometer values: x = {x}, y = {y}, z = {z}</Text>
            </View>
        )
    }

}
