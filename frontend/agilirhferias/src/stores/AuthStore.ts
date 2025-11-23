import { makeAutoObservable } from 'mobx'
import type { RootStore } from './RootStore'
import { createBaseState } from './createBaseState'
import api from '../services/api'

export class AuthStore {
  root?: RootStore
  base = createBaseState()
  user: any = null
  accessToken: string | null = null
  refreshToken: string | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async login(username: string, password: string) {
    await this.base.execute(async () => {
      const { data } = await api.post('/authentication/login', { username, password })
      this.user = data.user
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    })
  }

  async refresh() {
    const accessToken = this.accessToken || localStorage.getItem('accessToken')
    const refreshToken = this.refreshToken || localStorage.getItem('refreshToken')
    if (!accessToken) return null
    if (!refreshToken) return null
    try {
      const { data } = await api.post('/token/refresh', {accessToken, refreshToken })
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      return data.accessToken
    } catch {
      this.logout()
      return null
    }
  }

  logout() {
    this.user = null
    this.accessToken = null
    this.refreshToken = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}
