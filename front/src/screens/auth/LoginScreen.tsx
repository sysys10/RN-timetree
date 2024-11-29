import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigation';
import { authNavigations } from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import responsive from '@/utils/responsive';
import { colors } from '@/constants/colors';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/utils/validates';
import { TextInput } from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';

type LoginScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.LOGIN
>;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const passwordRef = useRef<TextInput | null>(null);

  const { loginMutation } = useAuth();

  const login = useForm({
    initialValue: { email: '', password: '' },
    validate: validateLogin,
  });

  const handleLogin = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.title}>뭐시기 관리 서비스</Text>
          <View style={styles.inputContainer}>
            <InputField
              placeholder="이메일"
              error={login.errors.email}
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              // onSubmitEditing={() => passwordRef.current?.focus()}
              touched={login.touched.email}
              {...login.getTextInputProps('email')}
            />
            <InputField
              placeholder="비밀번호"
              error={login.errors.password}
              placeholderTextColor="#666"
              secureTextEntry
              touched={login.touched.password}
              {...login.getTextInputProps('password')}
            />
          </View>
          <CustomButton
            size="lg"
            label="로그인"
            variant="filled"
            onPress={handleLogin}
          ></CustomButton>
          <View style={styles.additionalOptions}>
            <Text
              style={styles.textButtonText}
              onPress={() => navigation.navigate(authNavigations.FINDPASSWORD)}
            >
              비밀번호 찾기
            </Text>
            <Text
              style={styles.textButtonText}
              onPress={() => navigation.navigate(authNavigations.SIGNUP)}
            >
              회원가입
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(50),
  },
  title: {
    fontSize: responsive(28),
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: responsive(40),
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: responsive(20),
  },
  additionalOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsive(12),
    alignItems: 'center',
    gap: responsive(20),
  },
  textButtonText: {
    color: colors.GRAY_500,
    fontSize: responsive(14),
  },
});

export default LoginScreen;
