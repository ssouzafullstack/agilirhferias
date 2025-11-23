import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./routes/Home";
import About from "./routes/About";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Parameters from "./routes/Parameters";
import Empresa from "./routes/Empresa";
import Cargo from "./routes/Cargo";
import TurnoTrabalho from "./routes/TurnoTrabalho";
import Colaborador from "./routes/Colaborador";
import EscalaFerias from "./routes/EscalaFerias";
import AvisoFerias from "./routes/AvisoFerias";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="parameters" element={<Parameters />} />
        <Route path="empresas" element={<Empresa />} />
        <Route path="cargos" element={<Cargo />} />
        <Route path="turnos" element={<TurnoTrabalho />} />
        <Route path="colaboradores" element={<Colaborador />} />
        <Route path="escalas-ferias" element={<EscalaFerias />} />
        <Route path="avisos-ferias" element={<AvisoFerias />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
