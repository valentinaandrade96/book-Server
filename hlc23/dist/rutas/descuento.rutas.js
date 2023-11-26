"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const descuento_controlador_1 = require("../controladores/descuento.controlador");
const descuentosRuta = (0, express_1.Router)();
descuentosRuta.post('/subirDescuento', descuento_controlador_1.descuentoControlador.prototype.subirDescuento);
descuentosRuta.get('/descuentos-vigentes', descuento_controlador_1.descuentoControlador.prototype.obtenerDescuentosVigentes);
descuentosRuta.get("/descuentos", descuento_controlador_1.descuentoControlador.prototype.getDescuentos);
descuentosRuta.delete("/borrarDescuento/:id", descuento_controlador_1.descuentoControlador.prototype.eliminarDescuentoPorId);
/*

//usuarioRutas.get('/getDatos',usuarioController.prototype.getDatos);
usuarioRutas.post('/newUser',usuarioController.prototype.newUser);
usuarioRutas.post('/login', usuarioController.prototype.login);
//usuarioRutas.get('/getEmail', verificaToken, usuarioController.prototype.getEmail);
//usuarioRutas.get('/renewToken', verificaToken, usuarioController.prototype.renewToken);
usuarioRutas.get('/get',  usuarioController.prototype.get);
usuarioRutas.post('/create', usuarioController.prototype.create);
usuarioRutas.post('/agregarCarrito', usuarioController.prototype.agregarAlCarrito);
usuarioRutas.delete('/eliminarDelCarrito', usuarioController.prototype.eliminarDelCarrito);
usuarioRutas.get('/obtenerIdPorEmail/:email', usuarioController.prototype.obtenerIdPorEmail);
//usuarioRutas.post('/update', verificaToken, usuarioController.prototype.update);
*/
exports.default = descuentosRuta;
