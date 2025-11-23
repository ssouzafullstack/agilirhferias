import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Spinner, Card, Text } from '@fluentui/react-components'
import { useStore } from '../stores/StoreContext'

const Home = observer(() => {
  const { companyStore } = useStore()

  useEffect(() => {
    companyStore.fetchCompanies()
  }, [])

  if (companyStore.base.loading) return <Spinner label="Carregando empresas..." />
  if (companyStore.base.error) return <Text>{companyStore.base.error}</Text>

  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">Lista de Empresas</Text>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        {companyStore.companies.map((c) => (
          <Card key={c.id} style={{ padding: 16, width: 240 }}>
            <Text>{c.name}</Text>
            <Text size={200}>{c.cnpj}</Text>
          </Card>
        ))}
      </div>
    </div>
  )
})

export default Home
