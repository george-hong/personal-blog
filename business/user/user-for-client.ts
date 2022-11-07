import User from './user';
import {
  ISignInResponse,
  IUserBaseInfo,
} from '../../interface/request-response/user.interface';
import {
  TOKEN_FIELD,
  USER_BASE_INFO_FIELD,
} from '../../config/constant';
import { IUserAvatarConfig } from './user.interface';

class UserForClient extends User {
  static checkIsSignIn(): boolean {
    let isSignIn = false;
    const hasToken = !!localStorage.getItem(TOKEN_FIELD);
    let userBaseInfo;
    try {
      userBaseInfo = JSON.parse(localStorage.getItem(USER_BASE_INFO_FIELD) as string);
    } catch (err) {
      // If occur when parsing, that means sign in fail.
    }
    if (hasToken && userBaseInfo) isSignIn = true;
    return isSignIn;
  }

  static getUserBaseInfoFromLocal(): IUserBaseInfo | null {
    const baseInfoString = localStorage.getItem(USER_BASE_INFO_FIELD);
    return baseInfoString ? JSON.parse(baseInfoString) : null;
  }

  static getUserAvatarConfig(userBaseInfo: IUserBaseInfo): IUserAvatarConfig {
    const { nickName, avatar } = userBaseInfo;
    return {
      alt: nickName,
      src: avatar,
    };
  }

  static removeUserBaseInfoFromLocal(): void {
    localStorage.removeItem(TOKEN_FIELD);
    localStorage.removeItem(USER_BASE_INFO_FIELD);
  }

  public saveSignInInfoToLocal(signInResponse: ISignInResponse): void {
    const { token, ...userBaseInfo } = signInResponse.data;
    localStorage.setItem(TOKEN_FIELD, token);
    localStorage.setItem(USER_BASE_INFO_FIELD, JSON.stringify(userBaseInfo));
  }
}

export default UserForClient;
