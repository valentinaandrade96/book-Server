import { Router} from "express";
import usuarioController from "../controladores/usuario.controlador";
import { verificaToken } from "../middlewares/verificaToken";

const usuarioRutas= Router();


//usuarioRutas.get('/getDatos',usuarioController.prototype.getDatos);
//usuarioRutas.post('/newUser',usuarioController.prototype.newUser);
usuarioRutas.post('/login', usuarioController.prototype.login);
//usuarioRutas.get('/getEmail', verificaToken, usuarioController.prototype.getEmail);
//usuarioRutas.get('/renewToken', verificaToken, usuarioController.prototype.renewToken);
//usuarioRutas.get('/get', verificaToken, usuarioController.prototype.get);
usuarioRutas.post('/create',usuarioController.prototype.create);
usuarioRutas.post('/agregarCarrito', usuarioController.prototype.agregarAlCarrito);
usuarioRutas.post('/eliminarDelCarrito', usuarioController.prototype.eliminarDelCarrito);
usuarioRutas.get('/obtenerIdPorEmail/:email', usuarioController.prototype.obtenerIdPorEmail);
usuarioRutas.post('/update', verificaToken, usuarioController.prototype.update);
usuarioRutas.get('/obtenerRolPorEmail/:email', usuarioController.prototype.obtenerRolPorEmail);
usuarioRutas.put('/cambiarRolAdmin/:email', usuarioController.prototype.cambiarRolAdmin);
usuarioRutas.get('/get', verificaToken, usuarioController.prototype.get);
usuarioRutas.post('/cambiarContrasena', usuarioController.prototype.cambiarContrasena);
usuarioRutas.get('/obtenerTodosLosusuarios', usuarioController.prototype.obtenerTodosLosusuarios);
usuarioRutas.post('/moverCarritoACompras',  usuarioController.prototype.moverCarritoACompras);
usuarioRutas.post('/agregarAFavorito', usuarioController.prototype.agregarAFavorito);
usuarioRutas.post('/eliminarDeFavoritos', usuarioController.prototype.eliminarDeFavoritos);
usuarioRutas.post('/setEnviado', usuarioController.prototype.setEnviado);
console.log("Rutas")
export default usuarioRutas;