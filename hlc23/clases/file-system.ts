import { FileUpload } from '../interfaces/file-upload';

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() { };

    guardarImagenTemporal( file: FileUpload, userId: string ) {

        return new Promise<void>(  (resolve, reject) => {

            // Crear carpetas
            const path = this.crearCarpetaUsuario( userId );
    
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico( file.name );
            
            // Mover el archivo del Temp a nuestra carpeta
            file.mv( `${ path }/${ nombreArchivo }`, ( err: any) => {
    
                if ( err ) {
                    reject(err);
                } else {
                    resolve();
                }
    
            });

        });

    }

    private generarNombreUnico( nombreOriginal: string ) {
        // 6.copy.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length - 1 ];

        const idUnico = uniqid();


        return `${ idUnico }.${ extension }`;
    }


    private crearCarpetaUsuario( userId: string ) {

        const pathUser = path.resolve(  __dirname, '../uploads/', userId );
        const pathUserTemp = path.resolve(pathUser + '/temp'); 
        // console.log(pathUser);
        // const pathUserTemp = pathUser + '/temp';

        const existe = fs.existsSync( pathUser );

        if ( !existe ) {
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;

    }

    imagenesDeTempHaciaArticulo( userId: string ) {

        const pathTemp = path.resolve(  __dirname, '../uploads/', userId, 'temp' );
        const pathArticulo = path.resolve(  __dirname, '../uploads/', userId, 'articulo' );

        if ( !fs.existsSync( pathTemp ) ) {
            return [];
        }

        if ( !fs.existsSync( pathArticulo ) ) {
            fs.mkdirSync( pathArticulo );
        }

        const imagenesTemp = this.obtenerImagenesEnTemp( userId );

        imagenesTemp.forEach( imagen => {
            fs.renameSync( `${ pathTemp }/${ imagen }`, `${ pathArticulo }/${ imagen }` )
        });

        return imagenesTemp;

    }

    private obtenerImagenesEnTemp( userId: string ) {

        const pathTemp = path.resolve(  __dirname, '../uploads/', userId, 'temp' );

        return fs.readdirSync( pathTemp ) || [];

    }


    getFotoUrl( userId: string, img: string ) {

        // Path artículos
        const pathFoto = path.resolve( __dirname, '../uploads', userId, 'articulo', img );


        // Si la imagen existe
        const existe = fs.existsSync( pathFoto );
        if ( !existe ) {
            return path.resolve( __dirname, '../assets/400x250.jpg' );
        }


        return pathFoto;

    }


}
