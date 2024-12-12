import React, { Ref, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { colors } from '@/constants/colors';
import moment from 'moment-timezone';
import { formatDate, formatTime } from '@/utils/DateFC';
import Toggle from '@/components/common/TogleSwitch';
import { BottomSheetRef } from '@/utils/bottomSheet';
import { EventInput, PickerState, Props } from '@/types/addEventform';
import { Icon, IconName } from '@/components/Icons';
import AddEventFormHeader from './AddEventFormHeader';
import { useEventForm } from '@/hooks/useEventForm';
const AddEventForm: React.FC<Props> = ({ selectedDate, addFormBottomSheetRef }) => {

  const {
    eventInput, initialPickerState,
    pickerState,
    updateEventInput,
    updatePickerState,
    handleEventSubmit,
    handleDateChange,
    handleTimeChange,
    handleTimePickerState,
  } = useEventForm(selectedDate, addFormBottomSheetRef);


  const detailElements = [
    {
      title: '위치',
      onPress: () => { },
      value: eventInput.selectedLocation,
      iconName: 'location' as IconName,
    },
    {
      title: '분류',
      onPress: () => { },
      value: eventInput.selectedCategory,
      iconName: 'category' as IconName,
    },
    {
      title: '설명',
      onPress: () => updatePickerState({ isDescriptionOpen: true }),
      value: eventInput.description,
      iconName: 'desc' as IconName,
    },
    {
      title: '색',
      onPress: () => { },
      value: eventInput.selectedColor,
      iconName: 'pencil' as IconName,
    },
    {
      title: '참여자',
      onPress: () => { },
      value: eventInput.participants.length > 0 ? `${eventInput.participants.length}명` : '',
      iconName: 'user' as IconName,
    },
    {
      title: '반복',
      onPress: () => { },
      value: eventInput.repeatSetting,
      iconName: 'repeat' as IconName,
    },
    {
      title: '잠금',
      onPress: () => updateEventInput({ isLocked: !eventInput.isLocked }),
      value: eventInput.isLocked ? '잠김' : '잠금 해제',
      iconName: 'lock' as IconName,
    },
  ];

  const formElements = [
    {
      iconName: 'hour24' as IconName,
      title: '종일',
      rightElement: (
        <View style={styles.addFormRightStyle}>
          <Toggle
            onValueChange={() => {
              updateEventInput({ isAllDay: !eventInput.isAllDay });
              updatePickerState(initialPickerState);
            }}
            initialValue={eventInput.isAllDay}
            trackColor={{ false: colors.GRAY_200, true: colors.SKY_200 }}
            style={{ margin: 10 }}
          />
        </View>
      ),
    },
    {
      title: '시작',
      iconName: 'rightArrow' as IconName,
      rightElement: (
        <View style={styles.addFormRightStyle}>
          <Text
            onPress={() => handleTimePickerState('start')}
            style={[
              styles.dateTimeText,
              {
                backgroundColor: pickerState.showStartPicker
                  ? colors.SKY_200
                  : colors.GRAY_200,
              },
            ]}
          >
            {formatDate(eventInput.startDate)}
          </Text>
          {!eventInput.isAllDay && (
            <Text
              onPress={() => handleTimePickerState('startT')}
              style={[
                styles.dateTimeText,
                {
                  backgroundColor: pickerState.showStartTimePicker
                    ? colors.SKY_200
                    : colors.GRAY_200,
                },
              ]}
            >
              {formatTime(eventInput.startDate)}
            </Text>
          )}
        </View>
      ),
    },
    {
      title: '종료',
      iconName: 'rightArrow' as IconName,
      rightElement: (
        <View style={styles.addFormRightStyle}>
          <Text
            onPress={() => handleTimePickerState('end')}
            style={[
              styles.dateTimeText,
              {
                backgroundColor: pickerState.showEndPicker
                  ? colors.SKY_200
                  : colors.GRAY_200,
              },
            ]}
          >
            {formatDate(eventInput.endDate)}
          </Text>
          {!eventInput.isAllDay && (
            <Text
              onPress={() => handleTimePickerState('endT')}
              style={[
                styles.dateTimeText,
                {
                  backgroundColor: pickerState.showEndTimePicker
                    ? colors.SKY_200
                    : colors.GRAY_200,
                },
              ]}
            >
              {formatTime(eventInput.endDate)}
            </Text>
          )}
        </View>
      ),
    },
  ];


  return (
    <View style={styles.container}>
      <AddEventFormHeader
        HandleEventSubmit={handleEventSubmit}
        addFormBottomSheetRef={addFormBottomSheetRef}
      />
      <TextInput
        style={styles.titleInput}
        autoFocus
        placeholder="제목"
        value={eventInput.title}
        onChangeText={text => updateEventInput({ title: text })}
      />

      <View style={styles.listContainer}>
        {formElements.map(element => (
          <View key={element.title} style={styles.eventElementContainer}>
            <View style={styles.addFormLeftStyle}>
              <View style={styles.icon}>
                <Icon name={element.iconName} />
              </View>
              <Text style={styles.title}>{element.title}</Text>
            </View>
            {element.rightElement}
          </View>
        ))}
      </View>

      <View style={styles.timePickerContainer}>
        {pickerState.showStartPicker && (
          <DateTimePicker
            value={eventInput.startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
            onChange={(event, date) => handleDateChange('start', event, date)}
            locale="ko-KR"
            positiveButton={{ label: '확인' }}
            negativeButton={{ label: '취소' }}
          />
        )}
        {pickerState.showStartTimePicker && !eventInput.isAllDay && (
          <DateTimePicker
            value={eventInput.startDate}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={(event, date) => handleTimeChange('start', event, date)}
            locale="ko-KR"
          />
        )}
        {pickerState.showEndPicker && (
          <DateTimePicker
            value={eventInput.endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
            onChange={(event, date) => handleDateChange('end', event, date)}
            minimumDate={eventInput.startDate}
            locale="ko-KR"
            positiveButton={{ label: '확인' }}
            negativeButton={{ label: '취소' }}
          />
        )}
        {pickerState.showEndTimePicker && !eventInput.isAllDay && (
          <DateTimePicker
            value={eventInput.endDate}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={(event, date) => handleTimeChange('end', event, date)}
            locale="ko-KR"
          />
        )}
      </View>

      {detailElements.map(element => (
        <View style={styles.listContainer} key={element.title}>
          <Pressable
            onPress={element.onPress}
            style={styles.eventElementContainer}
          >
            <View style={styles.addFormLeftStyle}>
              <View style={styles.icon}>
                <Icon name={element.iconName} />
              </View>
              <Text style={styles.title}>{element.title}</Text>
            </View>
            <View style={styles.addFormRightStyle}>
              {element.value && (
                <Text style={styles.valueText}>{element.value}</Text>
              )}
              <Icon name="rightArrow" />
            </View>
          </Pressable>
        </View>
      ))}
    </View>
  );
}; const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  timePickerContainer: {
    alignItems: 'center',
  },
  titleInput: {
    paddingHorizontal: 20,
    fontSize: 28,
    fontWeight: '600',
    maxHeight: 36,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 20,
    color: '#1a1a1a',
  },
  eventElementContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 4,
  },
  addFormLeftStyle: {
    flexDirection: 'row',
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFormRightStyle: {
    flexDirection: 'row',
    gap: 10,
    marginRight: 10,
  },
  icon: {
    width: '50%',
    marginRight: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
    width: '50%',
  },
  dateTimeText: {
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    color: '#1a1a1a',
    textAlign: 'right',
  },
  valueText: {
    fontSize: 13,
    color: colors.GRAY_400,
    marginRight: 8,
  },
});
export default AddEventForm;
