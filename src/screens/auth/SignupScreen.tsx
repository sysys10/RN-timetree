import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import responsive from '@/utils/responsive';
import { colors } from '@/constants/colors';
import useForm from '@/hooks/useForm';
import { validateSignup } from '@/utils';
import useAuth from '@/hooks/queries/useAuth';

function SignUpScreen() {
  const navigation = useNavigation();
  const passwordRef = useRef<TextInput | null>(null);
  const { signupMutation, loginMutation } = useAuth();

  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      firm: '',
      phone: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const { email, password } = signup.values;
    console.log({ email, password });

    signupMutation.mutate(signup.values, {
      onSuccess: () => loginMutation.mutate({ email, password }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>회원가입</Text>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="이메일"
            error={signup.errors.email}
            keyboardType="email-address"
            touched={signup.touched.email}
            inputMode="email"
            autoCapitalize="none"
            {...signup.getTextInputProps('email')}
          />
          <InputField
            placeholder="비밀번호"
            error={signup.errors.password}
            touched={signup.touched.password}
            secureTextEntry
            {...signup.getTextInputProps('password')}
          />
          <InputField
            placeholder="비밀번호 확인"
            error={signup.errors.passwordConfirm}
            touched={signup.touched.passwordConfirm}
            secureTextEntry
            {...signup.getTextInputProps('passwordConfirm')}
          />
          <InputField
            placeholder="이름"
            error={signup.errors.name}
            touched={signup.touched.name}
            maxLength={5}
            {...signup.getTextInputProps('name')}
          />
          <InputField
            placeholder="회사명"
            error={signup.errors.firm}
            touched={signup.touched.firm}
            maxLength={30}
            {...signup.getTextInputProps('firm')}
          />
          <InputField
            placeholder="전화번호 (- 없이 입력)"
            error={signup.errors.phone}
            touched={signup.touched.phone}
            keyboardType="number-pad"
            maxLength={11}
            {...signup.getTextInputProps('phone')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            label="가입하기"
            variant="filled"
            size="md"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollView: {
    flexGrow: 1,
    padding: responsive(20),
  },
  title: {
    fontSize: responsive(24),
    fontWeight: 'bold',
    marginVertical: responsive(32),
  },
  inputContainer: {
    marginBottom: responsive(32),
    gap: responsive(4),
  },
  buttonContainer: {
    gap: responsive(8),
  },
});

export default SignUpScreen;
