import { useState } from "react"
import Swal from "sweetalert2"

export const Formulario = ({ valoresIniciales, agregarData, esEditando, data }) => {
    const [valores, setValores] = useState(valoresIniciales)
    const { codigo, nombreProducto, marca, cantidad, precio } = valores

    const inputChange = ({ target }) => {
        setValores({
            ...valores,
            [target.name]: target.value,
        })
    }

    const guardar = (e) => {
        e.preventDefault()
        
        if (codigo.trim() === '' || nombreProducto.trim() === '' || marca.trim() === '' || cantidad.toString().trim() === '' || precio.toString().trim() === '') {
            Swal.fire("Error", "Complete todos los campos del producto para continuar.", "error");
            return
        }

        if (!esEditando) {
            const codigoExiste = data.some(
                (item) => item.codigo.trim().toLowerCase() === codigo.trim().toLowerCase()
            )
            if (codigoExiste) {
                Swal.fire("Error", "Ya existe un producto registrado con este código.", "error");
                return
            }
        }

        agregarData(valores)
        setValores(valoresIniciales)
    }

    return (
        <form className="cyber-form" onSubmit={guardar}>
            <div>
                <label>Código de Producto</label>
                <input 
                    type="text" 
                    name="codigo" 
                    value={codigo} 
                    onChange={inputChange} 
                    disabled={esEditando} 
                />
            </div>

            <div>
                <label>Nombre del Producto</label>
                <input type="text" name="nombreProducto" value={nombreProducto} onChange={inputChange} />
            </div>

            <div>
                <label>Marca</label>
                <input type="text" name="marca" value={marca} onChange={inputChange} />
            </div>

            <div>
                <label>Cantidad</label>
                <input type="number" name="cantidad" value={cantidad} onChange={inputChange} />
            </div>

            <div>
                <label>Precio Unitario</label>
                <input type="number" name="precio" value={precio} onChange={inputChange} />
            </div>

            <button type="submit" className="primary-btn">
                {esEditando ? "Actualizar Producto" : "Guardar Producto"}
            </button>
        </form>
    )
}