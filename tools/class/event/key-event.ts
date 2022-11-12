import { KeyEnum } from './event.interface';

class KeyEvent {
  static getKeyListener<T>(key: string, handler: (event: React.KeyboardEvent<T>) => void): (event: React.KeyboardEvent<T>) => void {
    return function(event: React.KeyboardEvent<T>) {
      if (event?.key === KeyEnum.Enter) handler?.(event);
    };
  }
}

export default KeyEvent;
