import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEntity } from '../models/base-entity.model';
import { BaseDataService } from './data.service';


@Injectable()
export class DataServiceFactory {

    constructor(private http: HttpClient) {
    }

    create(entity: BaseEntity): BaseDataService {
        const service = new BaseDataService(this.http);
        service.setEntity(entity);
        return service;
    }

}
