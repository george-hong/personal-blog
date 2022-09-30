import type { NextApiRequest, NextApiResponse } from 'next';
import { MiddlewareHandler } from './middleware.interface';

class Middleware {
  readonly req: NextApiRequest;
  readonly res: NextApiResponse;
  readonly processes: Array<() => Promise<void>>;
  private isFinish: boolean;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
    this.isFinish = false;
    this.processes = [];
  }

  public use(handler: MiddlewareHandler): this {
    this.processes.push(async () => {
      return new Promise<void>((resolve) => {
        if (this.isFinish) return resolve();
        handler(this.req, this.res, (isFinish) => {
          if (isFinish === true) this.isFinish = isFinish;
          resolve();
        });
      });
    })
    return this;
  }

  public async run() {
    for (let index = 0; index < this.processes.length; index++) {
      if (this.isFinish) break;
      await this.processes[index]();
    }
  }
}

export default Middleware;
