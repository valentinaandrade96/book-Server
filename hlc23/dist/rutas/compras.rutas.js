"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compras_controlador_1 = __importDefault(require("../controladores/compras.controlador"));
const comprasRutas = (0, express_1.Router)();
comprasRutas.post('/crearCompra', compras_controlador_1.default.prototype.crearCompra);
//comprasRutas.put('/setEnviada/:id', compraControlador.prototype.setEnviada);
comprasRutas.get('/obtenerTodas', compras_controlador_1.default.prototype.obtenerTodasLasCompras);
comprasRutas.get('/obtenerNoEenviadas', compras_controlador_1.default.prototype.obtenerComprasNoEnviadas);
exports.default = comprasRutas;
