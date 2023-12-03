
import { verificaToken } from '../middlewares/verificaToken';
import { Articulo } from '../modelos/articulo.modelo';

import { Usuario } from '../modelos/usuario.modelo';
import Token from '../clases/token';
import { Request, Response, NextFunction } from 'express';



class articuloControlador {
  

    
    async get(req: any, res: Response) {

        Articulo.find({}, (err, articulos) => {
            if (err) {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'Error al obtener los artículos'
                });
            }
    
            return res.status(200).json({
                status: 'Ok',
                message: 'Artículos obtenidos correctamente',
                articulos
            });
        });
    };
  

    // Crear artículos
    post(req: Request, res: Response) {
        const libro = {
        ISBN:req.body.ISBN,
        titulo: req.body.titulo   ,
        precio_compra:  req.body.precio_compra   ,
        precio_venta:  req.body.precio_venta   ,
        categoria:  req.body.categoria   ,
        descripcion: req.body.descripcion   ,
        autor:  req.body.autor,
        proveedor:  req.body.proveedor,
        telefonoProveedor: req.body.telefonoProveedor   ,
        img:  req.body.img   ,
        stock: req.body.stock 
        };
        Articulo.create(libro).then((articuloDB) => {
            
            if (!articuloDB) {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No se pudo crear el artículo'
                });
            }else{
                return res.status(200).json({
                status: 'Ok',
                message: 'El libro ha sido creado correctamente.',
                libro:articuloDB
                });
            }
        
        });
    }
    

     async update(req: Request, res: Response) {
        const  ISBN = req.body.ISBN; 
        const datosActualizados= {
            ISBN:req.body.ISBN,
            titulo: req.body.titulo   ,
            precio_compra:  req.body.precio_compra   ,
            precio_venta:  req.body.precio_venta   ,
            categoria:  req.body.categoria   ,
            descripcion: req.body.descripcion   ,
            autor:  req.body.autor,
            proveedor:  req.body.proveedor,
            telefonoProveedor: req.body.telefonoProveedor   ,
            img:  req.body.img   ,
            stock: req.body.stock 
            };
    
        try {
            
            const libroActualizado = await Articulo.findOneAndUpdate(
                 ISBN , 
                datosActualizados, 
                { new: true } 
            );
    
            if (!libroActualizado) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Libro no encontrado'
                });
            }
    
            // Si se actualiza correctamente, devuelve el libro actualizado
            res.status(200).json({
                ok: true,
                mensaje: 'Libro actualizado correctamente',
                libro: libroActualizado
            });
        } catch (err:any) {
            // Si ocurre un error, devuelve un mensaje de error
            res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar el libro',
                 err: err.message
            });
        }
    }

    async findByTitle(req: Request, res: Response) {
        try {
            const titulo = typeof req.query.titulo === 'string' ? req.query.titulo : '';
            
            
            const libroEncontrado = await Articulo.findOne({ titulo });
    
            if (!libroEncontrado) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Libro no encontrado'
                });
            }
    
            res.status(200).json({
                ok: true,
                mensaje: 'Libro encontrado',
                libro: libroEncontrado
            });
        } catch (err:any) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el libro por título',
                err: err.message
            });
        }
    }
    async delete(req: any, res: Response) {
        const titulo = req.params.titulo;
        console.log(titulo)
  
        try {
          const articulo = await Articulo.findOne({ titulo });
          // const articulo = await Articulo.findById(articuloId).where({ usuario: usuarioId });
  
      
          if (!articulo) {
            return res.status(404).json({ success: false, error: 'No se encontró el artículo' });
          }
      
          await articulo.remove();
          res.json({ success: true, message: 'Artículo eliminado correctamente' });
        } catch (error: any) {
          res.status(500).json({ success: false, error: error.message });
        }
      }
    
    
    
    
    
    
    
    /*
    
    
    

    // Servicio para modificar artículos
    async update(req: any, res: Response) {
      const articuloId = req.params.articulo_id;
      const update = req.body;

      try {
        const articulo = await Articulo.findByIdAndUpdate(articuloId, update, { new: true });
        res.json({ success: true, articulo });
      } catch (error: any) {
        res.status(500).json({ 
          success: false, 
          error: error.message 
        });
      }

    };

    // Servicio para subir archivos
    async upload(req: any, res: Response) {
        
        if ( !req.files ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo'
            });
        }

        const file: FileUpload = req.files.image;

        if ( !file ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo - image'
            });
        }

        if ( !file.mimetype.includes('imagen') ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Lo que subió no es una imagen'
            }); 
        }

        await fileSystem.guardarImagenTemporal( file, req.usuario._id );

        res.json({
            ok: true,
            file: file.mimetype
        });

    };


    // Obtener imagen por url
    getImg(req: any, res: Response) {

        const userId = req.params.userid;
        const img    = req.params.img;

        const pathFoto = fileSystem.getFotoUrl( userId, img );

        res.sendFile( pathFoto );

    };

    // WIP
    
    async delete(req: any, res: Response) {
      const articuloId = req.params.articulo_id;
      const usuarioId = req.usuario._id;

      try {
        const articulo = await Articulo.findOne({ _id: articuloId, usuario: usuarioId });
        // const articulo = await Articulo.findById(articuloId).where({ usuario: usuarioId });

    
        if (!articulo) {
          return res.status(404).json({ success: false, error: 'No se encontró el artículo' });
        }
    
        await articulo.remove();
        res.json({ success: true, message: 'Artículo eliminado correctamente' });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
      */
      
}

export default articuloControlador;