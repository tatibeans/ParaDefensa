import DataTable from 'react-data-table-component';



function tablaExpansible(props){
      console.log("tabla")
     return <DataTable
            title={props.titulo}
            columns={props.columnas}
            data={props.datos}
            expandableRows={true}
            expandOnRowClicked={true}
            expandableRowsComponent={props.datosExpandidos}
            pagination
      />
}
export default tablaExpansible;
