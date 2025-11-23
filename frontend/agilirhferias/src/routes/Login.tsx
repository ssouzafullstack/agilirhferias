import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/StoreContext'
import { useState } from 'react'
import { Button, Input, Text } from '@fluentui/react-components'

const Login = observer(() => {
  const { authStore } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    authStore.login(username, password)
  }

  if (authStore.user) {
    return <Text>Bem-vindo, {authStore.user.userName}</Text>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
      <Input placeholder="User" value={username} onChange={(_, d) => setUsername(d.value)} />
      <Input placeholder="Senha" type="password" value={password} onChange={(_, d) => setPassword(d.value)} />
      <Button appearance="primary" onClick={handleLogin} disabled={authStore.base.loading}>
        Entrar
      </Button>
      {authStore.base.error && <Text>{authStore.base.error}</Text>}
    </div>
  )
})

export default Login
