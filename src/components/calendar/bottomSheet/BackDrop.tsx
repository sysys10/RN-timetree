import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';

const renderBackdrop = useCallback(
  (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
  [],
);

export { renderBackdrop };
