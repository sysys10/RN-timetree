interface ImageUri {
  id: string;
  uri: string;
}

interface Profile {
  id: string;
  email: string;
  nickname: string;
  imageUri: string | null;
  loginType: 'email' | 'kakao';
}

export type { ImageUri, Profile };
