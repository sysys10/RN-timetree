import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import CustomButton from '../../components/common/CustomButton';
import { colors } from '../../constants/colors';
import responsive from '../../utils/responsive';
import InputField from '../../components/common/InputField';

function FindPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>비밀번호 찾기</Text>
        <Text style={styles.subtitle}>가입하신 이메일을 입력해주세요</Text>

        <InputField
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomButton
          label="비밀번호 찾기"
          variant="filled"
          size="lg"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    flex: 1,
    padding: responsive(20),
    justifyContent: 'center',
  },
  title: {
    fontSize: responsive(24),
    fontWeight: 'bold',
    marginBottom: responsive(8),
  },
  subtitle: {
    fontSize: responsive(16),
    color: colors.GRAY_500,
    marginBottom: responsive(32),
  },
});
export default FindPasswordScreen;
