import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Pressable,
} from 'react-native';
import { colors } from '../../constants';
import responsive from '../../utils/responsive';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

function InputField({
  disabled = false,
  error,
  touched,
  ...props
}: InputFieldProps) {
  const innerRef = useRef<TextInput | null>(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.errorContainer,
          ]}
        >
          <TextInput
            ref={innerRef}
            {...props}
            style={[styles.input, disabled && styles.disabledText]}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_400}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
          />
        </View>
      </Pressable>
      {touched && Boolean(error) && (
        <Text style={styles.errorMessage}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: responsive(8),
  },
  container: {
    borderWidth: responsive(1),
    borderColor: colors.GRAY_200,
    borderRadius: responsive(8),
    padding: responsive(12),
    backgroundColor: colors.GRAY_100,
  },
  input: {
    fontSize: responsive(16),
    color: colors.BLACK,
    padding: 0,
    height: responsive(24),
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
  },
  disabledText: {
    color: colors.GRAY_500,
  },
  errorContainer: {
    borderColor: colors.RED_500,
    backgroundColor: `${colors.RED_500}10`,
  },
  errorMessage: {
    color: colors.RED_500,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default InputField;
