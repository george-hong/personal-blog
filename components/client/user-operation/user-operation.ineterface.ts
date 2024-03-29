import { IUserBaseInfo } from '../../../interface/request-response/user.interface';

export interface IUserOperationProps {
  userBaseInfo: IUserBaseInfo;
  onSignOut?: () => void;
}
