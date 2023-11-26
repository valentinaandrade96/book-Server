
import { Application} from "express";
import express from 'express';
export class Server{
    public port:number= parseInt(process.env.PORT || '3300');
    public app:express.Application;
    constructor(){
        this.app=express();
        
    }
    start(callback:()=>void){
        this.app.listen(this.port,callback);
    }
}