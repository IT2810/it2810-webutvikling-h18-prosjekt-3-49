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
        if (Math.abs(x) >= Math.abs(y) && Math.abs(x) >= Math.abs(z)) {
            return (
                <View>
                    <Text style={{fontWeight: 'bold'}}>Accelerometer demo:</Text>
                    <Text style={{backgroundColor: '#66DF59'}}>It seems that your phone is in landscape-mode!</Text>
                </View>
            )
        }

        if (Math.abs(y) >= Math.abs(x) && Math.abs(y) >= Math.abs(z)) {
            return (
                <View>
                    <Text style={{fontWeight: 'bold'}}>Accelerometer demo:</Text>
                    <Text style={{backgroundColor: '#6D6FEF'}}>It seems that your phone is in portrait-mode!</Text>
                </View>
            )
        }

        if (Math.abs(z) >= Math.abs(x) && Math.abs(z) >= Math.abs(y)) {
            return (
                <View>
                    <Text style={{fontWeight: 'bold'}}>Accelerometer demo:</Text>
                    <Text style={{backgroundColor: '#5CAACC'}}>It seems that your phone is lying down!</Text>
                </View>
            )
        }

        return (
            <View>
                <Text style={{fontWeight: 'bold'}}>Accelerometer demo:</Text>
                <Text>Values are undefined</Text>
            </View>
        )
    }
}
