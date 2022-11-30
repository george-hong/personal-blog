import { UserActionEnum } from '../store.interface';

// TODO: fix type
const user = (state = null, action: any) => {
  const { type, data } = action;
  switch(type) {
    case UserActionEnum.SET:
      return data;
    case UserActionEnum.ClEAR:
    default:
      return state;
  }
}

export default user;
