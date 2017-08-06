import { BaseEntity } from '../models/base-entity.model';

export interface ApiEndpointOptions {
  entity: any;
}

export function DataService<T extends Function, U extends BaseEntity>(options: ApiEndpointOptions): Function {

  return function (target) {

    const entity = new options.entity();

    target.prototype['$$entity'] = (<any>entity);
    target.prototype['$$entityName'] = (<any>entity).$$name;
  };

}

