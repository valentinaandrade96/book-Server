
import { Router, Request,Response } from "express";
import bcryptjs from "bcryptjs";
import { IUsuario, Usuario } from "../modelos/usuario.modelo";
import Token from "../clases/token";
import token from "../clases/token";
import { Articulo } from "../modelos/articulo.modelo";


class usuarioController{

  async obtenerTodosLosusuarios(req: Request, res: Response) {
    console.log("Paso por aqui obtenerTodosLosusuarios")
    console.log(req.body)
    try {
      const usuarios = await Usuario.find();
      res.status(200).json({
        ok: true,
        usuarios,
      });
    } catch (error) {
      console.error('Error al obtener todos los usuarios', error);
      res.status(500).json({
        ok: false,
        mensaje: 'Error interno del servidor',
      });
    }
  }
  async delete(req: any, res: Response) {
    const email = req.params.email;
    

    try {
      const usuario = await Usuario.findOne({ email });
      // const articulo = await Articulo.findById(articuloId).where({ usuario: usuarioId });

  
      if (!usuario) {
        return res.status(404).json({ success: false, error: 'No se encontró el Usuario' });
      }
  
      await usuario.remove();
      res.json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }


    get(req: any, res: Response) {
      console.log("Paso por aqui")

        const usuario = req.usuario;
        console.log("El usuario que entra es: "+ usuario)
    
        res.json({
            ok: true,
            usuario
        });
    
    };

    async  obtenerUsuarioPorId(req: any, res: Response) {
      
      console.log("Paso por aqui+ obtenerUsuarioPorId")
        const usuario = await Usuario.findOne({ email: req.usuario.email ||req.body.email }, (err: any, usuarioDb: IUsuario) => {
          if (err) throw err;
          if (!usuario) {
              return res.json({
                  status: 'fail',
                  mensaje: 'El usuario no existe'
              });
            }
            res.json({
              ok: true,
              usuarioDb
              
          });
          })
    }


    create(req: Request, res: Response) {
      console.log("Paso por aqui+ create")
        const password= bcryptjs.hashSync(req.body.password,10);
        const user = {
            nombre   : req.body.nombre,
            apellidos   : req.body.apellidos,
            email    : req.body.email,
            password : password,
            nacimiento   : req.body.nacimiento,
            sexo   : req.body.sexo,
            direccion   : req.body.direccion,
            ciudad   : req.body.ciudad,
            localidad   : req.body.localidad,
            pais   : req.body.pais,
            cp:req.body.cp,
            rol:req.body.rol
            /*
            favoritos   : req.body.favoritos,
            carrito:req.body.carrito,
            compras:req.body.compras,
            
            */
           
        };
        console.log(req.body)
    
        Usuario.create( user ).then(usuarioDB => {
            
            const tokenUser = Token.generaToken({
                _id: usuarioDB._id,
                nombre: usuarioDB.nombre,
                apellidos: usuarioDB.apellidos,
                password: usuarioDB.password,
                email: usuarioDB.email,
                nacimiento: usuarioDB.nacimiento,
                sexo: usuarioDB.sexo,
                direccion: usuarioDB.direccion,
                ciudad: usuarioDB.ciudad,
                localidad: usuarioDB.localidad,
                pais: usuarioDB.pais,
                favoritos:usuarioDB.favoritos,
                carrito:usuarioDB.carrito,
                compras:usuarioDB.compras,
                rol:usuarioDB.rol,
                cp:usuarioDB.cp
                
            });
            
            if(user) {
                return res.status(200).json({
                    status: 'Ok',
                    message: `El usuario ${usuarioDB.email} ha sido creado correctamente.`,
                    usuarioDb: usuarioDB,
                    token: tokenUser
                });
            } else {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No hay usuario'
                });
            }
        })
    };

    login(req: Request, res: Response) {
      console.log("Paso por aqui login")
        const body = req.body;
        console.log(body)
        Usuario.findOne({ email: body.email }, (err: any, usuarioDB: IUsuario) => {
            if (err) throw err;
            if (!usuarioDB) {
                return res.json({
                    status: 'fail',
                    mensaje: 'El usuario no existe'
                });
            }
            if (bcryptjs.compareSync(body.password, usuarioDB.password)) { // Corrección aquí
              const tokenUser = Token.generaToken({
                _id: usuarioDB._id,
                nombre: usuarioDB.nombre,
                apellidos: usuarioDB.apellidos,
                password: usuarioDB.password,
                email: usuarioDB.email,
                nacimiento: usuarioDB.nacimiento,
                sexo: usuarioDB.sexo,
                direccion: usuarioDB.direccion,
                ciudad: usuarioDB.ciudad,
                localidad: usuarioDB.localidad,
                pais: usuarioDB.pais,
                favoritos:usuarioDB.favoritos,
                carrito:usuarioDB.carrito,
                compras:usuarioDB.compras,
                rol:usuarioDB.rol,
                cp:usuarioDB.cp
                
            });
            
                res.json({
                    ok: true,
                    usuarioDB,
                    token: tokenUser
                });
            } else {
                return res.json({
                    status: 'fail',
                    mensaje: 'La contraseña es incorrecta'
                });
            }
        });
    }

    update(req: any, res: Response) {
      console.log("Paso por aqui+ update")
      
      console.log("Estamos en el update"+ req.usuario)
      console.log(req.params);
      Usuario.findOne({ email: req.body.email }, async (err: any, usuarioDB: IUsuario) => {
     
     
      
      const user = req.body;
      Usuario.findByIdAndUpdate( usuarioDB._id, user, { new: true }, (err, userDB) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.generaToken({
          _id: userDB._id,
          nombre: userDB.nombre,
          apellidos: userDB.apellidos,
          password: userDB.password,
          email: userDB.email,
          nacimiento: userDB.nacimiento,
          sexo: userDB.sexo,
          direccion: userDB.direccion,
          ciudad: userDB.ciudad,
          localidad: userDB.localidad,
          pais: userDB.pais,
          favoritos:userDB.favoritos,
          carrito:userDB.carrito,
          compras:userDB.compras,
          rol:userDB.rol,
          cp:userDB.cp
          
      });

        res.json({
            ok: true,
            token: tokenUser,
            userDB
        });
    });
      })
      
        
        
      
    }
    async  agregarAlCarrito(req: Request, res: Response) {
      
        try {
            // Obtén el email del usuario y el título del artículo del cuerpo de la solicitud
           
            const titulo: string = typeof req.body.titulo === 'string' ? req.body.titulo : '';
          
            const email: string = typeof req.body.email === 'string' ? req.body.email : '';
            
            const usuario = await Usuario.findOne({ email });
            
            if (!usuario) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Usuario no encontrado',
                });
            }
    
            const libro:any = await Articulo.findOne({ titulo });
            
            if (!libro) {
                return res.status(404).json({
                  ok: false,
                  mensaje: 'El libro no es válido',
                });
              }
              const elemento={
                titulo:libro.titulo,
                img:libro.img,
                ISBN:libro.ISBN,
                precioTotal:libro.precio_venta,
                enviado:false
              }
              
    
            // Agrega el nuevo artículo al array "carrito" del usuario
            usuario.carrito.push(elemento);
              
            // Guarda los cambios en la base de datos
            const usuarioActualizado = await usuario.save();
    
            res.status(200).json({
                ok: true,
                mensaje: 'Artículo agregado al carrito correctamente',
                usuario: usuarioActualizado,
                token: Token.generaToken(usuarioActualizado)
                
            });
        } catch (err:any) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al agregar el artículo al carrito',
                error: err.message,
            });
        }
    }
    
    async obtenerIdPorEmail(req: Request, res: Response) {
      console.log("Paso por aqui+ obtenerIdPorEmail")
        try {
          // Obtén la dirección de correo electrónico desde la solicitud
          const email = req.params.email;
      
          // Busca al usuario por su dirección de correo electrónico
          const usuario = await Usuario.findOne({ email });
          console.log("MetodoEspía: obtenerIdPorEmail " )
          if (!usuario) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Usuario no encontrado',
            });
          }
      
          res.status(200).json({
            ok: true,
            Usuario: usuario
          });
        } catch (err: any) {
          res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener el ID del usuario',
            error: err.message,
          });
        }
      }

      async obtenerRolPorEmail(req: Request, res: Response) {
        console.log("Paso por aqui+ obtenerRolPorEmail")
        try {
          // Obtén la dirección de correo electrónico desde la solicitud
          const email = req.params.email;
      
          // Busca al usuario por su dirección de correo electrónico
          const usuario = await Usuario.findOne({ email });
          console.log("MetodoEspía: obtenerRolPorEmail" )
          if (!usuario) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Usuario no encontrado',
            });
          }
      
          // Extrae el rol del usuario
          const rol = usuario.rol;
      
          res.status(200).json({
            ok: true,
            rol,
          });
        } catch (err: any) {
          res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener el rol del usuario',
            error: err.message,
          });
        }
      }

      async cambiarContrasena(req: Request, res: Response) {
        console.log("Paso por aqui+ cambiarContrasena")
        try {
          // Obtén el ID del usuario y las contraseñas desde la solicitud
          const { email, contrasenaActual, nuevaContrasena } = req.body;
            console.log("email "+ email+" contrasenaActual "+ contrasenaActual+" nuevaContrasena "+ nuevaContrasena )
          // Busca al usuario por su ID
          const userDB = await Usuario.findOne({ email });
      
          if (!userDB) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Usuario no encontrado',
              token: Token.generaToken(userDB)
            });
          }
          const nuevaContrasenaValida = await bcryptjs.compare(nuevaContrasena, userDB.password);

    if (nuevaContrasenaValida) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La nueva contraseña debe ser diferente a la actual',
      });
    }
      
          // Verifica que la contraseña actual sea correcta
          const contrasenaValida = await bcryptjs.compare(contrasenaActual, userDB.password);
      
          if (!contrasenaValida) {
            return res.status(400).json({
              ok: false,
              mensaje: 'Contraseña actual incorrecta',
            });
          }
      
          // Encripta la nueva contraseña
          const nuevaContrasenaEncriptada = await bcryptjs.hash(nuevaContrasena, 10);
      
          // Actualiza la contraseña del usuario en la base de datos
          userDB.password = nuevaContrasenaEncriptada;
          await userDB.save();
          const tokenUser = Token.generaToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellidos: userDB.apellidos,
            password: userDB.password,
            email: userDB.email,
            nacimiento: userDB.nacimiento,
            sexo: userDB.sexo,
            direccion: userDB.direccion,
            ciudad: userDB.ciudad,
            localidad: userDB.localidad,
            pais: userDB.pais,
            favoritos:userDB.favoritos,
            carrito:userDB.carrito,
            compras:userDB.compras,
            rol:userDB.rol,
            cp:userDB.cp
            
        });
      
          res.status(200).json({
            ok: true,
            token: tokenUser,
            usuario: userDB
          });
        } catch (err) {
          console.error('Error al cambiar la contraseña:', err);
          res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor',
          });
        }
      }
      
    
    async eliminarDelCarrito(req: Request, res: Response) {
      
        try {
          const titulo  = req.body.titulo;
        const  email = req.body.email;
        console.log(email)
      
          const usuario= await Usuario.findOne({ email });
          console.log("MetodoEspía:  eliminarDelCarrito" )
          if (!usuario) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Usuario no encontrado',
            });
          }
      
          // Busca el artículo en el carrito del usuario por su ID y elimínalo
          const index = usuario.carrito.findIndex((articulo) => articulo.titulo === titulo);
          if (index === -1) {
            return res.status(404).json({
              ok: false,
              mensaje: 'El artículo no se encuentra en el carrito del usuario',
            });
          }
      
          usuario.carrito.splice(index, 1);
      
          // Guarda los cambios en la base de datos
          const usuarioActualizado = await usuario.save();
      
          res.status(200).json({
            ok: true,
            mensaje: 'Artículo eliminado del carrito correctamente',
            usuario: usuarioActualizado,
            token: Token.generaToken(usuarioActualizado)
          });
        } catch (err: any) {
          res.status(500).json({
            ok: false,
            mensaje: 'Error al eliminar el artículo del carrito',
            error: err.message,
          });
        }
      }
      async moverCarritoACompras(req: Request, res: Response) {
        console.log("Paso por aqui+ moverCarritoACompra");
        const email = req.body.email;
        console.log(email);
      
        try {
          // Buscar al usuario por su email
          const usuario = await Usuario.findOne({ email });
          console.log(usuario);
          if (!usuario) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Usuario no encontrado',
            });
          }
      const carritosafe: any=[]
          
          usuario.carrito.forEach(async (articulo) => {
           const titulo=articulo.titulo;
            const libro = await Articulo.findOne({titulo});
           
            if(libro){
              if(libro.stock<=0){
               carritosafe.push(articulo);
                }else{
                  usuario.compras.push(articulo);
                  libro.stock=(libro.stock-1)
                }
                libro.save();

              }
            });
              
          
              // Agrega el artículo a la lista de compras
               // Elimina el artículo del carrito
            
          
          usuario.carrito.forEach((itemArt)=>{
            const index = usuario.carrito.findIndex((item) => item === itemArt);
            if (index !== -1) {
               // Agrega el artículo a la lista de compras
              usuario.carrito.splice(index, 1); // Elimina el artículo del carrito
            }
          });
          usuario.carrito= carritosafe;
          // Guardar los cambios en la base de datos
          await usuario.save();
      if(carritosafe.length >0){
        res.status(200).json({
          ok: true,
          mensaje: 'Carrito movido a compras correctamente menos algunos libros',
          usuario: usuario,
          token: Token.generaToken(usuario),
          carritosafe:carritosafe
        });
      }
          res.status(200).json({
            ok: true,
            mensaje: 'Carrito movido a compras correctamente',
            usuario: usuario,
            token: Token.generaToken(usuario),
            carritosafe:''
          });
      
        } catch (err:any) {
          console.error('Error al mover el carrito a compras:', err);
          res.status(500).json({
            ok: false,
            mensaje: 'Error al mover el carrito a compras',
            error: err.message,
          });
        }
      }
      

      async  agregarAFavorito(req: Request, res: Response) {
        console.log("empieza agregar a favs")

        try {
            // Obtén el email del usuario y el título del artículo del cuerpo de la solicitud
           
            const titulo: string = typeof req.body.titulo === 'string' ? req.body.titulo : '';
          
            const email: string = typeof req.body.email === 'string' ? req.body.email : '';
            console.log(email+"  "+titulo)
            
            const usuario = await Usuario.findOne({ email });
           
            if (!usuario) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Usuario no encontrado',
                });
            }
    
            const libro:any = await Articulo.findOne({ titulo });
            console.log(libro)
            if (!libro) {
                return res.status(404).json({
                  ok: false,
                  mensaje: 'El libro no es válido',
                });
              }
              const elemento={
                titulo:libro.titulo,
                img:libro.img,
                ISBN:libro.ISBN,
                enviado:false,
                precioTotal:libro.precio_venta
              }
              console.log("elemento"+elemento)
    
            // Agrega el nuevo artículo al array "carrito" del usuario
            usuario.favoritos.push(elemento);
            
            // Guarda los cambios en la base de datos
            const usuarioActualizado = await usuario.save();
            //console.log("usuarioActualizado"+usuarioActualizado.titulo)
            res.status(200).json({
                ok: true,
                mensaje: 'Artículo agregado a favoritos correctamente',
                token:Token.generaToken(usuarioActualizado),
                usuario: usuarioActualizado
            });
        } catch (err:any) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al agregar a favoritos al carrito',
                error: err.message,
            });
        }
    }

    async eliminarDeFavoritos(req: Request, res: Response) {
      console.log("Paso por aqui+ eliminarDeFavoritos")
      try {
        const titulo  = req.body.titulo;
      const  email = req.body.email;
      console.log(email)
      console.log(titulo)
    
        const usuario= await Usuario.findOne({ email });
        
        if (!usuario) {
          return res.status(404).json({
            ok: false,
            mensaje: 'Usuario no encontrado',
          });
        }
    
        // Busca el artículo en el carrito del usuario por su ID y elimínalo
        const index = usuario.favoritos.findIndex((articulo) => articulo.titulo === titulo);
        console.log(usuario.nombre)
        console.log(usuario.favoritos)
        console.log(titulo+titulo)
        console.log(index+"index")
        if (index === -1) {
          return res.status(404).json({
            ok: false,
            mensaje: 'El artículo no se encuentra en el carrito del usuario',
          });
        }
    console.log("usuario.favoritos"+usuario.favoritos)
        usuario.favoritos.splice(index, 1);
       
        // Guarda los cambios en la base de datos
        const usuarioActualizado = await usuario.save();
    
        res.status(200).json({
          ok: true,
          mensaje: 'Artículo eliminado del carrito correctamente',
          usuario: usuarioActualizado,
          token:Token.generaToken(usuarioActualizado),
        });
      } catch (err: any) {
        res.status(500).json({
          ok: false,
          mensaje: 'Error al eliminar el artículo del carrito',
          error: err.message,
        });
      }
    }

      async setEnviado(req: Request, res: Response) {
        console.log("Pasa por aqi¡")
        const email = req.body.email;
        console.log(req.body.email)
        console.log(req.params.email)
      console.log("Paso por aqui")
        // Busca al usuario por su dirección de correo electrónico
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Usuario no encontrado',
            });
          }
        usuario.compras.forEach((compra) => {
          compra.enviado = true;
        });
        usuario.save()
        res.status(200).json({
          ok: true,
          mensaje: 'Se ha cambiado a enviado',
          token: Token.generaToken(usuario),
          usuario: usuario,
        });
      }

      

      async cambiarRolAdmin(req: Request, res: Response) {
        console.log("Paso por aqui+ cambiarRolAdmin")
        try {
          // Obtén el email del usuario desde la solicitud
          const email = req.params.email;
      
          // Busca al usuario por su dirección de correo electrónico
          const usuario = await Usuario.findOne({ email });
          console.log("MetodoEspía:  cambiarRolAdmin" )
          if (!usuario) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Usuario no encontrado',
            });
          }
      
          // Cambia el rol del usuario a 'Admin'
          usuario.rol = 'Admin';
      
          // Guarda los cambios en la base de datos
          const usuarioActualizado = await usuario.save();
      
          res.status(200).json({
            ok: true,
            mensaje: 'Rol del usuario actualizado a Admin',
            usuario: usuarioActualizado,
            token: Token.generaToken(usuarioActualizado)
          });
        } catch (err: any) {
          res.status(500).json({
            ok: false,
            mensaje: 'Error al cambiar el rol del usuario a Admin',
            error: err.message,
          });
        }
      }

      
      
      
      

 
/*
    getDatos(req:Request, res:Response){
        console.log(req.query);
        let usuario=req.query.usuario;
        if(usuario){
        return res.sendStatus(200).json({
            status:"ok",
            message:"El usuario es "+ usuario 
        });
    }else{
        return res.sendStatus(500).json({
            status:"fail",
            message:"no hay usuario"
        });
    }
}

login(req:Request, res:Response){
    console.log(req.body);
    let usuario=req.body.usuario;
    let pwd= req.body.pwd;
    if(usuario){
    return res.status(200).json({
        status:"ok",
        message:"El usuario es "+ usuario 
    });
}else{
    return res.status(500).json({
        status:"fail",
        message:"no hay usuario"
    });
}
}
*/
/*
login(req:Request, res:Response){
    
    let usuarioQueBusco=req.body.usuario;
    let pwd= req.body.pwd;
    Usuario.findOne({usuario:usuarioQueBusco}, null, null,(err, usuarioBD)=>{
        if(err || !usuarioBD){
            return res.status(200).json({
                status:'fail',
                message:'Usuario y/o Contraseña incorrectos'
            });
        }else{
            let pwdBD=usuarioBD.password;
            let usuarioQueMando=new Usuario();
            usuarioQueMando._id=usuarioBD._id
            if(bcrypt.compareSync(pwd,pwdBD)){
                return res.status(200).json({
                    status:'ok',
                    message:'El usuario extiste y es '+ usuarioBD.nombre,
                    token:Token.generaToken(usuarioQueMando)
                });
            }else{

                return res.status(200).json({
                    status:'fail',
                    message:'Usuario y/contraseña incorrecta'
                });
            }


        }


    });


}
*/
newUser(req:Request, res:Response){

    let pwdPlana=req.body.pwd;
    const hash= bcryptjs.hashSync(pwdPlana,10);
   
    
const nuevoUsuario={
    usuario:req.body.usuario,
    email:req.body.email,
    pwd:hash,
    telefono:req.body.telefono
}
Usuario.create(nuevoUsuario,(err,usuarioDB)=>{



    if(err){
        return res.status(500).json({
            status:"fail",
            message:"Error al crear el usuario",
            err
        });
    }else{
        return res.status(200).json({
            status:"ok",
            message:"Usuario creado correctamente ",
            usuarioDB
        });
        
        }
})}






getEmail(req:any, res:Response){
  
    let email=req.body.usuario.email;
    let usuarioQueMando=new Usuario();
    usuarioQueMando=req.body.usuario.usuario;
    usuarioQueMando._id=req.body.usuario._id;
    return res.status(200).json({
        status:'ok',
        message:'el usuario extiste y su email es: '+ email,
        token: Token.generaToken(usuarioQueMando)
    });


}
}
/*
renewToken(req:any, res:Response){
  const id=req.body.usuario._id;
  Usuario.findById(id,(err:any,usuarioBD:any)=>{
    if(err){
        res.status(200).json({
            status:'fail',
            message:'El usuario no existe'
        })
        throw err;
    }
    if(!usuarioBD){
        res.status(200).json({
            status:'fail',
            messge:'el usuario no existe'
        })
    }else{
        let usuarioQueMando=new Usuario();
        usuarioQueMando.email=usuarioBD.email;
        usuarioQueMando._id=usuarioBD._id;
        const token=Token.generaToken(usuarioQueMando)
        res.status(200).json({
            status: 'ok',
            message: 'usuario renovado',
            token
        })
    }
    })
  }

    




}


*/


export default usuarioController


