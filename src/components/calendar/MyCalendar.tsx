import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import ViewSelector from '@/components/calendar/header/ViewSelector';
import CalendarHeaderView from '@/components/calendar/header/CalendarHeaderView';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment-timezone';
import { Event, ViewType } from '@/types/calendar';
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
    if (
      selectedDate.getFullYear() === date.getFullYear() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getDate() === date.getDate()
    ) {
      agendaBottomSheetRef.current?.expand();
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
