function Mensaje(props){
      return (
            <div>
                  <p className={props.tipo}>{props.tipo == 'msjError' ? "Ha habido un error." : "¡Éxito!"}</p>
                  <p>{props.mensaje}</p>
            </div>
      );
}
export default Mensaje;