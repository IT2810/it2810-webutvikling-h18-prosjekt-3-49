import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, KeyboardAvoidingView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Storage from './Storage.js'

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    let exampleItems = {
      '2018-10-18': {marked: true, items:
      [{text: 'hest', goal: 'horsing around', contacts: ['Bob', 'Lars Møster']}, {text: 'test'}]
      }
    };

    let time = new Date();
    time = time.toISOString().split('T')[0];
    const newItems = {};
    newItems[time] = [];
    if (exampleItems[time]) {
      newItems[time] = exampleItems[time].items;
    }

    this.state = {
      storage: new Storage(),
      addingEvent: false,
      addingEventName: '',
      selectedDay: time,
      visItems: newItems,
      allItems: exampleItems,
    };
  }

    componentDidMount() {
      this.state.storage._retrieveData('allItems').then(value => {
        if (value !== undefined) {
          this.setState({allItems: value});
        }
      })
    }

  render() {
    return (
      <View>
      { !this.state.addingEvent &&
        <View style={styles.container}>
          <Agenda firstDay={1} showWeekNumbers={true}
            items={this.state.visItems}
            markedDates={this.state.allItems}
            selected={this.state.selectedDay}
            onDayPress={this.onDayPress.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            renderEmptyData = {this.renderEmptyData.bind(this)}
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}} />
          <Button title='Add Event' onPress={() => {this.setState({addingEvent: true})}} />
        </View>
      }
      { this.state.addingEvent &&
        <KeyboardAvoidingView style={[styles.container, { justifyContent: 'center'}]} behavior='padding' enabled>
          <TextInput
            style={{height: 40}}
            onChangeText={text => this.setState({addingEventName: text})}
            placeholder='Event name' />
          <Button title='Add' onPress={this.addEvent.bind(this)} />
          <Button title='Cancel' onPress={() => {this.setState({addingEvent: false})}} />
        </KeyboardAvoidingView>
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
          <Text>Working towards: {item.goal}</Text>
        }
        {item.contacts &&
          <View>
            <Text>With:</Text>
            <FlatList
              data={item.contacts}
              renderItem={({item}) => <Text>{item}</Text>}
              keyExtractor={(item, index) => index.toString()}>
            </FlatList>
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

    let newItem = {text: this.state.addingEventName};

    let newAllItems = {};
    newAllItems[today] = {marked: true, items: [...items, newItem]};

    let newVisItems = {};
    newVisItems[today] = [...items, newItem];

    let itemsToSave = {...this.state.allItems, ...newAllItems};
    this.setState({addingEvent: false,
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
    minHeight: 60,
    margin: 4,
    marginBottom: 0,
    backgroundColor: '#ddd',
  },
});
