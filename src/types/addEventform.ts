interface Props {
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

export type { Props, Participant, EventInput, PickerState };