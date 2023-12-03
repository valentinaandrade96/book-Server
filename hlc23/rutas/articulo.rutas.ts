import { Request, Response, Router } from "express";
import articuloControlador from "../controladores/articulo.controlador";
//import { verificaToken } from '../middlewares/autenticacion';

const articuloRutas = Router();

articuloRutas.get('/get', articuloControlador.prototype.get);
articuloRutas.post('/update', articuloControlador.prototype.update);
articuloRutas.post('/post', articuloControlador.prototype.post);
articuloRutas.get('/getLibroPorTitulo', articuloControlador.prototype.findByTitle);


//articuloRutas.put('/update/:articulo_id', articuloControlador.prototype.update);
//articuloRutas.post('/upload', articuloControlador.prototype.upload);
//articuloRutas.get('/imagen/:userid/:img', articuloControlador.prototype.getImg);
articuloRutas.delete('/delete/:titulo', articuloControlador.prototype.delete);

export default articuloRutas;