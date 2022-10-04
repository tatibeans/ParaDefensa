function Input(props){
      return (
            <div>
                  {agregarLabel(props)}
                  <input type={props.type} id={props.id} value={props.value} placeholder={props.placeholder} onChange={props.onchange}/>
            </div>
      );
}

function agregarLabel(props){
      if (props.label != null && props.label != ""){
            <label htmlFor={props.id}>{props.label}</label>
      }
}

export default Input;