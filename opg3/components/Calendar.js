import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TextInput, Picker} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Storage from './Storage.js'

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        let time = new Date();
        time = time.toISOString().split('T')[0];

        this.state = {
            storage: new Storage(),
            addingEvent: false,
            addingEventName: '',
            selectedDay: time,
            allItems: {},
            visItems: {},
            contacts: {},
            goals: {},
        };
    }

    componentDidMount() {
        let time = this.state.selectedDay;

        this.state.storage._retrieveData('allItems').then(value => {
            const newItems = {};
            newItems[time] = [];
            if (value !== undefined) {
                this.setState({allItems: value});
                if (value[time]) {
                    newItems[time] = value[time].items;
                }
            }
            this.setState({visItems: newItems});
        });
        this.state.storage._retrieveData('contacts').then(value => {
            if (value !== undefined) {
                this.setState({
                    contacts: value,
                    selectedContact: value[0]
                });
            }
        });
        this.state.storage._retrieveData('goals').then(value => {
            if (value !== undefined) {
                this.setState({
                    goals: value,
                    selectedGoal: value[0]
                });
            }
        })
    }

    render() {
        return (
            <View>
                {!this.state.addingEvent &&
                <View style={styles.container}>
                    <Agenda firstDay={1} showWeekNumbers={true}
                            items={this.state.visItems}
                            markedDates={this.state.allItems}
                            selected={this.state.selectedDay}
                            onDayPress={this.onDayPress.bind(this)}
                            renderItem={this.renderItem.bind(this)}
                            renderEmptyDate={this.renderEmptyDate.bind(this)}
                            renderEmptyData={this.renderEmptyData.bind(this)}
                            rowHasChanged={(r1, r2) => {
                                return r1.text !== r2.text
                            }}/>
                    <Button title='Add Event' onPress={() => {
                        this.setState({addingEvent: true})
                    }}/>
                </View>
                }
                {this.state.addingEvent &&
                <View style={[styles.container, styles.centered]}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={text => this.setState({addingEventName: text})}
                        placeholder='Event name'/>
                    {this.state.contacts && this.state.contacts.length > 0 &&
                    <Picker
                        selectedValue={this.state.selectedContact}
                        onValueChange={(itemValue, itemIndex) => this.setState({selectedContact: itemValue})}>
                        {this.state.contacts.map(contact => {
                            return (<Picker.Item key={Math.random()} label={contact.fname + " " + contact.lname}
                                                 value={contact.fname + " " + contact.lname}/>)
                        })}
                    </Picker>
                    }
                    {this.state.goals && this.state.goals.length > 0 &&
                    <Picker
                        selectedValue={this.state.selectedGoal}
                        onValueChange={(itemValue, itemIndex) => this.setState({selectedGoal: itemValue})}>
                        {this.state.goals.map(goal => {
                            return (<Picker.Item key={Math.random()} label={goal.tag}
                                                 value={goal.tag}/>)
                        })}
                    </Picker>
                    }
                    <Button color='#4a4' title='Add' onPress={this.addEvent.bind(this)}/>
                    <Button color='#c55' title='Cancel' onPress={() => {
                        this.setState({addingEvent: false})
                    }}/>
                </View>
                }
            </View>
        );
    }

    onDayPress(day) {
        const time = this.timeToString(day.timestamp);
        const newItems = {};
        newItems[time] = [];
        if (this.state.allItems[time]) {
            newItems[time] = this.state.allItems[time].items;
        }
        this.setState({visItems: newItems, selectedDay: time});
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    renderItem(item) {
        return (
            <View style={[styles.event]}>
                <Text>{item.text}</Text>
                {item.goal &&
                <Text>Working towards: {item.goal.tag}</Text>
                }
                {item.contacts &&
                <View>
                    <Text>With: {item.contacts.fname} {item.contacts.lname}</Text>
                </View>
                }
            </View>
        )
    }

    renderEmptyDate() {
        return (
            <View><Text>You have no events today.</Text></View>
        )
    }

    renderEmptyData() {
        return (
            <View><Text>You have no events.</Text></View>
        )
    }

    addEvent() {
        let today = this.state.selectedDay;
        let items = [];
        if (this.state.allItems[today]) {
            items = this.state.allItems[today].items
        }
        let newItem = {
            text: this.state.addingEventName,
            contacts: this.state.selectedContact,
            goal: this.state.selectedGoal,
        };

        let newAllItems = {};
        newAllItems[today] = {marked: true, items: [...items, newItem]};

        let newVisItems = {};
        newVisItems[today] = [...items, newItem];

        let itemsToSave = {...this.state.allItems, ...newAllItems};
        this.setState({
            addingEvent: false,
            allItems: itemsToSave,
            visItems: newVisItems,
        });

        this.state.storage._storeData('allItems', itemsToSave);
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        height: '100%',
    },
    event: {
        minHeight: 80,
        margin: 4,
        marginBottom: 0,
        backgroundColor: '#ddd',
    },
    centered: {
        width: '70%',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});
