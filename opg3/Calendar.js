import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Agenda firstDay={1} showWeekNumbers={true}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          renderEmptyData = {this.renderEmptyData.bind(this)}
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}} />
      </View>
    );
  }

  renderItem(item) {
    return (
      <View><Text>This is an item.</Text></View>
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
