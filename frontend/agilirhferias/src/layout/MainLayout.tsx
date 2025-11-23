import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
  Text,
  Tooltip,
} from "@fluentui/react-components";
import { Navigation20Filled, Dismiss20Regular } from "@fluentui/react-icons";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 16,
          left: open ? 280 : 30,
          zIndex: 100,
        }}
      >
        <Tooltip
          content={open ? "Fechar menu" : "Abrir menu"}
          relationship={"label"}
        >
          <Button
            appearance="subtle"
            icon={open ? <Dismiss20Regular /> : <Navigation20Filled />}
            onClick={() => setOpen((p) => !p)}
          />
        </Tooltip>
      </div>

      <Drawer
        type="inline"
        open={open}
        position="start"
        separator
        style={{ background: "#f3f2f1" }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle>
            <Text size={500} weight="semibold">
              📘 AgiliRH Férias
            </Text>
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: 16,
          }}
        >
          <Button
            appearance={location.pathname === "/login" ? "primary" : "subtle"}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            appearance={location.pathname === "/" ? "primary" : "subtle"}
            onClick={() => navigate("/")}
          >
            Início
          </Button>
          <Button
            appearance={location.pathname === "/about" ? "primary" : "subtle"}
            onClick={() => navigate("/about")}
          >
            Sobre
          </Button>
          <Button
            appearance={
              location.pathname === "/parameters" ? "primary" : "subtle"
            }
            onClick={() => navigate("/parameters")}
          >
            Parametrização
          </Button>
          <Button
            appearance={
              location.pathname === "/empresas" ? "primary" : "subtle"
            }
            onClick={() => navigate("/empresas")}
          >
            Empresas
          </Button>
          <Button
            appearance={location.pathname === "/cargos" ? "primary" : "subtle"}
            onClick={() => navigate("/cargos")}
          >
            Cargos
          </Button>
          <Button
            appearance={location.pathname === "/turnos" ? "primary" : "subtle"}
            onClick={() => navigate("/turnos")}
          >
            Turnos
          </Button>
          <Button
            appearance={
              location.pathname === "/colaboradores" ? "primary" : "subtle"
            }
            onClick={() => navigate("/colaboradores")}
          >
            Colaboradores
          </Button>
          <Button
            appearance={
              location.pathname === "/escalas-ferias" ? "primary" : "subtle"
            }
            onClick={() => navigate("/escalas-ferias")}
          >
            Escala Férias
          </Button>
          <Button
            appearance={
              location.pathname === "/avisos-ferias" ? "primary" : "subtle"
            }
            onClick={() => navigate("/avisos-ferias")}
          >
            Avisos Férias
          </Button>
        </DrawerBody>
      </Drawer>
      <main
        style={{
          flex: 1,
          padding: 54,
          transition: "margin-left 0.6s ease",
          marginLeft: 20,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
