import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import {
  IStoreProps,
  StoreModuleEnum,
  UserActionEnum,
} from './store.interface';
import { IUserBaseInfo } from '../interface/request-response/user.interface';

const store = createStore(reducers);
const dispatch = store.dispatch;

const Store: FC = (props: IStoreProps): ReactElement => {
  const { children } = props;
  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
};

const dispatcher = {
  setUser(userBaseInfo: IUserBaseInfo | null): void {
    dispatch({
      module: StoreModuleEnum.USER,
      type: UserActionEnum.SET,
      data: userBaseInfo,
    });
  }
}

export { dispatcher };
export default Store;
