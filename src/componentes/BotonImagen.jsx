function BotonImagen(props){
      return (
            <div>
            <button className={props.clase} id={props.id} onclick={props.onclick}>
                  <img src={props.src} alt={props.alt}/>
            </button>
            <span>{props.textoPie}</span>
            </div>
      );
}
export default BotonImagen;