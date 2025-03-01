import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import RecoverPassword from "../pages/RecuperarSenha";
import Plantao from "../pages/Plantao";
import Ts from "../pages/Plantao/T's";
import Membros from "../pages/Membros";
import RegistrarMembro from "../pages/Membros/Registrar";
import VerMaisMembro from "../pages/Membros/VerMais";
import EditarMembro from "../pages/Membros/Editar";
import Comissao from "../pages/Comissao";
import NAJUP from "../pages/NAJUP";
import Triunvirato from "../pages/Triunvirato";
import Assistidos from "../pages/Assistidos";
import Relatorios from "../pages/Relatorios";
import FichaPresenca from "../pages/FichaPresenca";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>        
            <Route path="/recuperar-senha" element={<RecoverPassword/>}/>
            <Route path="/plantao" element={<Plantao/>}/>
            <Route path="/comissao" element={<Comissao/>}/>
                <Route path="/plantao/:params" element={<Ts/>}/>
            <Route path="/membros" element={<Membros/>}/>
                <Route path="/membros/novo" element={<RegistrarMembro/>}/>
                <Route path="/membros/ver-mais" element={<VerMaisMembro/>}/>
                <Route path="/membros/editar" element={<EditarMembro/>}/>
                
           
            <Route path="/najup" element={<NAJUP/>}/>
            <Route path="/triunvirato" element={<Triunvirato/>}/>
            <Route path="/assistidos" element={<Assistidos/>}/>
            <Route path="/relatorios" element={<Relatorios/>}/>
            <Route path="/ficha-presenca" element={<FichaPresenca/>}/>
        </Routes>
    )
}
export default RoutesApp;
