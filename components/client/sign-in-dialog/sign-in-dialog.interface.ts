import { IUserBaseInfo } from '../../../interface/request-response/user.interface';

export interface ISignInDialogProps {
  visible: boolean;
  onClose: () => unknown;
  onSignIn?: (userBaseInfo: IUserBaseInfo) => void;
}
