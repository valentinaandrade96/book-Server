import { Schema, Document, model } from 'mongoose';



const descuentoSchema = new Schema({
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

export interface IDescuento extends Document {
    fechaInicio: Date,
    fechaFin: Date,
    tipoDescuento: string,
    cantidad: Number
    
   

   
}

export const Descuento=model<IDescuento>('Descuento', descuentoSchema);
