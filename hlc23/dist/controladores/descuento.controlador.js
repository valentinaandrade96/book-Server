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
exports.descuentoControlador = void 0;
const descuentos_modelo_1 = require("../modelos/descuentos.modelo");
const moment_1 = __importDefault(require("moment"));
class descuentoControlador {
    subirDescuento(req, res) {
        const descuento = {
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin,
            tipoDescuento: req.body.tipoDescuento,
            cantidad: req.body.cantidad
        };
        descuentos_modelo_1.Descuento.create(descuento).then((descuentoDB) => {
            if (!descuentoDB) {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No se pudo crear el artículo'
                });
            }
            else {
                return res.status(500).json({
                    status: 'Ok',
                    message: 'El descuento ha sido creado correctamente.',
                    descuentoDB
                });
            }
        });
    }
    obtenerDescuentosVigentes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = (0, moment_1.default)();
                // Buscar descuentos que estén dentro del rango de fechas
                const descuentosVigentes = yield descuentos_modelo_1.Descuento.find({
                    fechaInicio: { $lte: fechaActual.toDate() },
                    fechaFin: { $gte: fechaActual.toDate() },
                });
                res.status(200).json({
                    ok: true,
                    mensaje: 'Descuentos vigentes obtenidos correctamente',
                    descuentos: descuentosVigentes
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener los descuentos vigentes',
                    error: err.message
                });
            }
        });
    }
    getDescuentos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const descuentos = yield descuentos_modelo_1.Descuento.find();
                res.status(200).json({
                    ok: true,
                    mensaje: "Descuentos encontrados",
                    descuentos,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: "Error al buscar descuentos",
                    error: err.message,
                });
            }
        });
    }
    eliminarDescuentoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const descuentoId = req.params.id; // Obtén el ID del descuento desde los parámetros de la solicitud
                // Busca y elimina el descuento por su ID
                const descuentoEliminado = yield descuentos_modelo_1.Descuento.findByIdAndDelete(descuentoId);
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
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: "Error al eliminar el descuento",
                    error: err.message,
                });
            }
        });
    }
}
exports.descuentoControlador = descuentoControlador;
