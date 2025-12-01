import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";
import { useState } from "react";
import {
  Button,
  Input,
  Text,
  Card,
  makeStyles,
  Title3,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #f5f5f5 0%, #e9e9e9 50%, #dcdcdc 100%)",
  },

  card: {
    width: "360px",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.06)",
    borderRadius: "12px",
    background: "#ffffff",
  },

  title: {
    textAlign: "center",
    marginBottom: "8px",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginTop: "8px",
    fontSize: "14px",
  },
});

const Login = observer(() => {
  const styles = useStyles();
  const { authStore } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    authStore.login(username, password);
  };

  if (authStore.user) {
    return <Text>Bem-vindo, {authStore.user.userName}</Text>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title3 className={styles.title}>AgiliRH – Login</Title3>

        <Input
          placeholder="Usuário"
          value={username}
          onChange={(_, d) => setUsername(d.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(_, d) => setPassword(d.value)}
        />

        <Button
          appearance="primary"
          onClick={handleLogin}
          disabled={authStore.base.loading}
        >
          Entrar
        </Button>

        {authStore.base.error && (
          <Text className={styles.error}>{authStore.base.error}</Text>
        )}
      </Card>
    </div>
  );
});

export default Login;
