import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { MutableRefObject, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import AgendaSheet from '../AgendaSheet';
import { BottomSheetRef, handleSheetChanges } from '@/utils/bottomSheet';
import { Event } from '@/types/calendar';
import { renderBackdrop } from './BackDrop';
interface AgendaBottomSheetProps {
  agendaBottomSheetRef: BottomSheetRef;
  addFormBottomSheetRef: BottomSheetRef;
  selectedDate: Date;
  selectedEventRef: React.MutableRefObject<Event[]>;
}

function AgendaBottomSheet({
  selectedEventRef,
  addFormBottomSheetRef,
  agendaBottomSheetRef,
  selectedDate,
}: AgendaBottomSheetProps) {
  return (
    <BottomSheet
      ref={agendaBottomSheetRef}
      index={-1}
      handleIndicatorStyle={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onChange={index => handleSheetChanges(index, agendaBottomSheetRef)}
      snapPoints={['92%']}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      animationConfigs={{
        damping: 80,
        mass: 1,
        stiffness: 500,
      }}
    >
      <BottomSheetView style={styles.container}>
        <AgendaSheet
          addFormBottomSheetRef={addFormBottomSheetRef}
          selectedDate={selectedDate}
          selectedEventRef={selectedEventRef.current}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AgendaBottomSheet;
