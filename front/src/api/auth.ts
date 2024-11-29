import axiosInstance from './axios';
import { getEncryptStorage } from '@/utils/encryptStorage';
import { Profile } from '@/type/domain';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  console.log(email, password);
  const { data } = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });
  console.log(data.accessToken);
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};
const getProfile = async (): Promise<Profile> => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};

export { postSignup, postLogin, getAccessToken, logout, getProfile };
export type { RequestUser, ResponseToken };
