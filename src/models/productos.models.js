import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true
        },
        precio:{
            type: Number,
            default: 0.0,
            required: true
        },
        stock: {
            type: Number,
            required:true
        },
        talla:{
            type: Number,
            default: 0.0,
            required: true
        },
        marca:{
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);

export default mongoose.model('Productos',productosSchema);