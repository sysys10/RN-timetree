import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  calculateCellHeight,
} from '@/utils/DateFC';
import moment from 'moment-timezone';
import { colors } from '@/constants/colors';
import useEventStore from '@/stores/eventStore';
import { Event } from '@/types/calendar';

interface MonthViewProps {
  selectedDate: Date;
  handleDateCellClick: (date: Date, dayEvents: Event[]) => void;
  today: Date;
}

const MonthView = ({
  selectedDate,
  handleDateCellClick,
  today,
}: MonthViewProps) => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const events = useEventStore(state => state.events);

  // monthHeight와 cellHeight를 계산
  const cellHeight = calculateCellHeight(selectedDate, Dimensions);
  const daysInMonth = getDaysInMonth(selectedDate);
  const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
  const lastMonthLastDate = new Date(selectedDate);
  lastMonthLastDate.setDate(0);

  const renderDays = () => {
    const days = [];
    // 빈 날짜 칸 추가
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <View
          key={`empty-${i}`}
          style={[
            styles.day,
            {
              opacity: 0.6,
              backgroundColor: colors.GRAY_200,
              height: cellHeight,
            },
          ]}
        >
          <Text>{lastMonthLastDate.getDate() - firstDayOfMonth + i + 1}</Text>
        </View>,
      );
    }

    // 날짜 칸 추가
    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment
        .tz(
          [selectedDate.getFullYear(), selectedDate.getMonth(), i],
          'Asia/Seoul',
        )
        .toDate();

      const isSelected = moment(selectedDate).isSame(date, 'day');

      const isToday = moment(today).isSame(date, 'day');
      const dayEvents = events.filter(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        // 날짜만 비교하기 위해 시간을 초기화
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);
        const startDate = new Date(eventStart);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(eventEnd);
        endDate.setHours(0, 0, 0, 0);

        // 해당 날짜가 이벤트 기간에 포함되는지 확인
        return compareDate >= startDate && compareDate <= endDate;
      });
      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.day,
            { height: cellHeight },
            isSelected && styles.selectedDay,
            isToday && styles.todayDay,
          ]}
          onPress={() => {
            handleDateCellClick(date, dayEvents);
          }}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isToday && styles.todayText,
            ]}
          >
            {i}
          </Text>
          <View style={styles.eventDotContainer}>
            <View style={styles.eventDotContainer}>
              {dayEvents.slice(0, 3).map((event, index) => (
                <View
                  key={event.id}
                  style={[
                    styles.eventItem,
                    { backgroundColor: event.color + '40' }, // 40은 알파값 (25% 투명도)
                  ]}
                >
                  <Text style={[styles.eventTitle]} numberOfLines={1}>
                    {event.title}
                  </Text>
                </View>
              ))}
              {dayEvents.length > 3 && (
                <View style={styles.moreEventsContainer}>
                  <Text style={styles.moreEvents}>+{dayEvents.length - 3}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>,
      );
    }
    return <View style={[styles.daysContainer]}>{days}</View>;
  };

  return (
    <View>
      <View style={styles.weekDays}>
        {weekDays.map((day, index) => (
          <View key={index} style={[styles.weekDay, { height: 36 }]}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
      {renderDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  weekDays: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayText: {
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%',
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayText: {
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#e6e6e6',
  },
  selectedDayText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  todayDay: {
    backgroundColor: '#e6f3ff',
  },
  todayText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  eventDotContainer: {
    width: '100%',
    paddingHorizontal: 2,
    gap: 2,
  },
  eventItem: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  moreEventsContainer: {
    backgroundColor: colors.GRAY_200,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreEvents: {
    fontSize: 8,
    color: colors.GRAY_400,
    fontWeight: '500',
  },
});

export default MonthView;
