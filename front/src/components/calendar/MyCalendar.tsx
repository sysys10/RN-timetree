import React, { useState, useRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import ViewSelector from '@/components/calendar/header/ViewSelector';
import CalendarHeaderView from '@/components/calendar/header/CalendarHeaderView';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import AddEventForm from '@/components/calendar/AddEventForm/AddEventForm';
import moment from 'moment-timezone';
import { Event, ViewType } from '@/type/calendar';
import { TabType } from '@/constants/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTab from './bottom/BottomTab';
import { colors } from '@/constants/colors';
import AddFormBottomSheet from './bottomSheet/AddFormBottomSheet';
import AgendaBottomSheet from './bottomSheet/AgendaBottomSheet';
interface MyCalendarProps {
  navigation: any;
}

function MyCalendar({ navigation }: MyCalendarProps) {
  const [activeTab, setActiveTab] = useState<TabType>('일정');
  const today: Date = useMemo(() => moment.tz('Asia/Seoul').toDate(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [view, setView] = useState<ViewType>('month');
  const selectedEventRef = useRef<Event[]>([]);
  const addFormBottomSheetRef = useRef<BottomSheet>(null);

  // Explicitly type the ref as BottomSheet
  const agendaBottomSheetRef = useRef<BottomSheet>(null);

  const handleDateCellClick = (date: Date, dayEvents: Event[]) => {
    console.log('1. handleDateCellClick called');
    if (
      selectedDate.getFullYear() === date.getFullYear() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getDate() === date.getDate()
    ) {
      console.log('2. Same date clicked, attempting to expand');
      try {
        if (agendaBottomSheetRef.current) {
          // snapPoints의 마지막 인덱스(92% 위치)로 이동
          console.log(agendaBottomSheetRef);
          agendaBottomSheetRef.current.expand();
          console.log('3. BottomSheet snapToIndex called successfully');
        } else {
          console.log('Error: agendaBottomSheetRef.current is null');
        }
      } catch (error) {
        console.error('Error expanding bottom sheet:', error);
      }
    } else {
      selectedEventRef.current = dayEvents;
      setSelectedDate(date);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeaderView
        navigation={navigation}
        view={view}
        setView={setView}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ViewSelector
        view={view}
        setView={setView}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <CustomCalendar
        view={view}
        handleDateCellClick={handleDateCellClick}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        today={today}
      />
      <BottomTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <AgendaBottomSheet
        agendaBottomSheetRef={agendaBottomSheetRef}
        selectedDate={selectedDate}
        selectedEventRef={selectedEventRef}
        addFormBottomSheetRef={addFormBottomSheetRef}
      />
      <AddFormBottomSheet
        selectedDate={selectedDate}
        addFormBottomSheetRef={addFormBottomSheetRef}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  agendaBottomSheetHeader: {
    height: 64,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  agendaBottomSheetHeaderLeftProps: {
    height: '100%',
    justifyContent: 'center',
  },
  agendaBottomSheetHeaderRightProps: {
    height: 28,
    width: 28,
    backgroundColor: '#000',
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agendaBottomSheetHeaderDate: {
    fontSize: 20,
  },
  agendaBottomSheetHeaderSub: {
    fontSize: 12,
  },
});

export default MyCalendar;
