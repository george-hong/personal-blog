import jwt from 'jsonwebtoken';
import User from './user';
import {
  ISignInQueryResult,
  IUserBaseInfo,
} from '../../interface/request-response/user.interface';
import PROJECT_CONFIG from '../../config/project';
import { AVATARS_DIR } from '../../config/constant';

class UserForServer extends User {
  static generateUserInfoBySignInResult(accountInfo: ISignInQueryResult): IUserBaseInfo {
    const { id, privateKey, nickName, avatar } = accountInfo;
    const token = jwt.sign({ id }, privateKey, { expiresIn: '1h' });
    const avatarResult = avatar ? `${ PROJECT_CONFIG.CLIENT_BASE_URL }${ AVATARS_DIR }/${ avatar }` : '';
    return {
      token,
      nickName,
      avatar: avatarResult,
      id: accountInfo.id,
    };
  }
}

export default UserForServer;
