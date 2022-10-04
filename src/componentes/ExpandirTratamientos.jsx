

function ExpandirTratamientos({ datos }) {
      console.log("expandir trat")
      function expandirRecetas(recetas){
            console.table(recetas);
      }

      let expansible = () => {
            for (let i = 0; i < datos.length; i++) {
                  <div>
                        <p>
                              Descripción: {datos[i].Descripcion} <br />
                              Médico: {datos[i].Medico} <br />
                              Fecha de inicio: {datos[i].FechaComienzo} <br />
                              Fecha de fin: {datos[i].FechaFin} <br />
                              <button onclick={expandirRecetas(datos[i].Recetas)}>Ver recetas</button>
                        </p>
                  </div>
            }

      }
      return expansible;
}

export default ExpandirTratamientos;