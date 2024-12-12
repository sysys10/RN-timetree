import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigation';
import { authNavigations } from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import { colors } from '@/constants/colors';
import responsive from '@/utils/responsive';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({ navigation }: AuthHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.bigTitle}>AIRA</Text>
        <Text style={styles.subtitle}>ㅇㅅㅇ</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            당신만의 스케쥴 플래너 {'\n'}더 편하게 에약하세요
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
          label="무료로 시작하기"
          size="lg"
          variant="outlined"
        />
        <Text style={styles.white}>
          이미 회원이신가요?
          <Text
            style={styles.underline}
            onPress={() => navigation.navigate(authNavigations.LOGIN)}
          >
            로그인
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.MY_BLUE,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: responsive(50),
  },
  buttonContainer: {
    marginBottom: responsive(40),
  },
  bigTitle: {
    fontSize: responsive(48),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: responsive(8),
  },
  subtitle: {
    fontSize: responsive(24),
    color: colors.WHITE,
    opacity: 0.65,
    marginBottom: responsive(32),
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: responsive(18),
    color: colors.WHITE,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: responsive(26),
  },
  white: {
    color: 'white',
    textAlign: 'center',
    marginTop: responsive(20),
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default AuthHomeScreen;
