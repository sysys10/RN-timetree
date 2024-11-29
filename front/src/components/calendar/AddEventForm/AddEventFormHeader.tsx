import React, { useEffect, useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CrossSVG from '@/assets/cross.svg';
import Animated from 'react-native-reanimated';
import HideKeyboardSVG from '@/assets/hideKeyboard.svg';
import { colors } from '@/constants/colors';
interface AddEventFormHeaderProps {
  addFormBottomSheetRef: any;
  HandleEventSubmit: () => void;
}

function AddEventFormHeader({
  addFormBottomSheetRef,
  HandleEventSubmit,
}: AddEventFormHeaderProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleRightButtonPress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    }
  };

  return (
    <Animated.View style={styles.addFormHeader}>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={() => addFormBottomSheetRef.current.close()}
      >
        <CrossSVG width={40} height={40} color={colors.BLACK} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleRightButtonPress}
        style={styles.rightButton}
      >
        {isKeyboardVisible ? (
          <HideKeyboardSVG width={24} height={24} color={colors.BLACK} />
        ) : (
          <Text
            onPress={HandleEventSubmit}
            style={[styles.rightButtonText, styles.saveButtonText]}
          >
            저장
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  leftButton: {
    marginLeft: 2,
  },
  addFormHeader: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  rightButton: {
    paddingVertical: 8,
    marginRight: 12,
  },
  rightButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButtonText: {
    color: colors.BLUE_500,
    fontWeight: '600',
  },
});

export default AddEventFormHeader;
