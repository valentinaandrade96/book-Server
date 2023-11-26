"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const articulo_modelo_1 = require("../modelos/articulo.modelo");
const usuario_modelo_1 = require("../modelos/usuario.modelo");
const moment_1 = __importDefault(require("moment"));
const compras_modelo_1 = require("../modelos/compras.modelo");
class compraControlador {
    crearCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const titulos = req.body.titulo;
            const email = req.body.email;
            const precioTotal = req.body.precioTotal;
            const articuloElemento = [];
            const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
            for (const titulo of titulos) {
                const articulo = yield articulo_modelo_1.Articulo.findOne({ titulo });
                console.log("titulos " + titulos);
                console.log(titulo + "titulok pasa aki");
                if (articulo) {
                    articuloElemento.push({
                        titulo: articulo.titulo,
                        img: articulo.img,
                        ISBN: articulo.ISBN,
                    });
                    console.log("el articuloElemento                " + articuloElemento);
                }
            }
            const fechaActual = (0, moment_1.default)();
            console.log(usuario);
            const compra = {
                email: usuario.email,
                nombreUsuario: usuario.nombre + " " + usuario.apellidos,
                direccion: usuario.direccion,
                pais: usuario.pais,
                cp: usuario.cp,
                localidad: usuario.localidad,
                ciudad: usuario.ciudad,
                articulo: articuloElemento,
                fechaCompra: fechaActual.toDate(),
                precioTotal: precioTotal,
                enviado: 'no',
            };
            compras_modelo_1.CompraElemento.create(compra).then((compraDB) => {
                if (!compraDB) {
                    return res.status(500).json({
                        status: 'Fail',
                        message: 'No se pudo crear el artículo'
                    });
                }
                else {
                    return res.status(500).json({
                        status: 'Ok',
                        message: 'El elemento a comprar ha sido creado correctamente.',
                        compraDB
                    });
                }
            });
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
    obtenerTodasLasCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compras = yield compras_modelo_1.CompraElemento.find();
                console.log("Las compras son: " + compras);
                res.status(200).json({
                    ok: true,
                    compras,
                });
            }
            catch (error) {
                console.error('Error al obtener todas las compras:', error);
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error interno del servidor',
                });
            }
        });
    }
    obtenerComprasNoEnviadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comprasNoEnviadas = yield compras_modelo_1.CompraElemento.find({ enviado: false });
                res.status(200).json({
                    ok: true,
                    compras: comprasNoEnviadas,
                });
            }
            catch (error) {
                console.error('Error al obtener las compras no enviadas:', error);
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error interno del servidor',
                });
            }
        });
    }
}
exports.default = compraControlador;
