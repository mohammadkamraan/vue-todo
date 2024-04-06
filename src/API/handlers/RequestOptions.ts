import type { Methods } from '@/Constants/API-mehods'

export class RequestOptions {
  public method: Methods
  public body?: string
  public signal?: AbortSignal

  constructor(method: Methods, body?: any) {
    this.method = method
    if (body) this.body = JSON.stringify(body)
  }
}
