import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../constants/colors';
import responsive from '../../utils/responsive';

interface CustomButtonProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'lg' | 'md' | 'sm';
  onPress?: () => void;
  isValid?: boolean;
}

function CustomButton({
  label,
  variant = 'filled',
  size = 'md',
  onPress = () => console.log(label + 'clicked'),
  isValid = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[size],
        styles[variant],
        isValid && styles.isValid,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  isValid: {
    opacity: 0.5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsive(8),
    marginHorizontal: 'auto',
  },
  text: {
    fontSize: responsive(16),
    fontWeight: '600',
  },
  lg: {
    width: responsive(280),
    paddingVertical: responsive(18),
  },
  md: {
    width: responsive(150),
    paddingVertical: responsive(14),
  },
  sm: {
    width: responsive(100),
    paddingVertical: responsive(10),
  },
  filled: {
    backgroundColor: colors.BLUE_500,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.BLUE_500,
    backgroundColor: 'white',
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.BLUE_500,
  },
});

export default CustomButton;
