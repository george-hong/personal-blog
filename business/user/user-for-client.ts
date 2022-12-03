import User from './user';
import {
  ISignInResponse,
  IUserBaseInfo,
} from '../../interface/request-response/user.interface';
import {
  TOKEN_EXPIRES_TIME_FIELD,
  TOKEN_FIELD,
  USER_BASE_INFO_FIELD,
} from '../../config/constant';
import { dispatcher } from '../../store';
import dayJS, { ManipulateType } from 'dayjs';
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

  static removeUserInfoFromLocal(): void {
    localStorage.removeItem(TOKEN_FIELD);
    localStorage.removeItem(TOKEN_EXPIRES_TIME_FIELD);
    localStorage.removeItem(USER_BASE_INFO_FIELD);
  }

  static saveSignInInfoToLocal(signInResponse: ISignInResponse): void {
    const { token, ...userBaseInfo } = signInResponse.data;
    const expireTimeStr = String(dayJS().add(User.TOKEN_EXPIRE_TIME, User.TOKEN_EXPIRE_UNIT as ManipulateType).valueOf());
    localStorage.setItem(TOKEN_FIELD, token);
    localStorage.setItem(TOKEN_EXPIRES_TIME_FIELD, expireTimeStr);
    localStorage.setItem(USER_BASE_INFO_FIELD, JSON.stringify(userBaseInfo));
  }

  /**
   * Remove user info if it is illegal.
   * @returns user is validation.
   */
  static removeUserInfoIfIllegal(): boolean {
    let validation = true;
    const token = localStorage.getItem(TOKEN_FIELD);
    const expireTime = localStorage.getItem(TOKEN_EXPIRES_TIME_FIELD);
    const userBaseInfo = localStorage.getItem(USER_BASE_INFO_FIELD);
    if (
      !token
      || !expireTime
      || !userBaseInfo
      || dayJS().isAfter(dayJS(expireTime))
    ) validation = false;
    if (!validation) {
      UserForClient.removeUserInfoFromLocal();
      dispatcher.setUser(null);
    }
    return validation;
  }
}

export default UserForClient;
