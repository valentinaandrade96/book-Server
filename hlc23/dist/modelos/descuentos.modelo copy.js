"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Descuento = void 0;
const mongoose_1 = require("mongoose");
const descuentoSchema = new mongoose_1.Schema({
    fechaInicio: {
        type: Date,
        required: [true, 'Por favor, indique la fecha de inicio']
    },
    fechaFin: {
        type: Date,
        required: [true, 'Por favor, indique la fecha de fín']
    },
    tipoDescuento: {
        type: String,
        required: [true, 'Por favor, indique si quieres ue sea suma, resta,  suma-porcentaje, menos-porcentaje']
    },
    cantidad: {
        type: Number,
        required: [true, 'Por favor, indique la cantidad']
    }
});
exports.Descuento = (0, mongoose_1.model)('Descuento', descuentoSchema);
