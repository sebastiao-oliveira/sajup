import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import RecoverPassword from "./pages/RecuperarSenha";
import Plantao from "./pages/Plantao";
import Ts from "./pages/Plantao/T's";
import Membros from "./pages/Membros";
import RegisterMember from "./pages/Membros/Registrar";
import SeeMoreMember from "./pages/Membros/VerMais";
import EditMember from "./pages/Membros/Editar";
import Comissao from "./pages/Comissao";
import NAJUP from "./pages/NAJUP";
import Triunvirato from "./pages/Triunvirato";
import Assistidos from "./pages/Assistidos";
import Relatorios from "./pages/Relatorios";
import FichaPresenca from "./pages/FichaPresenca";
import Processos from "./pages/Processos";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/recuperar-senha" element={<RecoverPassword />} />
            <Route path="/plantao" element={<Plantao />} />
            <Route path="/plantao/:params" element={<Ts />} />
            <Route path="/membros" element={<Membros />} />
            <Route path="/membros/novo" element={<RegisterMember />} />
            <Route path="/membros/vermais/:id" element={<SeeMoreMember />} />
            <Route path="/membros/editar/:id" element={<EditMember />} />
            <Route path="/comissao" element={<Comissao />} />
            <Route path="/najup" element={<NAJUP />} />
            <Route path="/triunvirato" element={<Triunvirato />} />
            <Route path="/assistidos" element={<Assistidos />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/ficha-presenca" element={<FichaPresenca />} />
            <Route path="/processos" element={<Processos />} />
        </Routes>
    );
};

export default RoutesApp;
