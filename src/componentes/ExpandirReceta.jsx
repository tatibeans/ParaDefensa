import DataTable from 'react-data-table-component';

function ExpandirReceta({ datos }) {
      let expansible = ({datos}) => {
            <div>
                  <p>
                        Descripción: {datos.Descripcion} <br/>
                        Médico: {datos.Descripcion} <br/>
                        Fecha de inicio: {datos.Descripcion} <br/>
                        Fecha de fin: {datos.Descripcion} <br/>
                        <button>Ver medicamentos</button>
                  </p>
            </div>
      }

}

export default ExpandirReceta;