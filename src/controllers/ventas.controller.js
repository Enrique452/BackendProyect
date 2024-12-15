import Ventas from '../models/ventas.models.js'

export const createVenta = async (req, res) => {
    try {
        const { fechaVenta, productosVendidos } = req.body;

     
        const totalVenta = productosVendidos.reduce((total, producto) => {
            return total + (producto.precio * producto.cantidad);
        }, 0);

        
        const nuevaVenta = new Ventas({
            fechaVenta,
            user: req.user.id,
            totalVenta
        });

       
        await nuevaVenta.save();

        res.json({ message: 'Venta creada exitosamente', venta: nuevaVenta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la venta' });
    }
};

export const getVentas = async (req, res) => {
    try {
        const ventas = await Ventas.find();
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ventas' });
    }
};

export const getVenta = async (req, res) => {
    try {
        const venta = await Ventas.findById(req.params.id);
        if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
        
        res.json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la venta' });
    }
};


 
 //funcion para editar un producto 
 /*export const editProducto = async (req, res)=>{
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

