import { endPoints, endPointUrl } from '@/Constants/EndPoint'
import { Todo } from '@/Models/Todo'
import { RequestHandler } from './handlers/RequestHandler'
import { Methods } from '../Constants/API-mehods'
import { RequestOptions } from './handlers/RequestOptions'

export class TodoApi {
  private static todoApiInstance: TodoApi | null = null

  private constructor() {}

  private mapDynamicTodosToTodosModel(unTypedTodos: { [key: string]: any }[]): Todo[] {
    return unTypedTodos.map((todo) => new Todo(todo.userId, todo.id, todo.title, todo.completed))
  }

  private mapUntypedTodoToModel(unTypedTodo: { [key: string]: any }) {
    return new Todo(unTypedTodo.userId, unTypedTodo.id, unTypedTodo.title, unTypedTodo.completed)
  }

  public async getAllTodos(): Promise<[Todo[] | null, Error]> {
    let mappedTodos: Todo[] | null = null
    const requestHandler = new RequestHandler()
    const [data, error] = await requestHandler.sendRequest(
      endPointUrl + endPoints.AllTodos,
      new RequestOptions(Methods.Get)
    )

    if (data) mappedTodos = this.mapDynamicTodosToTodosModel(data)

    return [mappedTodos, error]
  }

  public async getTodo(todoId: number): Promise<[Todo | null, Error]> {
    let mappedTodo: Todo | null = null

    const requestHandler = new RequestHandler()

    const [data, error] = await requestHandler.sendRequest(
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
