import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Event, ViewType } from '@/type/calendar';
import MonthView from './view/MonthView';
import WeekView from './view/WeekView';

interface CustomCalendarProps {
  view: ViewType;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  handleDateCellClick: (date: Date, dayEvents: Event[]) => void;
  today: Date;
}

function CustomCalendar({
  today,
  view,
  handleDateCellClick,
  setSelectedDate,
  selectedDate,
}: CustomCalendarProps) {
  if (view === 'month') {
    return (
      <View style={styles.container}>
        <MonthView
          today={today}
          selectedDate={selectedDate}
          handleDateCellClick={handleDateCellClick}
        />
      </View>
    );
  } else if (view === 'week') {
    return (
      <View style={styles.container}>
        <WeekView
          selectedDate={selectedDate}
          handleDateCellClick={handleDateCellClick}
        ></WeekView>
      </View>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomCalendar;
