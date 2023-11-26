import { Router} from "express";
import compraControlador from "../controladores/compras.controlador";
import { verificaToken } from "../middlewares/verificaToken";

const comprasRutas= Router();



comprasRutas.post('/crearCompra',  compraControlador.prototype.crearCompra);
//comprasRutas.put('/setEnviada/:id', compraControlador.prototype.setEnviada);
comprasRutas.get('/obtenerTodas', compraControlador.prototype.obtenerTodasLasCompras);
comprasRutas.get('/obtenerNoEenviadas', compraControlador.prototype.obtenerComprasNoEnviadas);



export default comprasRutas;