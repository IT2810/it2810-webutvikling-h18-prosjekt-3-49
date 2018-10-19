import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import Storage from './Storage';

export default class Goals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storage: new Storage(),
            goals: [],
        };
        this.addGoal = this.addGoal.bind(this);
        this.removeAllGoals = this.removeAllGoals.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
        this.removeNamedGoal = this.removeNamedGoal.bind(this);
    }

    componentDidMount() {
        this.state.storage._retrieveData("goals").then((res) => {
            if (res !== undefined) {
                this.setState({goals: res})
            }
        })
    }

    addGoal() {
        if (this.state.goalToStore !== "") {
            let goals = this.state.goals;
            goals.push({tag: this.state.goalToStore});
            this.setState({goals: goals, goalToStore: ""});
            this.state.storage._storeData("goals", goals);
        }
    }

    removeGoal() {
        if (this.state.goalToDelete !== "") {
            let goals = this.state.goals;
            goals = goals.filter(goal => goal.tag !== this.state.goalToDelete);
            this.setState({goals: goals, goalToDelete: ""});
            this.state.storage._storeData("goals", goals);
        }
    }

    removeNamedGoal(tag) {
        let goals = this.state.goals;
        goals = goals.filter(goal => goal.tag !== tag);
        this.setState({goals: goals});
        this.state.storage._storeData("goals", goals);
    }

    removeAllGoals() {
        this.state.storage._removeMultiple(["goals"]);
        this.setState({goals: []});
    }

    render() {
        return (
            <View>
                {this.state.goals.map((goal, index) =>
                    <View key={Math.random()} style={{flexDirection: 'row'}}>
                        <Text>
                            Goal number {index + 1} is "{goal.tag}"
                        </Text>
                        <Button color={"red"} onPress={() => this.removeNamedGoal(goal.tag)}
                                title={"Delete"}/>
                    </View>
                )}
                <TextInput
                    placeholder={"Enter goal here"}
                    value={this.state.goalToStore}
                    onChangeText={text =>
                        this.setState({goalToStore: text})
                    }
                    onSubmitEditing={(e) => {
                        this.setState({goalToStore: e.nativeEvent.text});
                        this.addGoal();
                    }}
                />
                <Button
                    onPress={this.addGoal}
                    title="Add goal"
                    color={"green"}/>

                <Button
                    onPress={this.removeAllGoals}
                    title="Remove all goals"
                    color={"red"}/>
            </View>
        )
    };
}
