import { IUserBaseInfo } from '../../../interface/user.interface';

export interface ILoginDialogProps {
  visible: boolean;
  onClose: () => unknown;
  onLogin?: (userBaseInfo: IUserBaseInfo) => void;
}
