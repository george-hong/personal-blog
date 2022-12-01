import {
  IAction,
  StoreModuleEnum,
  UserActionEnum,
} from '../store.interface';

const user = (state = null, action: IAction<unknown>) => {
  const { type, data, module } = action;
  if (module !== StoreModuleEnum.USER) return state;
  switch(type) {
    case UserActionEnum.SET:
      return data;
    case UserActionEnum.ClEAR:
    default:
      return state;
  }
}

export default user;
