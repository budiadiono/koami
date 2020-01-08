export function controller(route?: string | RegExp): ClassDecorator {
  return (target: Function) => {
    target.prototype.route = route
  }
}
