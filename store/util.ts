import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IStoreState,
  StoreModuleEnum,
} from './store.interface';

function mapStateToProps(modules: Array<StoreModuleEnum>) {
  return function(state: IStoreState) {
    const partialStore: Partial<IStoreState> = {};
    modules.forEach(key => partialStore[key] = state[key]);
    return {
      store: partialStore,
    }
  }
}

function connectStore(modules: Array<StoreModuleEnum>) {
  return connect(
    mapStateToProps(modules),
    (dispatch: Dispatch) => ({ dispatch }),
  );
}

export {
  connectStore,
}
