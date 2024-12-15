import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getDetalleVentas,
    createDetalleVenta,
  


} from '../controllers/detalleVenta.controller.js'

import { validateSchema } from "../middlewares/validator.middleware.js";
import { productosSchema } from "../schemas/productos.schemas.js";
const router = Router();


router.get('/detalleVenta/:id', authRequired, getDetalleVentas);

//Agregar un producto 
router.post('/detalleVenta', authRequired, createDetalleVenta);

//Obtener un producto por id 
// router.get('/detalleVenta/:id', authRequired ,getDetalleVenta);

//router.delete('/detalleVenta/:id', authRequired ,deleteDetalleVenta);

// router.put('/productos/:id', authRequired ,editProducto);



export default router;
