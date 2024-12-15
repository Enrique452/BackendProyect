import {optional, z} from 'zod';


export const productosSchema= z.object({
    nombre: z.string({
        required_error: 'Nombre del producto requerido'
    }),
    precio: z.string({
        required_error: 'Precio debe sser un numero'
    }),
    stock: z.string({
        required_eror: 'EL stock debe ser requerido'
    }),
    talla: z.string({
        required_error: "La talla del prodcuto es requerida"
    }),
    marca: z.string({
        required_error: 'La marca es requerida'
    }).optional()
    
});