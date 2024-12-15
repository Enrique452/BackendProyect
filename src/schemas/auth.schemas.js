import {z} from 'zod';

export const registerSchema =z.object({
    username: z.string({
        required_error:"Nombre de usuario requerido"

    }),
    userrol: z.string({
        required_error: 'Rol de usuario requerido'

    }),
    email: z.string({
        required_error: 'Email es requerido'
    })
        .email({
            required_error: 'Email invalido'
        }),
        password: z.string({
            required_error: 'Contrasena requerida'
        })
        .min(6, {
            message: 'El password debe tener al meos 6 caracteres'
        }),
}); //fin 

export const loginSchema =z.object({
    email: z.string({
        required_error: 'Email es requerido'
    })
        .email({
            required_error: 'Email invalido'
        }),
        password: z.string({
            required_error: 'Contrasena requerida'
        })
        .min(6,{
            message: "El password debe tener al menos 6 caracteres"
        }),
});