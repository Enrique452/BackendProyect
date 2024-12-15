import mongoose from "mongoose";

const ventasSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        fechaVenta: {
            type: Date,
            required: true,
            default: Date.now
        },
        totalVenta: {
            type: Number,
            default: 0

        },
        detallesVenta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DetalleVenta' }]


    });
export default mongoose.model('Ventas', ventasSchema);