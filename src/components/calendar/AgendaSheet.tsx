import React from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import PlusSVG from '@/assets/plus-large.svg';
import { Event } from '@/types/calendar';
import moment from 'moment-timezone';
import responsive from '@/utils/responsive';

interface AgendaSheetProps {
  selectedDate: Date;
  addFormBottomSheetRef: any;
  selectedEventRef: Event[];
}

function AgendaSheet({
  selectedDate,
  addFormBottomSheetRef,
  selectedEventRef,
}: AgendaSheetProps) {
  const sortedEvents = [...selectedEventRef].sort((a, b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  return (
    <View style={styles.container}>
      <View style={styles.agendaSheetHeader}>
        <View style={styles.agendaSheetHeaderLeftProps}>
          <Text style={styles.agendaSheetHeaderDate}>
            {selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.agendaSheetHeaderSub}>
            {selectedEventRef.length === 0
              ? '일정 없음'
              : `일정이 ${selectedEventRef.length}개 있습니다.`}
          </Text>
        </View>
        <Pressable
          onPress={() => addFormBottomSheetRef.current?.expand()}
          style={styles.agendaSheetHeaderRightProps}
        >
          <PlusSVG width={20} height={20} color="#fff" />
        </Pressable>
      </View>

      <ScrollView style={styles.eventListContainer}>
        {sortedEvents.map(event => (
          <View
            key={event.id}
            style={[styles.eventItem, { borderLeftColor: event.color }]}
          >
            <View style={styles.eventTimeSection}>
              {event.allDay ? (
                <Text style={styles.timeText}>종일</Text>
              ) : (
                <Text style={styles.timeText}>
                  {moment(event.start).format('HH:mm')} -{' '}
                  {moment(event.end).format('HH:mm')}
                </Text>
              )}
            </View>

            <View style={styles.eventContentSection}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              {event.location && (
                <Text style={styles.locationText}>{event.location}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  agendaSheetHeader: {
    height: 64,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  agendaSheetHeaderLeftProps: {
    height: '100%',
    justifyContent: 'center',
  },
  agendaSheetHeaderRightProps: {
    height: 28,
    width: 28,
    backgroundColor: '#000',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agendaSheetHeaderDate: {
    fontSize: 20,
    fontWeight: '600',
  },
  agendaSheetHeaderSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  eventListContainer: {
    flex: 1,
    padding: 16,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  eventTimeSection: {
    width: responsive(90),
    justifyContent: 'center',
  },
  eventContentSection: {
    flex: 1,
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
  },
});

export default AgendaSheet;
