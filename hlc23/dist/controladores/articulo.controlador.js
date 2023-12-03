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
Object.defineProperty(exports, "__esModule", { value: true });
const articulo_modelo_1 = require("../modelos/articulo.modelo");
class articuloControlador {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            articulo_modelo_1.Articulo.find({}, (err, articulos) => {
                if (err) {
                    return res.status(500).json({
                        status: 'Fail',
                        message: 'Error al obtener los artículos'
                    });
                }
                return res.status(200).json({
                    status: 'Ok',
                    message: 'Artículos obtenidos correctamente',
                    articulos
                });
            });
        });
    }
    ;
    // Crear artículos
    post(req, res) {
        const libro = {
            ISBN: req.body.ISBN,
            titulo: req.body.titulo,
            precio_compra: req.body.precio_compra,
            precio_venta: req.body.precio_venta,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            autor: req.body.autor,
            proveedor: req.body.proveedor,
            telefonoProveedor: req.body.telefonoProveedor,
            img: req.body.img,
            stock: req.body.stock
        };
        articulo_modelo_1.Articulo.create(libro).then((articuloDB) => {
            if (!articuloDB) {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No se pudo crear el artículo'
                });
            }
            else {
                return res.status(200).json({
                    status: 'Ok',
                    message: 'El libro ha sido creado correctamente.',
                    libro: articuloDB
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ISBN = req.body.ISBN;
            const datosActualizados = {
                ISBN: req.body.ISBN,
                titulo: req.body.titulo,
                precio_compra: req.body.precio_compra,
                precio_venta: req.body.precio_venta,
                categoria: req.body.categoria,
                descripcion: req.body.descripcion,
                autor: req.body.autor,
                proveedor: req.body.proveedor,
                telefonoProveedor: req.body.telefonoProveedor,
                img: req.body.img,
                stock: req.body.stock
            };
            try {
                const libroActualizado = yield articulo_modelo_1.Articulo.findOneAndUpdate(ISBN, datosActualizados, { new: true });
                if (!libroActualizado) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Libro no encontrado'
                    });
                }
                // Si se actualiza correctamente, devuelve el libro actualizado
                res.status(200).json({
                    ok: true,
                    mensaje: 'Libro actualizado correctamente',
                    libro: libroActualizado
                });
            }
            catch (err) {
                // Si ocurre un error, devuelve un mensaje de error
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar el libro',
                    err: err.message
                });
            }
        });
    }
    findByTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const titulo = typeof req.query.titulo === 'string' ? req.query.titulo : '';
                const libroEncontrado = yield articulo_modelo_1.Articulo.findOne({ titulo });
                if (!libroEncontrado) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Libro no encontrado'
                    });
                }
                res.status(200).json({
                    ok: true,
                    mensaje: 'Libro encontrado',
                    libro: libroEncontrado
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el libro por título',
                    err: err.message
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const titulo = req.params.titulo;
            console.log(titulo);
            try {
                const articulo = yield articulo_modelo_1.Articulo.findOne({ titulo });
                // const articulo = await Articulo.findById(articuloId).where({ usuario: usuarioId });
                if (!articulo) {
                    return res.status(404).json({ success: false, error: 'No se encontró el artículo' });
                }
                yield articulo.remove();
                res.json({ success: true, message: 'Artículo eliminado correctamente' });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
}
exports.default = articuloControlador;
