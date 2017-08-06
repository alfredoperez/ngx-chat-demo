export function Entity<T extends Function>(name: string): Function {

  return function (target) {
    target.prototype['$$name'] = name;
  };

}

export function EntityProperty<T>(entity?: { new (): T }): any {
  return function (target, property) {

    target[property] = new entity();
  };
}
