import { IInterceptorHandler } from './request.interface';

class Interceptor<T> {
  private successHandlers: Array<IInterceptorHandler<T>> | null;
  private failHandlers: Array<IInterceptorHandler<T>> | null;

  constructor() {
    this.successHandlers = [];
    this.failHandlers = [];
  }

  public use(successHandler?: IInterceptorHandler<T>, failHandler?: IInterceptorHandler<T>) {
    if (successHandler) this.successHandlers?.push(successHandler);
    if (failHandler) this.failHandlers?.push(failHandler);
    return this;
  }

  public reduce(config: T, isSuccess = true): unknown {
    const handlers = this[isSuccess ? 'successHandlers' : 'failHandlers'];
    if (handlers?.length) {
      return handlers.reduce((total: T, handler: IInterceptorHandler<T>) => handler(total), config);
    }
    return config;
  }

  public destroy() {
    this.successHandlers = null;
    this.failHandlers = null;
  }
}

export default Interceptor;
