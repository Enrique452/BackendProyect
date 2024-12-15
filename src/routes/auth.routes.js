import {Router} from 'express';
import { login, register, logout, profile, verifyToken} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
const router =Router();

// importamos el validateSchema
import { validateSchema } from '../middlewares/validator.middleware.js';
//Impor{tammo los esquemaos de validacion
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';

router.get('/verify', verifyToken);

router.post('/register',validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema),login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);



export default router;

