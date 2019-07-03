import { TestBed } from '@angular/core/testing';

import { TodoApiService } from './todo-api.service';

describe('TodoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoApiService = TestBed.get(TodoApiService);
    expect(service).toBeTruthy();
  });
});
