import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

export default class Token{
private static data:any=dotenv.config();
private static claveSecreta:string=Token.data.parsed.CLAVE_SECRETA;
public static caducidad:string='1y';
constructor(){

}

static generaToken(payLoad:any):string{

  
    return jwt.sign({
        usuario:payLoad
    },
    Token.claveSecreta,
    {
        expiresIn: Token.caducidad
    }
    
    );
}

static compareToken(token:string){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, Token.claveSecreta,(err, decoded:any)=>{
            if(err){
                if(err.name=='TokenExpiredError'){
                    reject('Sesión caducada');
                }else{
                    resolve('token invalido')
                }

            }else{
                resolve(decoded)
            }
        });
            
    });


}



}

  