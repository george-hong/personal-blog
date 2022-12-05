import {
  IHandler,
  IHandlerRecorder,
  IObject,
} from './event.interface';

class BaseEvent {
  private eventCollectionMap: IHandlerRecorder | null = {};
  private oneTimeEventCollectionMap: IHandlerRecorder | null = {};

  private bind(isOnce: boolean, eventType: string, handler: IHandler) {
    const collectionMap = isOnce ? this.oneTimeEventCollectionMap : this.eventCollectionMap;
    if (!collectionMap) return this;
    if (!collectionMap[eventType]) {
      collectionMap[eventType] = [];
    }
    if (!collectionMap[eventType].includes(handler)) {
      collectionMap[eventType].push(handler);
    }
    return this;
  }

  private release(isOnce: boolean, eventType: string, handler?: IHandler) {
    const collectionMap = isOnce ? this.oneTimeEventCollectionMap : this.eventCollectionMap;
    if (!collectionMap || !collectionMap[eventType]) return this;
    if (!handler) delete collectionMap[eventType];
    else {
      const index = collectionMap[eventType].indexOf(handler);
      if (index > -1) collectionMap[eventType].splice(index, 1);
    }
    return this;
  }

  private trigger(isOnce: boolean, eventType: string, parameters?: IObject) {
    const collectionMap = isOnce ? this.oneTimeEventCollectionMap : this.eventCollectionMap;
    if (collectionMap && collectionMap[eventType]) {
      collectionMap[eventType].forEach((handler: IHandler) => {
        let event = new Event(eventType);
        if (parameters) {
          const { isTrusted, ...params } = parameters;
          event = Object.assign(event, params);
        }

        handler.call(this, event);
      });
      // If operation is once, clearing handler.
      if (isOnce) delete collectionMap[eventType];
    }
  }

  public on(eventType: string, handler: IHandler) {
    return this.bind(false, eventType, handler);
  }

  public once(eventType: string, handler: IHandler) {
    return this.bind(true, eventType, handler);
  }

  public off(eventType: string, handler?: IHandler) {
    this.release(true, eventType, handler);
    this.release(false, eventType, handler);
    return this;
  }

  public fire(eventType: string, parameters?: IObject) {
    this.trigger(true, eventType, parameters);
    this.trigger(false, eventType, parameters);
    return this;
  }

  public destroy() {
    this.eventCollectionMap = null;
    this.oneTimeEventCollectionMap = null;
  }
}

export default BaseEvent;
