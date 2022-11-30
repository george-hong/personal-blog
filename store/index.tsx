import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { IStoreProps } from './store.interface';

const store = createStore(reducers);

const Store: FC = (props: IStoreProps): ReactElement => {
  const { children } = props;
  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
};

export default Store;
