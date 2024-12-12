type UserInformation = { email: string; password: string };

export function validateLogin(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }
  return errors;
}

type SignupInformation = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  firm: string;
  phone: string;
};

export function validateSignup(values: SignupInformation) {
  const errors = {
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    firm: '',
    phone: '',
  };

  // 이메일 검증
  if (!/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  // 비밀번호 검증
  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(
      values.password,
    )
  ) {
    errors.password = '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.';
  }

  // 비밀번호 확인 검증
  else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  // 이름 검증
  else if (values.name.length < 2 || values.name.length > 5) {
    errors.name = '이름은 2~5자 사이로 입력해주세요.';
  }

  // 회사명 검증
  if (values.firm.length < 2) {
    errors.firm = '회사명은 2자 이상 입력해주세요.';
  }

  // 전화번호 검증
  if (!/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(values.phone)) {
    errors.phone = '올바른 전화번호 형식이 아닙니다.';
  }

  return errors;
}
