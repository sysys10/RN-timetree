import { BottomSheetRef, handleSheetChanges } from '@/utils/bottomSheet';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';
import { renderBackdrop } from './BackDrop';
import AddEventForm from '../AddEventForm/AddEventForm';

interface AddFormBottomSheetProps {
  addFormBottomSheetRef: BottomSheetRef;
  selectedDate: Date;
}

function AddFormBottomSheet({
  addFormBottomSheetRef,
  selectedDate,
}: AddFormBottomSheetProps) {
  return (
    <BottomSheet
      handleIndicatorStyle={{ display: 'none' }}
      ref={addFormBottomSheetRef}
      index={-1}
      onChange={index => handleSheetChanges(index, addFormBottomSheetRef)}
      snapPoints={['90%']}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      animationConfigs={{
        damping: 80,
        mass: 1,
        stiffness: 500,
      }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <AddEventForm
          selectedDate={selectedDate}
          addFormBottomSheetRef={addFormBottomSheetRef}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});

export default AddFormBottomSheet;
