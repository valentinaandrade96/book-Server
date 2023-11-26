"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulo_controlador_1 = __importDefault(require("../controladores/articulo.controlador"));
//import { verificaToken } from '../middlewares/autenticacion';
const articuloRutas = (0, express_1.Router)();
articuloRutas.get('/get', articulo_controlador_1.default.prototype.get);
articuloRutas.post('/update', articulo_controlador_1.default.prototype.update);
articuloRutas.post('/post', articulo_controlador_1.default.prototype.post);
articuloRutas.get('/getLibroPorTitulo', articulo_controlador_1.default.prototype.findByTitle);
//articuloRutas.put('/update/:articulo_id', articuloControlador.prototype.update);
//articuloRutas.post('/upload', articuloControlador.prototype.upload);
//articuloRutas.get('/imagen/:userid/:img', articuloControlador.prototype.getImg);
//articuloRutas.delete('/delete/:articulo_id', articuloControlador.prototype.delete);
exports.default = articuloRutas;
