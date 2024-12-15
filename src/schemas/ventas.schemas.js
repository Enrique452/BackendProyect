import {z} from 'zod';


export const ventasSchema= z.object({
    fechaVenta: z.string({
        required_error: 'No se insertó la Fecha'
    }),

    productosVendidos: z.array(
        z.object({
            idProducto: z.string({
                required_error: 'El ID del producto es obligatorio'
            }),
            precio: z.number({
                required_error: 'El precio  es obligatorio'
            }),
            cantidad: z.number({
                required_error: 'La cantidad es obligatoria'
            })
        })
    ),
    

});