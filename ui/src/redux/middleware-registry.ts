export default class MiddlewareRegistry {
  static middlewares: Function[] = [];
  static add(mw: Function) {
    this.middlewares.push(mw);
  }
  static getAll(): any {
    return this.middlewares;
  }
}
