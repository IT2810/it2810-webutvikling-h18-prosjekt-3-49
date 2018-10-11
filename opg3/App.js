import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Agenda firstDay={1} showWeekNumbers={true}
          renderItem={(item, firstItemInDay) => {return (<View />);}}
          renderDay={(day, item) => {return (<View/>);}}
          renderEmptyDate={() => {return (<View />);}}
          renderEmptyData = {() => {return (<View />);}}
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
});
