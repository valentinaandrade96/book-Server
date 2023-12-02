
import mongoose, { Schema, model, Document } from "mongoose";

import bcrypt from 'bcryptjs';
import { Articulo } from "./articulo.modelo";

const usuarioSchema = new Schema({
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
            required: [true ]
        },img: {
            type: String,
          //
            required: [true ]
        },ISBN: {
            type: String,
          //
            required: [true ]
        },enviado: {
            type: Boolean,
          //
            required: [true ]
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
    
    carrito:[{
        titulo: {
            type: String,
          //
            required: [true ]
        },img: {
            type: String,
          //
            required: [true ]
        },ISBN: {
            type: String,
          //
            required: [true ]
        },
        precioTotal: {
            type: Number,
            required: [true]
        },enviado: {
            type: Boolean,
          //
            required: [true ]
        }
    }],
    compras:[{
        titulo: {
            type: String,
          //
            required: [true ]
        },img: {
            type: String,
          //
            required: [true ]
        },ISBN: {
            type: String,
          //
            required: [true ]
        },
        precioTotal: {
            type: Number,
            required: [true]
        },
        enviado: {
            type: Boolean,
          //
            required: [true ]
        }
    }]
});




export interface IUsuario extends Document {
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    nacimiento: Date,
    sexo: string,
    direccion: string,
    ciudad: string,
    localidad: string,
    pais: string,
    cp:string,
    favoritos: [{
        titulo:string,
        img:string,
        ISBN:string,
        precioTotal:number,
        enviado:boolean,
    }],
    rol:string
    carrito:[{
        titulo:string,
        img:string,
        ISBN:string,
        precioTotal:number,
        enviado:boolean,
        
    }],
    compras: [{
        titulo:string,
        img:string,
        ISBN:string,
        precioTotal:number,
        enviado:boolean
    }],

    
}

export const Usuario=model<IUsuario>('Usuario', usuarioSchema);
