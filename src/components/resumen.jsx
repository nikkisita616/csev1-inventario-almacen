export const ResumenInventario = ({ data }) => {
    const totalProductos = data.length;

    const productosBajoStock = data.filter(producto => Number(producto.cantidad) <= 5).length;

    const valorTotal = data.reduce((total, producto) => {
        return total + (Number(producto.precio) * Number(producto.cantidad));
    }, 0);

    return (
        <section className="panel resumen-panel">
            <h2>Resumen del Inventario</h2>
            <div className="resumen-grid">
                <div className="resumen-item">
                    <h3>Total Artículos</h3>
                    <p className="resumen-valor">{totalProductos}</p>
                </div>
                <div className="resumen-item">
                    <h3>Artículos con Stock Bajo</h3>
                    <p className="resumen-valor alerta-stock">{productosBajoStock}</p>
                </div>
                <div className="resumen-item">
                    <h3>Capital en Mercadería</h3>
                    <p className="resumen-valor capital-total">${valorTotal}</p>
                </div>
            </div>
        </section>
    )
}