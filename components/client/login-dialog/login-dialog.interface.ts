import { IUserBaseInfo } from '../../../interface/request-response/user.interface';

export interface ILoginDialogProps {
  visible: boolean;
  onClose: () => unknown;
  onLogin?: (userBaseInfo: IUserBaseInfo) => void;
}
