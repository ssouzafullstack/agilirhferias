import { makeAutoObservable, runInAction } from 'mobx'

export function createBaseState() {
  return makeAutoObservable({
    loading: false,
    error: null as string | null,

    setLoading(value: boolean) {
      this.loading = value
    },

    setError(message: string | null) {
      this.error = message
    },

    async execute<T>(fn: () => Promise<T>): Promise<T | undefined> {
      this.setLoading(true)
      this.setError(null)
      try {
        const result = await fn()
        return result
      } catch (err: any) {
        runInAction(() => {
          this.error = err?.message ?? 'Erro inesperado'
        })
      } finally {
        runInAction(() => {
          this.loading = false
        })
      }
    },
  }, {}, { autoBind: true })
}
