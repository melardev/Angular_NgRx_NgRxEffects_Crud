import {BaseAppResponse, PagedResponse} from '../../../shared/dtos/responses/base.dto';


export class Todo {
  id: number | string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  completed: boolean;
}

export class TodoListDtoResponse extends PagedResponse {
  todos: Todo[];
}

export class TodoDetailsResponseDto extends BaseAppResponse {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}
