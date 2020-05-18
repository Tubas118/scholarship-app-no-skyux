import { Injectable } from '@angular/core';
import { IdService } from '../basic/basic-id-service';
import { randomData } from '../shared-data-utils';

@Injectable({
  providedIn: 'root'
})
export class UuidIdService implements IdService<string> {
  public newId(): string {
    return randomData.uuid();
  }
}
