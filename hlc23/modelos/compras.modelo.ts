import mongoose, { Schema, Document, model } from 'mongoose';
import { Articulo } from "./articulo.modelo";
import { Usuario } from "./usuario.modelo";



const compraSchema = new mongoose.Schema({
    fechaCompra: {
        type: Date,
        required: [true]
    },
    
    
    nombreUsuario: {
        type: String,
        required: [true ]
    },
    email: {
        type: String,
        required: [true ]
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
            required: [true ]
        }],imagen: [{
            type: String,
          //
            required: [true ]
        }],IBSN: [{
            type: String,
          //
            required: [true ]
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
        type:String,
        required: [true]
    },
    
    
    localidad: {
        type: String,
        required: [true]
    },
    
    

});

export interface ICompra extends Document {
    fechaCompra: Date,
    email:string
    articulo:[{
        titulo:string,
        img:string,
        IBSN:string
    }],
    enviado:boolean,
    precioTotal:Number,
    nombreUsuario: string,
    direccion: string,
    ciudad:string,
    localidad:string,
    pais:string,
    cp:string,
    usuario  : string,
    img:string
    
   

   
}

export const CompraElemento=model<ICompra>('Compra', compraSchema);
