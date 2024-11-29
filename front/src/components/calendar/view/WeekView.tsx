import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useMemo } from 'react';
import { ENDTIME, interval, STARTTIME } from '@/constants';
import { Event } from '@types/calendar';

interface WeekViewProps {
  selectedDate: Date;
  handleDateCellClick: (date: Date, dayEvents: Event[]) => void;
}

const WeekView = ({ selectedDate, handleDateCellClick }: WeekViewProps) => {
  const minutes = useMemo(() => {
    const minutesArray: number[] = [];
    for (let i = STARTTIME; i <= ENDTIME; i += interval) {
      minutesArray.push(i);
    }
    return minutesArray;
  }, [STARTTIME, ENDTIME, interval]); // 의존성 배열의 값이 변경될 때만 재계산

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const events = [{}];
  return (
    <ScrollView>
      <View style={styles.weekHeader}>
        <View style={styles.weekDay}></View>
        {weekDays.map(day => (
          <View key={day} style={styles.weekDay}>
            <Text>{day}</Text>
          </View>
        ))}
      </View>
      <ScrollView>
        {minutes.map(minute => (
          <View key={minute} style={styles.hourRow}>
            <View style={styles.hourCell}>
              <Text>{`${Math.floor(minute / 60)
                .toString()
                .padStart(2, '0')}:${(minute % 60)
                .toString()
                .padEnd(2, '0')}`}</Text>
            </View>
            {weekDays.map(day => (
              <View key={`${minute}-${day}`} style={styles.weekTimeSlot} />
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  weekContainer: {
    flex: 1,
  },
  weekHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  weekDay: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  hourRow: {
    flexDirection: 'row',
    height: 60,
  },
  hourCell: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekTimeSlot: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
});

export default WeekView;
