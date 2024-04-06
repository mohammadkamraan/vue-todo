import { endPoints, endPointUrl } from '@/Constants/EndPoint'
import { Todo } from '@/Models/Todo'

export class TodoApi {
  private static todoApiInstance: TodoApi | null = null

  private constructor() {}

  protected mapDynamicTodosToTodosModel(unTypedTodos: { [key: string]: any }[]): Todo[] {
    return unTypedTodos.map((todo) => new Todo(todo.userId, todo.id, todo.title, todo.completed))
  }

  public async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(endPointUrl + endPoints.AllTodos)
    const data = await response.json()
    const mapedTodos = this.mapDynamicTodosToTodosModel(data)
    return mapedTodos
  }

  public static GetInstance(): TodoApi {
    const isTodoInstanceEmpty: boolean = TodoApi.todoApiInstance === null
    if (isTodoInstanceEmpty) {
      TodoApi.todoApiInstance = new TodoApi()
    }
    return TodoApi.todoApiInstance as TodoApi
  }
}
