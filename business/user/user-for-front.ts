import User from './user';
import { ILoginResponse, IUserBaseInfo } from '../../interface/request-response/user.interface';
import {
  TOKEN_FIELD,
  USER_BASE_INFO_FIELD,
} from '../../config/constant';
import { IUserAvatarConfig } from './user.interface';

class UserForFront extends User {
  static checkIsLogin(): boolean {
    let isLogin = false;
    const hasToken = !!localStorage.getItem(TOKEN_FIELD);
    let userBaseInfo;
    try {
      userBaseInfo = JSON.parse(localStorage.getItem(USER_BASE_INFO_FIELD) as string);
    } catch (err) {
      // If occur when parsing, that means login fail.
    }
    if (hasToken && userBaseInfo) isLogin = true;
    return isLogin;
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
    }
  }

  static removeUserBaseInfoFromLocal(): void {
    localStorage.removeItem(TOKEN_FIELD);
    localStorage.removeItem(USER_BASE_INFO_FIELD);
  }

  public saveLoginInfoToLocal(loginResponse: ILoginResponse): void {
    const { token, ...userBaseInfo } = loginResponse.data;
    localStorage.setItem(TOKEN_FIELD, token);
    localStorage.setItem(USER_BASE_INFO_FIELD, JSON.stringify(userBaseInfo));
  }
}

export default UserForFront;
