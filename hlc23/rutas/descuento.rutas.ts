import { Router} from "express";
import usuarioController from "../controladores/usuario.controlador";
import { verificaToken } from "../middlewares/verificaToken";
import{descuentoControlador} from "../controladores/descuento.controlador"

const descuentosRuta= Router();

descuentosRuta.post('/subirDescuento',descuentoControlador.prototype.subirDescuento);
descuentosRuta.get('/descuentos-vigentes', descuentoControlador.prototype.obtenerDescuentosVigentes);
descuentosRuta.get("/descuentos", descuentoControlador.prototype.getDescuentos);
descuentosRuta.delete("/borrarDescuento/:id", descuentoControlador.prototype.eliminarDescuentoPorId);
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
export default descuentosRuta;