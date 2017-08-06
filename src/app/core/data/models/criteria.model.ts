export class Criteria {
  public static  generateSearch(fields: string | Array<string>, values: string | Array<string>): Criteria {
    const criteria = new Criteria();

    if (typeof fields === 'string') {
      fields = [ fields ];
    }

    const searchBy = new Array<SearchCriteria>();
    fields.forEach(field => {
      if (typeof  values === 'string') {
        this.addCriteriaToSearch(field, values, searchBy);
      } else {
        values.forEach(value => {
          this.addCriteriaToSearch(field, value, searchBy);
        });
      }

    });

    criteria.searchBy = searchBy;
    return criteria;
  }

  private static addCriteriaToSearch(field: string, value: string, searchBy: Array<SearchCriteria>) {
    const searchCriteria = new SearchCriteria(field, value,
      FilterFieldOperator.Like,
      FilterLogicalOperator.Or);
    searchBy.push(searchCriteria);
  }

  constructor(public orderBy?: Array<OrderByCriteria>,
              public searchBy?: Array<SearchCriteria>,
              public pageSize?: number,
              public pageNumber?: number,
              public getTotalCount?: boolean) {
  }
}

export class SearchCriteria {
  constructor(public fieldName?: string,
              public fieldValue?: Array<any> | string | number | boolean,
              public fieldOperator?: FilterFieldOperator,
              public logicalOperator?: FilterLogicalOperator) {
  }

}

export enum FilterFieldOperator {
  Or = <any>'OR',
  And = <any>'AND',
  Equal = <any>'EQUAL',
  Like = <any>'LIKE'
}

export enum FilterLogicalOperator {
  Or = <any>'OR',
  And = <any>'AND'
}
export class OrderByCriteria {
  constructor(public fieldName: string,
              public type: number) {
  }
}
export enum OrderDirection {
  Ascending = 0,
  Descending = 1
}
