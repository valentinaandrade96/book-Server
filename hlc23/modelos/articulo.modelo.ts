import { Schema, Document, model } from 'mongoose';

const articuloSchema = new Schema({

    
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


interface Articulo extends Document {
    ISBN: Date;
    titulo: string;
    precio_compra: Number;
    precio_venta: Number;
    categoria: string;
    descripcion: string;
    autor: string;
    proveedor: string;
    telefonoProveedor: string;
    img: string;
    stock:number;
    
}

export const Articulo = model<Articulo>('Articulo', articuloSchema);