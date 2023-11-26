
import { verificaToken } from '../middlewares/verificaToken';
import { Articulo } from '../modelos/articulo.modelo';

import { Usuario } from '../modelos/usuario.modelo';
import Token from '../clases/token';
import { Request, Response, NextFunction } from 'express';
import { Descuento } from '../modelos/descuentos.modelo';
import moment from 'moment';


export class descuentoControlador {


    subirDescuento(req: Request, res: Response) {
        const descuento= {
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin,
            tipoDescuento: req.body.tipoDescuento,
            cantidad: req.body.cantidad
        };
        Descuento.create(descuento).then((descuentoDB) => {
            
            if (!descuentoDB) {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No se pudo crear el artículo'
                });
            }else{
                return res.status(500).json({
                status: 'Ok',
                message: 'El descuento ha sido creado correctamente.',
                descuentoDB
                });
            }
        
        });
    }

    async obtenerDescuentosVigentes(req: Request, res: Response) {
        try {
            const fechaActual = moment();
            
            // Buscar descuentos que estén dentro del rango de fechas
            const descuentosVigentes = await Descuento.find({
                fechaInicio: { $lte: fechaActual.toDate() },
                fechaFin: { $gte: fechaActual.toDate() },
              });

            res.status(200).json({
                ok: true,
                mensaje: 'Descuentos vigentes obtenidos correctamente',
                descuentos: descuentosVigentes
            });
        } catch (err:any) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al obtener los descuentos vigentes',
                error: err.message
            });
        }
    }
    async getDescuentos(req: Request, res: Response) {
        try {
          const descuentos = await Descuento.find();
    
          res.status(200).json({
            ok: true,
            mensaje: "Descuentos encontrados",
            descuentos,
          });
        } catch (err:any) {
          res.status(500).json({
            ok: false,
            mensaje: "Error al buscar descuentos",
            error: err.message,
          });
        }
      }

      async eliminarDescuentoPorId(req: Request, res: Response) {
        try {
          const descuentoId = req.params.id; // Obtén el ID del descuento desde los parámetros de la solicitud
    
          // Busca y elimina el descuento por su ID
          const descuentoEliminado = await Descuento.findByIdAndDelete(descuentoId);
    
          if (!descuentoEliminado) {
            return res.status(404).json({
              ok: false,
              mensaje: "Descuento no encontrado",
            });
          }
    
          res.status(200).json({
            ok: true,
            mensaje: "Descuento eliminado correctamente",
            descuento: descuentoEliminado,
          });
        } catch (err:any) {
          res.status(500).json({
            ok: false,
            mensaje: "Error al eliminar el descuento",
            error: err.message,
          });
        }
      }






}