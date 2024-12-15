import mongoose from "mongoose";

const detalleVentaSchema = new mongoose.Schema(
    {
        idventas: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ventas',
            required: true
        },
        idproducto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Productos',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
            required: true
        }
    }
);

export default mongoose.model('DetalleVenta', detalleVentaSchema);
