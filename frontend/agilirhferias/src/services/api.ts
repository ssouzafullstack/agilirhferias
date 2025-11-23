import axios from 'axios'
import { rootStore } from '../stores/RootStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(async (config) => {
  const token = rootStore.authStore.accessToken || localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let refreshQueue: ((token: string | null) => void)[] = []

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(api(originalRequest))
            } else {
              resolve(Promise.reject(error))
            }
          })
        })
      }

      isRefreshing = true
      try {
        const newToken = await rootStore.authStore.refresh()
        refreshQueue.forEach((cb) => cb(newToken))
        refreshQueue = []
        isRefreshing = false

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (err) {
        isRefreshing = false
        refreshQueue.forEach((cb) => cb(null))
        refreshQueue = []
        rootStore.authStore.logout()
      }
    }

    return Promise.reject(error)
  }
)

export default api
