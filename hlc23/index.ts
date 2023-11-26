import {Server} from './clases/server';
import  bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import usuarioRutas from './rutas/usuario.rutas';
import articuloRutas from './rutas/articulo.rutas';
import descuentosRuta from './rutas/descuento.rutas';
import comprasRutas from './rutas/compras.rutas';
const miServidor= new Server()
const url:string=process.env.MONGO_URL ||''
miServidor.app.use(bodyParser.urlencoded({limit:'5mb', extended:true}));
miServidor.app.use(bodyParser.json({limit:'5mb'}));
console.log("url "+url)

miServidor.app.use(cors({
    origin:true,
    credentials:true
}));


mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}, (err)=>{
if(err){
    console.log("error", err);
    throw err;

}else{
    console.log('Conectado a la base de datos')
}
}); 

miServidor.app.use('/usuario', usuarioRutas);
miServidor.app.use('/articulo', articuloRutas);
miServidor.app.use('/descuentos', descuentosRuta);
miServidor.app.use('/compras', comprasRutas);



miServidor.start(()=>{

    console.log('Servidor iniciado en el puerto '+ miServidor.port);
})


