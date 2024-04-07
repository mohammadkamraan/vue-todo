import { endPoints, endPointUrl } from '@/Constants/EndPoint'
import { Todo } from '@/Models/Todo'
import { RequestHandler } from './handlers/RequestHandler'
import { Methods } from '../Constants/API-mehods'
import { RequestOptions } from './handlers/RequestOptions'
import type { TodoResponse } from '@/types/TodoResponse'

export class TodoApi {
  private static todoApiInstance: TodoApi | null = null

  private constructor() {}

  private mapDynamicTodosToTodosModel(unTypedTodos: TodoResponse[]): Todo[] {
    return unTypedTodos.map((todo) => new Todo(todo.userId, todo.id, todo.title, todo.completed))
  }

  private mapUntypedTodoToModel(unTypedTodo: TodoResponse) {
    return new Todo(unTypedTodo.userId, unTypedTodo.id, unTypedTodo.title, unTypedTodo.completed)
  }

  public async getAllTodos(filters: {
    completed: boolean | null
  }): Promise<[Todo[] | null, Error | null]> {
    const mappedTodos: Todo[] = []
    const requestHandler = new RequestHandler()
    const [data, error] = await requestHandler.sendRequest<
      {
        userId: number
        id: number
        title: string
        completed: boolean
      }[]
    >(endPointUrl + endPoints.AllTodos, new RequestOptions(Methods.Get), filters, 5)

    if (data) mappedTodos.push(...this.mapDynamicTodosToTodosModel(data))

    return [mappedTodos, error]
  }

  public async getTodo(todoId: number): Promise<[Todo | null, Error | null]> {
    let mappedTodo: Todo | null = null

    const requestHandler = new RequestHandler()

    const [data, error] = await requestHandler.sendRequest<TodoResponse>(
      endPointUrl + endPoints.AllTodos + todoId,
      new RequestOptions(Methods.Get)
    )

    if (data) mappedTodo = this.mapUntypedTodoToModel(data)

    return [mappedTodo, error]
  }

  public static GetInstance(): TodoApi {
    const isTodoInstanceEmpty: boolean = TodoApi.todoApiInstance === null
    if (isTodoInstanceEmpty) {
      TodoApi.todoApiInstance = new TodoApi()
    }
    return TodoApi.todoApiInstance as TodoApi
  }
}
