interface Serializable<T> {
  deserialize(input: Object): T;
}

export class BaseEntity implements Serializable<BaseEntity> {

  public $name: string;
  public id: string;

  public constructor() {
    this.$name = (<any>this).$$name;
  }

  public deserialize(input: Object): BaseEntity {
    for (const property in input) {
      if (!input.hasOwnProperty(property)) {
        continue;
      }

      if (typeof this[property] === 'object' && input[property] != undefined) {
        this[property] = this.deserializeEntity(this[property], input[property]);

      } else if (this.isDate(input[property])) {
        this[property] = new Date(input[property]);
      } else {
        this[property] = input[property];
      }

    }
    return this;
  }

  private deserializeEntity(entity, data) {
    if (entity == undefined || data == undefined) {
      return undefined;
    }

    let result;
    if (Array.isArray(data)) {
      const collection = [];
      for (const item in data) {
        if (item != undefined) {
          const deserialize = entity.deserialize(item);
          collection.push(deserialize);
        }

      }
      result = collection;
    } else {
      result = entity.deserialize(data);
    }
    return result;
  }

  private isDate(field: any) {
    return typeof field === 'string'
      && field.indexOf('Z') !== -1
      && !isNaN(Date.parse(field));
  }

  public get isNew(): boolean {
    return this.id === undefined;
  }
}
