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
            process.env.BASE_URL

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


export default app;