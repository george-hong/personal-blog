import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IStoreState,
  StoreModuleEnum,
} from './store.interface';
import { IUniformObject } from '../interface/base.interface';

function mapStateToProps(modules: IUniformObject<StoreModuleEnum>) {
  return function(state: IStoreState) {
    return Object.entries(modules).reduce((result, keyAndStateField) => {
      const [key, stateField] = keyAndStateField
      result[key] = state[stateField];
      return result;
    }, {} as IUniformObject<unknown>)
  }
}

function connectStore(modules: IUniformObject<StoreModuleEnum> | Array<StoreModuleEnum>) {
  const moduleMapping = Array.isArray(modules) ? modules.reduce((total, key) => {
    total[key] = key;
    return total;
  }, {} as IUniformObject<StoreModuleEnum>) : modules;
  // TODO: fix types.
  return function(component: any) {
    return connect(
      mapStateToProps(moduleMapping),
      (dispatch: Dispatch) => ({ dispatch }),
      // TODO: fix types.
    )(component) as any;
  }
}

export {
  connectStore,
}
