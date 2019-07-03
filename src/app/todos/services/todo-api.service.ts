import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';
import {ErrorAppResponse} from '../../shared/dtos/responses/base.dto';
import {Todo} from '../dtos/responses/todos.dto';


@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  private readonly baseUrl: string;

  private readonly httpOptions: object;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/todos';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };
  }

  fetchAll(): Observable<Todo[] | ErrorAppResponse> {
    return this.httpClient.get<Todo[] | ErrorAppResponse>(`${this.baseUrl}`);
  }

  getCompleted(): Observable<Todo[] | ErrorAppResponse> {
    return this.httpClient.get<Todo[] | ErrorAppResponse>(`${this.baseUrl}/completed`);
  }

  getPending(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.baseUrl}/pending`);
  }

  update(todo: Todo): Observable<Todo | ErrorAppResponse> {
    return this.httpClient.put<Todo | ErrorAppResponse>(`${this.baseUrl}/${todo.id}`, todo);
  }

  deleteAll(): Observable<HttpResponse<void | ErrorAppResponse>> {
    return this.httpClient.delete<void | ErrorAppResponse>(this.baseUrl, {observe: 'response'});
  }

  deleteById(id: number | string): Observable<HttpResponse<void | ErrorAppResponse>> {
    return this.httpClient.delete<void | ErrorAppResponse>(`${this.baseUrl}/${id}`, {
      ...this.httpOptions, observe: 'response'
    });
  }

  getById(id: number | string): Observable<Todo | ErrorAppResponse> {
    return this.httpClient.get<Todo | ErrorAppResponse>(`${this.baseUrl}/${id}`);
  }

  createTodo(todo: Todo): Observable<HttpResponse<Todo | ErrorAppResponse>> {
    console.log(todo);
    return this.httpClient.post<Todo | ErrorAppResponse>(this.baseUrl, todo, {observe: 'response'});
  }
}
