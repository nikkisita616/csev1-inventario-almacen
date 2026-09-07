import {useEffect, useState} from 'react'
import {Formulario} from './components/formulario.jsx'
import {InfoTabla} from './components/infoTabla.jsx'
import {ResumenInventario} from './components/resumen.jsx'
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from './firebase/inventarioService.js'

export const InventarioApp = () => {
    const [data, setData] = useState([])
    
    const [criterioOrden, setCriterioOrden] = useState({ campo: null, ascendente: true })

    useEffect(() => {
        const unsubscribe = obtenerProductos((productos) => {
            setData(productos)
        })
        return () => unsubscribe()
    }, [])

    const valoresIniciales = {
        codigo: "",
        nombreProducto: "",
        marca: "",
        cantidad: "",
        precio: ""
    }

    const [formData, setFormData] = useState(valoresIniciales)
    const [productoEditando, setProductoEditando] = useState(null)

    const agregarData = async (valores) => {
        if (productoEditando) {
            await actualizarProducto(productoEditando.id, valores)
            setProductoEditando(null)
            setFormData(valoresIniciales)
        } else {
            await crearProducto(valores)
            setFormData(valoresIniciales)
        }
    }

    const eliminarData = async (id) => {
        await eliminarProducto(id)
    }

    const editarData = (producto) => {
        setFormData({
            codigo: producto.codigo,
            nombreProducto: producto.nombreProducto,
            marca: producto.marca,
            cantidad: producto.cantidad,
            precio: producto.precio,
        })
        setProductoEditando(producto)
    }

    const manejarOrden = (campo) => {
        if (criterioOrden.campo === campo) {
            setCriterioOrden({ campo, ascendente: !criterioOrden.ascendente })
        } else {
            setCriterioOrden({ campo, ascendente: true })
        }
    }

    const datosOrdenados = [...data].sort((a, b) => {
        if (!criterioOrden.campo) return 0

        let valorA = a[criterioOrden.campo]
        let valorB = b[criterioOrden.campo]

        if (criterioOrden.campo === 'cantidad' || criterioOrden.campo === 'precio') {
            valorA = Number(valorA)
            valorB = Number(valorB)
            return criterioOrden.ascendente ? valorA - valorB : valorB - valorA
        }

        if (typeof valorA === 'string' && typeof valorB === 'string') {
            const resultado = valorA.localeCompare(valorB, 'es', { sensitivity: 'base' })
            return criterioOrden.ascendente ? resultado : -resultado
        }

        return 0
    })

    return(
        <div className="app-container">
            <header>
                <h1>Sistema de Almacén</h1>
            </header>

            <ResumenInventario data={data} />

            <div className="grid-layout">
                <section>
                    <Formulario 
                        key={productoEditando ? productoEditando.id : "nuevo"} 
                        valoresIniciales={formData} 
                        agregarData={agregarData} 
                        esEditando={Boolean(productoEditando)}
                        data={data}
                    />
                </section>

                <section>
                    <InfoTabla 
                        data={datosOrdenados} 
                        eliminarData={eliminarData} 
                        editarData={editarData}
                        manejarOrden={manejarOrden}
                    />
                </section>
            </div>
        </div>
    )
}