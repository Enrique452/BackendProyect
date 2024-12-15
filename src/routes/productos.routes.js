import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getProductos,
    createProducto,
    getProducto,
    deleteProducto,
    editProducto,
    updateProductNoUpdateImage
} from '../controllers/productos.controllers.js'

import { uploadImage } from "../middlewares/uploadImage.middleware.js";


import { validateSchema } from "../middlewares/validator.middleware.js";
import { productosSchema } from "../schemas/productos.schemas.js";
const router = Router();


router.get('/productos', authRequired, getProductos);

//Agregar un producto 
router.post('/productos', authRequired, uploadImage,  validateSchema(productosSchema), createProducto);

//Obtener un producto por id 
router.get('/productos/:id', authRequired ,getProducto);

router.delete('/productos/:id', authRequired ,deleteProducto);

router.put('/productos/:id', authRequired ,editProducto);

// ruta par acrulizar un producto y sin cambiar la IMAGEN
router.put('/productosupdatenoimage/:id', authRequired, validateSchema(productosSchema), updateProductNoUpdateImage);



export default router;
