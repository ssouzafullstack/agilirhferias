import { makeAutoObservable, runInAction } from 'mobx'
import type { RootStore } from './RootStore'
import { createBaseState } from './createBaseState'
import api from '../services/api'

export class CompanyStore {
  root?: RootStore
  base = createBaseState()
  companies: any[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async fetchCompanies() {
    await this.base.execute(async () => {
      const { data } = await api.get('/companies')
      runInAction(() => {
        this.companies = data
      })
    })
  }
}
