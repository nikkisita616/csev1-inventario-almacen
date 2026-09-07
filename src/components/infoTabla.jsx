import Swal from "sweetalert2";

export const InfoTabla = ({ data, eliminarData, editarData, manejarOrden }) => {
    
    const eliminar = (id) => {
        Swal.fire({
            title: "¿Desea eliminar este producto del inventario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarData(id);
                Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
            }
        });
    }

    const editar = (producto) => {
        Swal.fire({
            title: "¿Desea editar este producto?",
            text: `Se cargarán los datos de: ${producto.nombreProducto}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, editar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                editarData(producto);
            }
        });
    }

    return (
        <table className="cyber-table">
            <thead>
                <tr>
                    <th onClick={() => manejarOrden('codigo')} style={{ cursor: 'pointer' }}>Código ↕</th>
                    <th onClick={() => manejarOrden('nombreProducto')} style={{ cursor: 'pointer' }}>Producto ↕</th>
                    <th onClick={() => manejarOrden('marca')} style={{ cursor: 'pointer' }}>Marca ↕</th>
                    <th onClick={() => manejarOrden('cantidad')} style={{ cursor: 'pointer' }}>Cantidad ↕</th>
                    <th onClick={() => manejarOrden('precio')} style={{ cursor: 'pointer' }}>Precio ↕</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.codigo}</td>
                        <td>{item.nombreProducto}</td>
                        <td>{item.marca}</td>
                        <td>{item.cantidad}</td>
                        <td>${item.precio}</td>
                        <td>
                            <div className="actions">
                                <button className="ghost-btn" onClick={()=>editar(item)}>Editar</button>
                                <button className="ghost-btn danger" onClick={()=>eliminar(item.id)}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}