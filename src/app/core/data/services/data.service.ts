import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseEntity } from '../models/base-entity.model';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { Criteria } from '../models/criteria.model';
import { PagedList } from '../models/paged-list.model';

@Injectable()
export class BaseDataService {

  private entityName: string;
  private entity: BaseEntity;
  private entityMapper: any;
  private url: string;

  constructor(public http: HttpClient) {

    this.url = environment.apiUrl;
    if ( !!(<any>this).$$entity ) {
      this.setEntity((<any>this).$$entity);
    }

  }

  setEntity(entity) {
    this.entity = entity;
    this.entityName = (<any>entity).$$name;
    this.entityMapper = (this.entity as BaseEntity).deserialize.bind(this.entity);
  }

  /**
   * Http GET method.
   *
   * @param customUrl The url endpoint to request data from.
   *
   * @returns Returns a promise containing the data sent back from the server.
   */
  get (customUrl?: string): any {
    const endpoint = customUrl || this.entityName;
    const url = this.url + endpoint;

    return this.http.get(url)
      .filter(response => (<any>response) != undefined
        && (<any>response).totalRecords != undefined
        && (<any>response).totalRecords >= 0)
      .map(this.handleCollectionResponse.bind(this))
      .catch(this.handleError);
  }

  getById(id: string, customUrl?: string): Observable<any> {

    const endpoint = customUrl || `${this.entityName}/${id}`;
    const url = this.url + endpoint;

    return this.http.get(url)
      .map(this.handleEntityResponse.bind(this))
      .catch(this.handleError);
  }

  /**
   * Http POST method.
   *
   * @param url The url endpoint to send data to.
   * @param object The object to send.
   *
   * @returns Returns a promise containing the data sent back from the server.
   */
  post(data: any, customUrl?: string): Observable<any> {
    const endpoint = customUrl || this.entityName;
    const url = this.url + endpoint;

    return this.http.post(url, data)
      .map(this.handleEntityResponse.bind(this))
      .catch(this.handleError);
  }

  /**
   * Http PUT method.
   *
   * @param url The url endpoint to send data to.
   * @param object The object to update.
   *
   * @returns Returns an empty promise.
   */
  put(data: any, customUrl?: string): Observable<any> {
    const endpoint = customUrl || this.entityName + '/' + data.id;
    const url = this.url + endpoint;


    return this.http.put(url, data)
      .map(this.handleEntityResponse.bind(this))
      .catch(this.handleError);
  }

  /**
   * Http DELETE method.
   *
   * @param url The url endpoint to send data to.
   * @param object The object to update.
   *
   * @returns Returns an empty promise.
   */
  delete(id: string, customUrl?: string): Observable<boolean> {
    const endpoint = customUrl || this.entityName + '/' + id;
    const url = this.url + endpoint;

    return this.http.delete(url)
      .map((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  // TODO add criteria
  getWithCriteria(criteria: Criteria, customUrl?: string): Observable<PagedList<BaseEntity>> {

    if ( criteria === undefined ) {
      return undefined;
    }
    const endpoint = customUrl || this.entityName;
    const url = this.url + endpoint;

    return this.http.get(url)
      .filter(response => (<any>response) != undefined
        && (<any>response).totalRecords != undefined
        && (<any>response).totalRecords >= 0)
      .map(this.handleCollectionResponse.bind(this))
      .catch(this.handleError);
  }

  /**
   * Get options for an Http request.
   *
   * @param error The Http Response error object.
   *
   */
  private handleError(response: HttpErrorResponse) {
    const error = response.error || response;
    return Observable.throw(error.statusText || error);
  }

  private handleEntityResponse(response) {
    const target = _.cloneDeep(this.entity);
    return target.deserialize(response);
  }

  private handleCollectionResponse(response): PagedList<any> {
    const collection = [];

    (<any>response).records.forEach(item => {
      const target = _.cloneDeep(this.entity);
      target.deserialize(item);
      collection.push(target);
    });

    return {
      records: collection,
      totalRecords: (<any>response).totalRecords || collection.length,
    } as PagedList<any>;
  }
}
