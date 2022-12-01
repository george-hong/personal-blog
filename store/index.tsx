import Store from './store';
import { connectStore } from './util';
import { StoreModuleEnum, UserActionEnum } from './store.interface';
import type { IStoreApp } from './store.interface';

export {
  connectStore,
  StoreModuleEnum,
  UserActionEnum,
  IStoreApp,
}
export default Store;
