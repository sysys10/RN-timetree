// hooks/useEventForm.ts
import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import moment from 'moment-timezone';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { EventInput, PickerState } from '@/types/addEventform';

export const useEventForm = (selectedDate: Date, addFormBottomSheetRef: any) => {
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

    const [eventInput, setEventInput] = useState<EventInput>(initialEventInput);
    const [pickerState, setPickerState] = useState<PickerState>(initialPickerState);

    const updateEventInput = (updates: Partial<EventInput>) => {
        setEventInput(prev => ({ ...prev, ...updates }));
    };

    const updatePickerState = (updates: Partial<PickerState>) => {
        setPickerState(prev => ({ ...prev, ...updates }));
    };

    const handleEventSubmit = () => {
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

    const handleDateChange = (
        type: 'start' | 'end',
        event: DateTimePickerEvent,
        selectedDate?: Date,
    ) => {
        if (!selectedDate) return;

        const koreaDate = new Date(selectedDate);
        const pickerKey = type === 'start' ? 'showStartPicker' : 'showEndPicker';
        const timePickerKey = type === 'start' ? 'showStartTimePicker' : 'showEndTimePicker';
        const inputKey = type === 'start' ? 'startDate' : 'endDate';

        updatePickerState({ [pickerKey]: Platform.OS === 'ios' });
        updateEventInput({ [inputKey]: koreaDate });

        if (Platform.OS === 'android' && !eventInput.isAllDay) {
            updatePickerState({ [timePickerKey]: true });
        }
    };

    const handleTimeChange = (
        type: 'start' | 'end',
        event: DateTimePickerEvent,
        selectedDate?: Date,
    ) => {
        if (!selectedDate) return;

        const baseDate = type === 'start' ? eventInput.startDate : eventInput.endDate;
        const newDate = new Date(baseDate);
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());

        if (type === 'start') {
            updateEventInput({ startDate: newDate });
            if (newDate > eventInput.endDate) {
                updateEventInput({ endDate: newDate });
            }
        } else if (newDate >= eventInput.startDate) {
            updateEventInput({ endDate: newDate });
        }
    };

    const handleTimePickerState = (type: 'startT' | 'start' | 'end' | 'endT') => {
        const baseState = {
            showStartPicker: false,
            showEndPicker: false,
            showStartTimePicker: false,
            showEndTimePicker: false,
        };

        const stateMap = {
            startT: { showStartTimePicker: !pickerState.showStartTimePicker },
            start: { showStartPicker: !pickerState.showStartPicker },
            end: { showEndPicker: !pickerState.showEndPicker },
            endT: { showEndTimePicker: !pickerState.showEndTimePicker },
        };

        setTimeout(() => {
            updatePickerState({ ...baseState, ...stateMap[type] });
        }, 100);
    };

    useEffect(() => {
        const now = moment.tz('Asia/Seoul');
        updateEventInput({
            startDate: moment(selectedDate).set({ hour: now.hour(), minute: now.minute() }).toDate(),
            endDate: moment(selectedDate).set({ hour: now.hour() + 1, minute: now.minute() }).toDate(),
        });
    }, [selectedDate]);

    return {
        initialPickerState,
        initialEventInput,
        eventInput,
        pickerState,
        updateEventInput,
        updatePickerState,
        handleEventSubmit,
        handleDateChange,
        handleTimeChange,
        handleTimePickerState,
    };
};