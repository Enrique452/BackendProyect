import DetalleVenta from '../models/detalleVenta.models.js';
import Ventas from '../models/ventas.models.js';


export const createDetalleVenta = async (req, res) => {
    try {
        const { idventas, productosVendidos } = req.body;

        // Validación de productosVendidos
        if (!Array.isArray(productosVendidos) || productosVendidos.length === 0) {
            return res.status(400).json({ message: 'Productos vendidos no proporcionados correctamente' });
        }

        const ventas = await Ventas.findById(idventas);
        if (!ventas) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        const detalles = productosVendidos.map(producto => ({
            idventas,
            idproducto: producto.idProducto,
            cantidad: producto.cantidad,
            precio: producto.precio
        }));

        const result = await DetalleVenta.insertMany(detalles);

        // Vincula los detalles creados a la venta
        ventas.detallesVenta.push(...result.map(detalle => detalle._id));
        await ventas.save();

        res.json({ message: 'Detalles de venta creados exitosamente', detalles: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear los detalles de venta' });
    }
};

export const getDetalleVentas = async (req, res) => {
    try {
        const venta = await Ventas.findById(req.params.id).populate({
            path: 'detallesVenta',
            populate: { 
                path: 'idproducto', // Asegúrate de que idproducto es el campo en detalleVenta que referencia a Productos
                select: 'nombre' // Selecciona sólo los campos necesarios de Productos
            }
        });

        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la venta con detalles' });
    }
};



 /*
 //funcion para editar un producto 
 export const editProducto = async (req, res)=>{
    try {
        const producto = await Productos.findByIdAndUpdate(req.params.id, req.body);
        if(!producto)
            return res.status(404).json({message: ['Producto no encontrado']});
            res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al editar un producto']});   
}
 };
*/