"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompraElemento = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const compraSchema = new mongoose_1.default.Schema({
    fechaCompra: {
        type: Date,
        required: [true]
    },
    nombreUsuario: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    enviado: {
        type: Boolean,
        required: [true]
    },
    precioTotal: {
        type: Number,
        required: [true]
    },
    articulo: [{
            titulo: [{
                    type: String,
                    //
                    required: [true]
                }], imagen: [{
                    type: String,
                    //
                    required: [true]
                }], IBSN: [{
                    type: String,
                    //
                    required: [true]
                }],
        }],
    direccion: {
        type: String,
        required: [true]
    },
    cp: {
        type: String,
        required: [true]
    },
    ciudad: {
        type: String,
        required: [true]
    },
    pais: {
        type: String,
        required: [true]
    },
    localidad: {
        type: String,
        required: [true]
    },
});
exports.CompraElemento = (0, mongoose_1.model)('Compra', compraSchema);
