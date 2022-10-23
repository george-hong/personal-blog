import { IUserClassOptions } from '../interface/user-class.interface';
import Secret from '../tools/secret';
import { SecretType } from '../interface/tool.interface';
import { ISignUpParams } from '../interface/user.interface';

// This class is creating for deal user relative logical.
class User {
  readonly userOptions: IUserClassOptions;

  constructor(userOptions: IUserClassOptions) {
    this.userOptions = userOptions;
  }

  public encodeAndSetPassword(password: string, key?: string): this {
    const tempPassword = Secret.encode(password, { type: SecretType.SHA256 });
    this.userOptions.password = Secret.encode(tempPassword, { type: SecretType.RSA, key });
    return this;
  }

  public generateSignUpParams(): ISignUpParams {
    const { account, password } = this.userOptions;
    return {
      account,
      password: password ?? '',
    };
  }

  public getDecodedPassword() {
    const decodeResult = (
      this.userOptions.password &&
      Secret.decode(this.userOptions.password, { type: SecretType.RSA })
    ) ?? null;
    return (decodeResult && decodeResult.payload) ?? '';
  }
}

export default User;
