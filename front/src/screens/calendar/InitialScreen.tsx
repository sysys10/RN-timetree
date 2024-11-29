import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyCalendar from '@/components/calendar/MyCalendar';
import CustomButton from '@/components/common/CustomButton';
import useAuth from '@/hooks/queries/useAuth';

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
