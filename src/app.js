import  express  from "express";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// importamos las rutas para usuarios 
import authRoutes from './routes/auth.routes.js';
// importamos las rutas para productos
import productosRoutes from'./routes/productos.routes.js';

import ventasRoutes from './routes/ventas.routes.js';

import detalleVentaRoutes from './routes/detalleVenta.routes.js';

const app = express();

app.use(cors({
    origin: 
    ['http://localhost:5173',
             'http://localhost:5000',
            process.env.BASE_URL,
            process.env.BASE_URL_FRONTEND

    ], 
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/img/', express.static(path.join(__dirname, '/public/img')))



// indicamos que el servidor utilice el objeto authRoutes
app.use('/api', authRoutes);
app.use('/api', productosRoutes);
app.use('/api', ventasRoutes);
app.use('/api', detalleVentaRoutes);
app.get('/', (req, res)=>{
    res.json({
        mensaje: "bienvenidos al API RET de PUNTO DE VENTA",
        version: "1.0.0",
        rutasDisponibles:[
            {endpoint: "/api/register", metodo: "POST", descripcion: "Crea un nuevo usuario"},
            {endpoint: "/api/login", metodo: "POST", descripcion: "Para iniciar sesion "},

        ]
    })

})
export default app;