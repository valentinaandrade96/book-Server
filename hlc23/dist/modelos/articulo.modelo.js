"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulo = void 0;
const mongoose_1 = require("mongoose");
const articuloSchema = new mongoose_1.Schema({
    ISBN: {
        type: String
    },
    titulo: {
        unique: true,
        type: String,
    },
    precio_compra: {
        type: Number
    },
    precio_venta: {
        type: Number
    },
    categoria: {
        type: String
    },
    descripcion: {
        type: String
    },
    autor: {
        type: String
    },
    proveedor: {
        type: String
    },
    telefonoProveedor: {
        type: String
    },
    img: {
        type: String
    },
    stock: {
        type: Number
    }
});
exports.Articulo = (0, mongoose_1.model)('Articulo', articuloSchema);
