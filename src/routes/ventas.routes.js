import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getVenta,
    createVenta,
    getVentas,
 
} from '../controllers/ventas.controller.js'

import { validateSchema } from "../middlewares/validator.middleware.js";
import { ventasSchema } from "../schemas/ventas.schemas.js";
const router = Router();


router.get('/ventas', authRequired, getVentas);


//Agregar una venta
router.post('/ventas', authRequired, validateSchema(ventasSchema), createVenta);

//Obtener una venta por id 
router.get('/ventas/:id', authRequired ,getVenta);

//router.delete('/ventas/:id', authRequired ,deleteVenta);

//router.put('/productos/:id', authRequired ,editProducto);



export default router;
