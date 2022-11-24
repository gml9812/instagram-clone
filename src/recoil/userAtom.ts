import { User } from '@queries/auth';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v1 } from 'uuid';

const { persistAtom } = recoilPersist();

export interface UserAtomState extends User {
  isLogin: boolean;
}

export const userState = atom({
  key: `userState/${v1()}`,
  default: {
    id: 0,
    nickname: '',
    profileImage: '',
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
