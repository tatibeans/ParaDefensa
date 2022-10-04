import Titulo from "../componentes/Titulo";
import Input from "../componentes/Input";
import {Outlet} from 'react-router-dom';

function CambiarPass() {
      // supongo que esto va a recibir el useState pero después veo
      return (
            <div className="container">
                  <Titulo texto="Crear una nueva contraseña" />
                  <form className="form">
                        <div className="row">
                              <Input label={"Nueva contraseña:"} id={"txtPass"} type={"password"} className="col-8" />
                        </div>
                        <div className="row">
                              <Input label={"Repita su contraseña:"} id={"confirmaPass"} type={"password"} className="col-8" />
                        </div>
                        <input type="submit" value="Confirmar"/>
                  </form>
                  <Outlet />
            </div>
            
      );
}

export default CambiarPass;