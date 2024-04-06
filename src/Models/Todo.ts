export class Todo {
  private _userId: number
  private _id: number
  private _title: string
  private _completed: boolean

  constructor(userId: number, id: number, title: string, completed: boolean) {
    this._userId = userId
    this._id = id
    this._title = title
    this._completed = completed
  }

  public get userId(): number {
    return this._userId
  }

  public get id(): number {
    return this._id
  }

  public get title(): string {
    return this._title
  }

  public get completed(): boolean {
    return this._completed
  }
}

export class ToPostTodo {
  private _userId: number
  private _title: string
  private _completed: boolean

  constructor(userId: number, id: number, title: string, completed: boolean) {
    this._userId = userId
    this._title = title
    this._completed = completed
  }

  public get userId(): number {
    return this._userId
  }

  public get title(): string {
    return this._title
  }

  public get completed(): boolean {
    return this._completed
  }
}
