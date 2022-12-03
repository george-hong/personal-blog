import {
  IUserAction,
  StoreModuleEnum,
  UserActionEnum,
} from '../store.interface';

const user = (state = null, action: IUserAction) => {
  const { type, data, module } = action;
  if (module !== StoreModuleEnum.USER) return state;
  switch(type) {
    case UserActionEnum.SET:
      return data;
    default:
      return state;
  }
}

export default user;
