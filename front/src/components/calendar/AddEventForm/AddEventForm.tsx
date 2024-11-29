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
import Hour24 from '@/assets/24-hours.svg';
import AddEventFormHeader from './AddEventFormHeader';
import RightArrowSVG from '@/assets/rightarrowSVG.svg';
import LocationSVG from '@/assets/locationSVG.svg';
import UserSVG from '@/assets/userSVG.svg';
import LockSVG from '@/assets/lockSVG.svg';
import PencilSVG from '@/assets/pencilSVG.svg';
import DescSVG from '@/assets/descSVG.svg';
import RepeateSVG from '@/assets/repeteSVG.svg';
import CategorySVG from '@/assets/categorySVG.svg';

import moment from 'moment-timezone';
import { formatDate, formatTime } from '@/utils/DateFC';
import Toggle from '@/components/common/TogleSwitch';
import { BottomSheetRef } from '@/utils/bottomSheet';

interface AddEventFormProps {
  selectedDate: Date;
  addFormBottomSheetRef: BottomSheetRef;
}

interface Participant {
  id: string;
  name: string;
  email: string;
}

interface EventInput {
  title: string;
  description: string;
  isAllDay: boolean;
  startDate: Date;
  endDate: Date;
  participants: Participant[];
  selectedLocation: string;
  selectedCategory: string;
  selectedColor: string;
  isLocked: boolean;
  repeatSetting: string;
}

interface PickerState {
  showStartPicker: boolean;
  showEndPicker: boolean;
  showStartTimePicker: boolean;
  showEndTimePicker: boolean;
  isDescriptionOpen: boolean;
}

function AddEventForm({
  selectedDate,
  addFormBottomSheetRef,
}: AddEventFormProps) {
  const initialEventInput: EventInput = {
    title: '',
    description: '',
    isAllDay: true,
    startDate: selectedDate,
    endDate: selectedDate,
    participants: [],
    selectedLocation: '',
    selectedCategory: '',
    selectedColor: '',
    isLocked: false,
    repeatSetting: '',
  };

  const initialPickerState: PickerState = {
    showStartPicker: false,
    showEndPicker: false,
    showStartTimePicker: false,
    showEndTimePicker: false,
    isDescriptionOpen: false,
  };

  const [eventInput, setEventInput] =
    React.useState<EventInput>(initialEventInput);
  const [pickerState, setPickerState] =
    React.useState<PickerState>(initialPickerState);

  const updateEventInput = (updates: Partial<EventInput>) => {
    setEventInput(prev => ({ ...prev, ...updates }));
  };

  const updatePickerState = (updates: Partial<PickerState>) => {
    setPickerState(prev => ({ ...prev, ...updates }));
  };

  const HandleEventSubmit = () => {
    if (!eventInput.title?.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return false;
    }

    if (eventInput.startDate >= eventInput.endDate) {
      Alert.alert('알림', '시작 시간이 종료 시간보다 빨라야 합니다.');
      return false;
    }

    try {
      const eventData = {
        ...eventInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // API 호출 또는 로컬 저장소에 저장
      // await saveEvent(eventData);

      Alert.alert('성공', '일정이 등록되었습니다.');
      addFormBottomSheetRef.current?.close();
      setEventInput(initialEventInput);
      setPickerState(initialPickerState);

      console.log(eventData);
      return true;
    } catch (error) {
      console.error('일정 저장 실패:', error);
      Alert.alert('오류', '일정 저장에 실패했습니다.');
      return false;
    }
  };

  const onStartDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setPickerState(prev => ({
      ...prev,
      showStartPicker: Platform.OS === 'ios',
    }));
    if (selectedDate) {
      const koreaDate = new Date(selectedDate);
      updateEventInput({ startDate: koreaDate });

      if (Platform.OS === 'android' && !eventInput.isAllDay) {
        updatePickerState({ showStartTimePicker: true });
      }
    }
  };

  const onStartTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (selectedDate) {
      const newDate = new Date(eventInput.startDate);
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
      updateEventInput({ startDate: newDate });

      if (newDate > eventInput.endDate) {
        updateEventInput({ endDate: newDate });
      }
    }
  };

  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setPickerState(prev => ({ ...prev, showEndPicker: Platform.OS === 'ios' }));
    if (selectedDate) {
      const koreaDate = new Date(selectedDate);
      updateEventInput({ endDate: koreaDate });

      if (Platform.OS === 'android' && !eventInput.isAllDay) {
        updatePickerState({ showEndTimePicker: true });
      }
    }
  };

  const onEndTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const newDate = new Date(eventInput.endDate);
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
      if (newDate >= eventInput.startDate) {
        updateEventInput({ endDate: newDate });
      }
    }
  };

  const handleTimePickerState = (str: 'startT' | 'start' | 'end' | 'endT') => {
    const baseState = {
      showStartPicker: false,
      showEndPicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
    };

    setTimeout(() => {
      switch (str) {
        case 'startT':
          updatePickerState({ ...baseState, showStartTimePicker: true });
          break;
        case 'start':
          updatePickerState({ ...baseState, showStartPicker: true });
          break;
        case 'end':
          updatePickerState({ ...baseState, showEndPicker: true });
          break;
        case 'endT':
          updatePickerState({ ...baseState, showEndTimePicker: true });
          break;
      }
    }, 100);
  };

  useEffect(() => {
    const now = moment.tz('Asia/Seoul').toDate();
    const newStartDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      now.getHours(),
      now.getMinutes(),
    );
    const newEndDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      now.getHours() + 1,
      now.getMinutes(),
    );
    updateEventInput({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  }, [selectedDate]);

  const detailElements = [
    {
      title: '위치',
      onPress: () => {
        /* 위치 선택 모달/화면 오픈 */
      },
      value: eventInput.selectedLocation,
      icon: <LocationSVG width={24} height={24} />,
    },
    {
      title: '분류',
      onPress: () => {
        /* 분류 선택 모달/화면 오픈 */
      },
      value: eventInput.selectedCategory,
      icon: <CategorySVG width={24} height={24} />,
    },
    {
      title: '설명',
      onPress: () => updatePickerState({ isDescriptionOpen: true }),
      value: eventInput.description,
      icon: <DescSVG width={24} height={24} />,
    },
    {
      title: '색',
      onPress: () => {
        /* 색상 선택 모달 오픈 */
      },
      value: eventInput.selectedColor,
      icon: <PencilSVG width={24} height={24} />,
    },
    {
      title: '참여자',
      onPress: () => {
        /* 참여자 관리 화면 오픈 */
      },
      value:
        eventInput.participants.length > 0 &&
        `${eventInput.participants.length}명`,
      icon: <UserSVG width={24} height={24} />,
    },
    {
      title: '반복',
      onPress: () => {
        /* 반복 설정 모달 오픈 */
      },
      value: eventInput.repeatSetting,
      icon: <RepeateSVG width={24} height={24} />,
    },
    {
      title: '잠금',
      onPress: () => updateEventInput({ isLocked: !eventInput.isLocked }),
      value: eventInput.isLocked ? '잠김' : '잠금 해제',
      icon: <LockSVG width={24} height={24} />,
    },
  ];

  const AddFormElements = [
    {
      icon: <Hour24 width={24} height={24} />,
      title: '종일',
      rightElement: (
        <View style={styles.addFormRightStyle}>
          <Toggle
            onValueChange={() => {
              updateEventInput({ isAllDay: !eventInput.isAllDay });
              updatePickerState({
                showEndPicker: false,
                showEndTimePicker: false,
                showStartTimePicker: false,
                showStartPicker: false,
              });
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
      rightElement: (
        <View style={styles.addFormRightStyle}>
          <Text
            onPress={() => handleTimePickerState('start')}
            style={[
              {
                backgroundColor: pickerState.showStartPicker
                  ? colors.SKY_200
                  : colors.GRAY_200,
              },
              styles.dateTimeText,
            ]}
          >
            {formatDate(eventInput.startDate)}
          </Text>
          {!eventInput.isAllDay && (
            <Text
              onPress={() => handleTimePickerState('startT')}
              style={[
                {
                  backgroundColor: pickerState.showStartTimePicker
                    ? colors.SKY_200
                    : colors.GRAY_200,
                },
                styles.dateTimeText,
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
      rightElement: (
        <View style={styles.addFormRightStyle}>
          <Text
            onPress={() => handleTimePickerState('end')}
            style={[
              {
                backgroundColor: pickerState.showEndPicker
                  ? colors.SKY_200
                  : colors.GRAY_200,
              },
              styles.dateTimeText,
            ]}
          >
            {formatDate(eventInput.endDate)}
          </Text>
          {!eventInput.isAllDay && (
            <Text
              onPress={() => handleTimePickerState('endT')}
              style={[
                {
                  backgroundColor: pickerState.showEndTimePicker
                    ? colors.SKY_200
                    : colors.GRAY_200,
                },
                styles.dateTimeText,
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
        HandleEventSubmit={HandleEventSubmit}
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
        {AddFormElements.map(element => (
          <View key={element.title} style={styles.AddEventElementContainer}>
            <View style={styles.addFormLeftStyle}>
              <View style={styles.icon}>{element.icon}</View>
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
            onChange={onStartDateChange}
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
            onChange={onStartTimeChange}
            locale="ko-KR"
          />
        )}
        {pickerState.showEndPicker && (
          <DateTimePicker
            value={eventInput.endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
            onChange={onEndDateChange}
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
            onChange={onEndTimeChange}
            locale="ko-KR"
          />
        )}
      </View>

      {detailElements.map(element => (
        <View style={styles.listContainer} key={element.title}>
          <Pressable
            onPress={element.onPress}
            style={styles.AddEventElementContainer}
          >
            <View style={styles.addFormLeftStyle}>
              <View style={styles.icon}>{element.icon}</View>
              <Text style={styles.title}>{element.title}</Text>
            </View>
            <View style={styles.addFormRightStyle}>
              {element.value && (
                <Text style={styles.valueText}>{element.value}</Text>
              )}
              <RightArrowSVG width={24} height={24} />
            </View>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  addFormRightStyle: {
    flexDirection: 'row',
    gap: 10,
    marginRight: 10,
  },
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
  inputContainer: {
    marginBottom: 20,
  },
  descriptionInput: {
    fontSize: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#1a1a1a',
    backgroundColor: '#fafafa',
  },
  addFormLeftStyle: {
    flexDirection: 'row',
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddEventElementContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 4,
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
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  participantsContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  addParticipantButton: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  addButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  participantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  emailText: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  valueText: {
    fontSize: 13,
    color: colors.GRAY_400,
    marginRight: 8,
  },
});
export default AddEventForm;
