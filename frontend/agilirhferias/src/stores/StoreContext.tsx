import { createContext, useContext } from 'react'
import { RootStore, rootStore } from './RootStore'

const StoreContext = createContext<RootStore>(rootStore)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
