import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
type BottomSheetRef = React.RefObject<BottomSheet>;

const handleSheetChanges = (index: number, bottomSheetRef: BottomSheetRef) => {
  if (index === 0) {
    bottomSheetRef.current?.close();
  }
};

export { handleSheetChanges };
export type { BottomSheetRef };
