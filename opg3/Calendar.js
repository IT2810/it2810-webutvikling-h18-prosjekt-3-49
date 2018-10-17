import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visItems: {},
      allItems: {
        // Example:
        // '2018-10-17': {marked: true, items:
        // [{text: 'hest'}, {text: 'test'}]
        // }
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Agenda firstDay={1} showWeekNumbers={true}
          items={this.state.visItems}
          markedDates={this.state.allItems}
          onDayPress={this.onDayPress.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          renderEmptyData = {this.renderEmptyData.bind(this)}
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}} />
      </View>
    );
  }

  onDayPress(day) {
    const time = this.timeToString(day.timestamp);
    const newItems = {};
    if (this.state.allItems[time]) {
      newItems[time] = this.state.allItems[time].items;
      this.setState({visItems: newItems});
      return
    }
    newItems[time] = []
    this.setState({visItems: newItems});
  }
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  renderItem(item) {
    return (
      <View><Text>{item.text}</Text></View>
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
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
});
