import responsive from '@/utils/responsive';
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface ToggleProps {
  onValueChange?: (value: boolean) => void;
  initialValue?: boolean;
  trackColor?: {
    false: string;
    true: string;
  };
  style?: ViewStyle;
}

const Toggle: React.FC<ToggleProps> = ({
  onValueChange,
  initialValue = false,
  trackColor = { false: '#e9e9e9', true: '#4CD964' },
  style,
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(initialValue);
  const [animation] = useState<Animated.Value>(
    new Animated.Value(initialValue ? 1 : 0),
  );

  const toggleSwitch = (): void => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    onValueChange?.(newValue);
  };

  const translateX = animation.interpolate<number>({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch} style={style}>
      <View
        style={[
          styles.track,
          { backgroundColor: isEnabled ? trackColor.true : trackColor.false },
        ]}
      >
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX }] }]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: responsive(50),
    height: responsive(28),
    borderRadius: responsive(15),
    justifyContent: 'center',
  },
  thumb: {
    width: responsive(28),
    height: responsive(28),
    borderRadius: responsive(13),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});

export default Toggle;
