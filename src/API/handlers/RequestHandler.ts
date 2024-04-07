import type { RequestOptions } from './RequestOptions'

export class RequestHandler {
  private timeoutId: number | null = null

  private setTimeoutForRequest(options: RequestOptions, timeout: number) {
    const abortController: AbortController = new AbortController()
    options.signal = abortController.signal
    const timeInMillisecond = timeout * 1000
    this.timeoutId = setTimeout(() => {
      abortController.abort()
    }, timeInMillisecond)
  }

  private clearRequestTimeout() {
    clearTimeout(this.timeoutId as number)
    this.timeoutId = null
  }

  public async sendRequest<T>(
    url: string,
    options: RequestOptions,
    filters?: { [key: string]: unknown },
    timeout?: number
  ): Promise<[T | null, Error | null]> {
    let data: null | T = null
    let error: Error | null = null

    for (const filter in filters) {
      if (filters[filter] !== null) url += `?${filter}=${filters[filter]}`
    }

    if (timeout !== undefined) {
      this.setTimeoutForRequest(options, timeout)
    }

    try {
      const response = await fetch(url, options)
      data = await response.json()
    } catch (err: unknown) {
      error = err as Error
    } finally {
      this.clearRequestTimeout()
    }

    return [data, error]
  }
}
