"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor, indique su nombre']
    },
    apellidos: {
        type: String,
        required: [true, 'Por favor, indique sus apellidos']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor, indique su email']
    },
    password: {
        type: String,
        required: [true, 'Por favor, indique su contraseña']
    },
    favoritos: [{
            titulo: {
                type: String,
                //
                required: [true]
            }, img: {
                type: String,
                //
                required: [true]
            }, ISBN: {
                type: String,
                //
                required: [true]
            }, enviado: {
                type: Boolean,
                //
                required: [true]
            }, precioTotal: {
                type: Number,
                required: [true]
            },
        }],
    nacimiento: {
        type: Date,
        required: [true, 'Por favor, indique su fecha de nacimiento']
    },
    sexo: {
        type: String,
        required: [true, 'Por favor, indique su sexo']
    },
    direccion: {
        type: String,
        required: [true, 'Por favor, indique su dirección']
    },
    ciudad: {
        type: String,
        required: [true, 'Por favor, indique su ciudad']
    },
    localidad: {
        type: String,
        required: [true, 'Por favor, indique su localidad']
    },
    pais: {
        type: String,
        required: [true, 'Por favor, indique su país']
    },
    rol: {
        type: String,
        required: [true, 'Por favor, indique su rol']
    },
    cp: {
        type: String,
        required: [true, 'Por favor, indique su cp']
    },
    carrito: [{
            titulo: {
                type: String,
                //
                required: [true]
            }, img: {
                type: String,
                //
                required: [true]
            }, ISBN: {
                type: String,
                //
                required: [true]
            },
            precioTotal: {
                type: Number,
                required: [true]
            }, enviado: {
                type: Boolean,
                //
                required: [true]
            }
        }],
    compras: [{
            titulo: {
                type: String,
                //
                required: [true]
            }, img: {
                type: String,
                //
                required: [true]
            }, ISBN: {
                type: String,
                //
                required: [true]
            },
            precioTotal: {
                type: Number,
                required: [true]
            },
            enviado: {
                type: Boolean,
                //
                required: [true]
            }
        }]
});
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
