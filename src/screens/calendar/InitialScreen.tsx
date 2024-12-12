import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyCalendar from '@/components/calendar/MyCalendar';
interface InitialScreenProps {
  navigation: any;
}

function InitialScreen({ navigation }: InitialScreenProps) {
  return (
    <View style={styles.container}>
      <MyCalendar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InitialScreen;
