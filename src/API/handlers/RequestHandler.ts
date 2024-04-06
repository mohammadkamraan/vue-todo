import type { RequestOptions } from './RequestOptions'

export class RequestHandler {
  private timeoutId: number | null = null

  private setTimeoutForRequest(options: RequestOptions, timeout: number) {
    const abortController: AbortController = new AbortController()
    options.signal = abortController.signal
    const timeInMillisecond = timeout * 1000
    this.timeoutId = setTimeout(() => {
      abortController.abort
    }, timeInMillisecond)
  }

  private clearRequestTimeout() {
    clearTimeout(this.timeoutId as number)
    this.timeoutId = null
  }

  public async sendRequest(url: string, options: RequestOptions, timeout?: number): Promise<any[]> {
    let data: null | any = null
    let error: Error | null = null

    const hasTimeout = timeout !== undefined
    if (hasTimeout) {
      this.setTimeoutForRequest(options, timeout)
    }

    try {
      const response = await fetch(url, options)
      this.clearRequestTimeout()
      data = await response.json()
    } catch (err: unknown) {
      error = err as Error
    }
    return [data, error]
  }
}
