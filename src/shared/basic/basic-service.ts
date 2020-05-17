import { Observable } from 'rxjs';
import { BasicData } from './basic-data';

export interface BasicService<T extends BasicData<ID>, ID> {
  add(data: T): Observable<T>;
  update(data: T): Observable<T>;
  find(id: ID): Observable<T>;
  getPage(page: number): Observable<T[]>;
  getAll(): Observable<T[]>;
}
