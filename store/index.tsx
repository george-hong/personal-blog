import Store, { dispatcher } from './store';
import { connectStore } from './util';
import { StoreModuleEnum, UserActionEnum } from './store.interface';
import type { IStoreApp, IWithStore } from './store.interface';

export {
  connectStore,
  dispatcher,
  StoreModuleEnum,
  UserActionEnum,
  IStoreApp,
  IWithStore,
}
export default Store;
