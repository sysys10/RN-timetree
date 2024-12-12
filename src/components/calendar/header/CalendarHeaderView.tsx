import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BurgerMenu from '../../../assets/burgerMenu.svg';
import { getWeek, getCurrentWeekMonday } from '../../../utils/DateFC';
import { ViewType } from '../../../types/calendar';

interface CalendarHeaderViewProps {
  navigation: any;
  view: ViewType;
  setView: (view: ViewType) => void;
  setSelectedDate: (date: Date) => void;
  selectedDate: Date;
}

function CalendarHeaderView({
  navigation,
  view,
  setView,
  setSelectedDate,
  selectedDate,
}: CalendarHeaderViewProps) {
  const moveDate = (direction: 'prev' | 'next') => {
    if (view === 'week') {
      // 현재 날짜가 속한 주의 월요일을 기준으로 7일씩 이동
      const monday = getCurrentWeekMonday(selectedDate);
      const date = new Date(monday);
      date.setDate(monday.getDate() + (direction === 'prev' ? -7 : 7));
      setSelectedDate(date);
    } else {
      const date = new Date(selectedDate);
      date.setMonth(date.getMonth() + (direction === 'prev' ? -1 : 1));
      date.setDate(1);
      setSelectedDate(date);
    }
  };

  const headerText = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1
    }월${view === 'week' ? ` ${getWeek(selectedDate)}주차` : ''}`;

  return (
    <View style={styles.headers}>
      <BurgerMenu
        style={styles.burgerMenu}
        width={32}
        height={28}
        onPress={() => navigation.openDrawer()}
      />
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={() => moveDate('prev')}>
          <Text style={styles.arrowButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{headerText}</Text>
        <TouchableOpacity onPress={() => moveDate('next')}>
          <Text style={styles.arrowButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headers: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  burgerMenu: {
    position: 'absolute',
    left: 16,
  },
  monthSelector: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    fontSize: 18,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CalendarHeaderView;
