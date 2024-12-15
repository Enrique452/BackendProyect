import Productos from '../models/productos.models.js';
import {unlink} from 'fs';
import path from 'path';

//funcion para obtener todos los productos 
 export const getProductos = async (req, res)=>{
    try {
        const productos = await Productos.find({user: req.user.id})
                                
        res.json(productos);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: ['Error al obtner los productos'] });   
    }
 };

 // funcion para crear un producto
 export const createProducto = async (req, res)=>{
    try {
        const {nombre, precio, stock, talla , marca} = req.body;
        const newProducto = new Productos({
            nombre,
            precio,
            stock,
            talla,
            marca,
            image: req.file.filename,
            user: req.user.id
        });
        const savedProducto = await newProducto.save();
        res.json(savedProducto);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al crear un producto']});   
}
 };

 //funcion para obtener un producto 
 export const getProducto = async (req, res)=>{
    try {
        const producto = await Productos.findById(req.params.id);
        if(!producto)
            return res.status(404).json({message: ['Producto no encontrado']});
            res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al obtener un producto']});   
}
 };

 //funcion para elimonar un producto 
 export const deleteProducto = async (req, res)=>{
    try {
        const producto = await Productos.findByIdAndDelete(req.params.id);
        if(!producto)
            return res.status(404).json({message: ['Producto no encontrado']});
        const image = producto.image;
        const ruta = path.resolve('./src/public/img')+"/"+image;
        unlink(ruta, (err)=>{
            if(err)
                return res.status(404)
            .json({message: ['Error al eliminar la imgaen ']})
        })
            res.json(producto);
    }catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al eliminar un producto']});   
}
 };
 //funcion para editar un producto 
 export const editProducto = async (req, res)=>{
        try {
            // obtenemos la imagen actualizada dle producto 
            if(!req.file.filename){
                console.log("No se econtro la imagen ");
                return res.status(500)
                    .json({message: ['Error al actulizar un producto, no se encontro la imagen']})
            }
            const data =({
                   nombre:req.body.nombre,
                   precio: req.body.precio,
                   stock: req.body.stock,
                   talla: req.body.talla,
                   marca: req.body.marca,
                   image: req.file.filename,
                   user: req.user.id
            });
        const producto = await Productos.findByIdAndUpdate(req.params.id, req.body);
        if(!producto)
            return res.status(404).json({message: ['Producto no encontrado']});

        const image = productos.image;

        const ruta = path.resolve('./src/public/img')+"/"+image;
                unlink(ruta, (err)=>{
            if(err)
                return res.status(404)
            .json({message: ['Error al eliminar la imagen del producto actualizado ']})
        })


            res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al editar un producto']});   
}
 };

 export const updateProductNoUpdateImage = async (req, res)=>{
    try {
        const data =({
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock,
            talla: req.body.talla,
            marca: req.body.marca,
            image: req.body.image,
            user: req.user.id
     });
     const producto = await Productos.findByIdAndUpdate(req.params.id, data);
     if(!producto)
        return res.status(404)
            .json({message: ['Producto no encotrado']});
    return res.json(producto);
    } catch (error) {
        console.log(error);
            return res.status(500)
            .json({message: ['Error al actualizar un proucto ']})
        
    }
 }


