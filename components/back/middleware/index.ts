import { MiddlewareHandler } from './middleware.interface';
import {
  ExtendedNextApiRequest,
  ExtendedNextApiResponse,
} from '../../../interface/sever.interface';

class Middleware {
  readonly req: ExtendedNextApiRequest;
  readonly res: ExtendedNextApiResponse;
  readonly processes: Array<() => Promise<void>>;

  constructor(req: ExtendedNextApiRequest, res: ExtendedNextApiResponse) {
    this.req = req;
    this.res = res;
    this.processes = [];
  }

  public use(handler: MiddlewareHandler): this {
    this.processes.push(async () => {
      return new Promise<void>((resolve) => {
        if (this.res.writableEnded) return resolve();
        handler(this.req, this.res, resolve);
      });
    })
    return this;
  }

  public async run() {
    for (let index = 0; index < this.processes.length; index++) {
      if (this.res.writableEnded) break;
      await this.processes[index]();
    }
  }
}

export default Middleware;
