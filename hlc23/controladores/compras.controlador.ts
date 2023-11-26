
import { verificaToken } from '../middlewares/verificaToken';
import { Articulo } from '../modelos/articulo.modelo';

import { Usuario } from '../modelos/usuario.modelo';
import Token from '../clases/token';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { CompraElemento } from '../modelos/compras.modelo';



class compraControlador {


    async crearCompra(req: Request, res: Response) {
        const titulos:any[] =req.body.titulo;
        const email=req.body.email;
        const precioTotal=req.body.precioTotal;
        
        const articuloElemento: any[] = [];
        
        
        const usuario:any = await Usuario.findOne({ email });

        
        
        for (const titulo of titulos) {
          const articulo: any = await Articulo.findOne({ titulo });
          console.log("titulos "+ titulos)
          console.log(titulo+"titulok pasa aki")
          if (articulo) {
            articuloElemento.push({
              titulo: articulo.titulo,
              img: articulo.img,
              ISBN: articulo.ISBN,
            });
            console.log("el articuloElemento                "+articuloElemento)
          }
        }


        
        const fechaActual = moment();
        console.log(usuario)
        const compra = {
          email:usuario.email,
          nombreUsuario: usuario.nombre+" "+ usuario.apellidos,
            direccion: usuario.direccion,
            pais:usuario.pais,
            cp:usuario.cp,
            localidad:usuario.localidad,
            ciudad:usuario.ciudad,
            
            articulo   : articuloElemento,
            fechaCompra:fechaActual.toDate(),
            precioTotal:precioTotal,
            enviado:'no',
            
            
            
        };
        CompraElemento.create(compra).then((compraDB) => {
            
            if (!compraDB) {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No se pudo crear el artículo'
                });
            }else{
                return res.status(500).json({
                status: 'Ok',
                message: 'El elemento a comprar ha sido creado correctamente.',
                compraDB
                });
            }
        
        });
    }
/*
    async setEnviada(req: Request, res: Response) {
        try {
          // Obtén el ID de la compra que deseas marcar como enviada desde los parámetros de la solicitud
          const compraId = req.params.id;
      
          // Busca la compra por su ID
          const compra = await CompraElemento.findById(compraId);
      
          if (!compra) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Compra no encontrada',
            });
          }
      
          // Actualiza el campo 'enviado' a 'si'
          compra.enviado = true;
      
          // Guarda los cambios en la base de datos
          const compraActualizada = await compra.save();
      
          res.status(200).json({
            ok: true,
            mensaje: 'Compra marcada como enviada correctamente',
            compra: compraActualizada,
          });
        } catch (err: any) {
          res.status(500).json({
            ok: false,
            mensaje: 'Error al marcar la compra como enviada',
            error: err.message,
          });
        }
      }
      */

        async obtenerTodasLasCompras(req: Request, res: Response) {
          try {
            const compras = await CompraElemento.find();
            console.log("Las compras son: "+compras)
            res.status(200).json({
              ok: true,
              compras,
            });
          } catch (error) {
            console.error('Error al obtener todas las compras:', error);
            res.status(500).json({
              ok: false,
              mensaje: 'Error interno del servidor',
            });
          }
        }
        async  obtenerComprasNoEnviadas(req: Request, res: Response) {
          try {
            const comprasNoEnviadas = await CompraElemento.find({ enviado: false });
            res.status(200).json({
              ok: true,
              compras: comprasNoEnviadas,
            });
          } catch (error) {
            console.error('Error al obtener las compras no enviadas:', error);
            res.status(500).json({
              ok: false,
              mensaje: 'Error interno del servidor',
            });
          }
        }
        



}





export default compraControlador;