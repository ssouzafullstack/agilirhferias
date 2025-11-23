import { makeObservable, observable, action, runInAction } from 'mobx'

export class BaseStore {
  loading = false
  error: string | null = null

  constructor() {
    makeObservable(this, {
      loading: observable,
      error: observable,
      setLoading: action.bound,
      setError: action.bound
    })
  }

  setLoading(value: boolean) {
    this.loading = value
  }

  setError(message: string | null) {
    this.error = message
  }

  protected async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.setLoading(true)
    this.setError(null)
    try {
      const result = await fn()
      return result
    } catch (err: any) {
      runInAction(() => {
        this.error = err?.message ?? 'Erro inesperado'
      })
      throw err
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
