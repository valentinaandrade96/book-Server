"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_modelo_1 = require("../modelos/usuario.modelo");
const token_1 = __importDefault(require("../clases/token"));
const articulo_modelo_1 = require("../modelos/articulo.modelo");
class usuarioController {
    obtenerTodosLosusuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui obtenerTodosLosusuarios");
            console.log(req.body);
            try {
                const usuarios = yield usuario_modelo_1.Usuario.find();
                res.status(200).json({
                    ok: true,
                    usuarios,
                });
            }
            catch (error) {
                console.error('Error al obtener todos los usuarios', error);
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error interno del servidor',
                });
            }
        });
    }
    get(req, res) {
        console.log("Paso por aqui");
        const usuario = req.usuario;
        console.log("El usuario que entra es: " + usuario);
        res.json({
            ok: true,
            usuario
        });
    }
    ;
    obtenerUsuarioPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui+ obtenerUsuarioPorId");
            const usuario = yield usuario_modelo_1.Usuario.findOne({ email: req.usuario.email || req.body.email }, (err, usuarioDb) => {
                if (err)
                    throw err;
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
            });
        });
    }
    create(req, res) {
        console.log("Paso por aqui+ create");
        const password = bcryptjs_1.default.hashSync(req.body.password, 10);
        const user = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: password,
            nacimiento: req.body.nacimiento,
            sexo: req.body.sexo,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            localidad: req.body.localidad,
            pais: req.body.pais,
            cp: req.body.cp,
            rol: req.body.rol
            /*
            favoritos   : req.body.favoritos,
            carrito:req.body.carrito,
            compras:req.body.compras,
            
            */
        };
        console.log(req.body);
        usuario_modelo_1.Usuario.create(user).then(usuarioDB => {
            const tokenUser = token_1.default.generaToken({
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
                favoritos: usuarioDB.favoritos,
                carrito: usuarioDB.carrito,
                compras: usuarioDB.compras,
                rol: usuarioDB.rol,
                cp: usuarioDB.cp
            });
            if (user) {
                return res.status(200).json({
                    status: 'Ok',
                    message: `El usuario ${usuarioDB.email} ha sido creado correctamente.`,
                    usuarioDb: usuarioDB,
                    token: tokenUser
                });
            }
            else {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No hay usuario'
                });
            }
        });
    }
    ;
    login(req, res) {
        console.log("Paso por aqui login");
        const body = req.body;
        console.log(body);
        usuario_modelo_1.Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
            if (err)
                throw err;
            if (!usuarioDB) {
                return res.json({
                    status: 'fail',
                    mensaje: 'El usuario no existe'
                });
            }
            if (bcryptjs_1.default.compareSync(body.password, usuarioDB.password)) { // Corrección aquí
                const tokenUser = token_1.default.generaToken({
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
                    favoritos: usuarioDB.favoritos,
                    carrito: usuarioDB.carrito,
                    compras: usuarioDB.compras,
                    rol: usuarioDB.rol,
                    cp: usuarioDB.cp
                });
                res.json({
                    ok: true,
                    usuarioDB,
                    token: tokenUser
                });
            }
            else {
                return res.json({
                    status: 'fail',
                    mensaje: 'La contraseña es incorrecta'
                });
            }
        });
    }
    update(req, res) {
        console.log("Paso por aqui+ update");
        console.log("Estamos en el update" + req.usuario);
        console.log(req.params);
        usuario_modelo_1.Usuario.findOne({ email: req.body.email }, (err, usuarioDB) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            usuario_modelo_1.Usuario.findByIdAndUpdate(usuarioDB._id, user, { new: true }, (err, userDB) => {
                if (err)
                    throw err;
                if (!userDB) {
                    return res.json({
                        ok: false,
                        mensaje: 'No existe un usuario con ese ID'
                    });
                }
                const tokenUser = token_1.default.generaToken({
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
                    favoritos: userDB.favoritos,
                    carrito: userDB.carrito,
                    compras: userDB.compras,
                    rol: userDB.rol,
                    cp: userDB.cp
                });
                res.json({
                    ok: true,
                    token: tokenUser,
                    userDB
                });
            });
        }));
    }
    agregarAlCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtén el email del usuario y el título del artículo del cuerpo de la solicitud
                const titulo = typeof req.body.titulo === 'string' ? req.body.titulo : '';
                const email = typeof req.body.email === 'string' ? req.body.email : '';
                const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
                if (!usuario) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado',
                    });
                }
                const libro = yield articulo_modelo_1.Articulo.findOne({ titulo });
                console.log(libro);
                if (!libro) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'El libro no es válido',
                    });
                }
                const elemento = {
                    titulo: libro.titulo,
                    img: libro.img,
                    ISBN: libro.ISBN,
                    precioTotal: libro.precio_venta,
                    enviado: false
                };
                // Agrega el nuevo artículo al array "carrito" del usuario
                usuario.carrito.push(elemento);
                // Guarda los cambios en la base de datos
                const usuarioActualizado = yield usuario.save();
                res.status(200).json({
                    ok: true,
                    mensaje: 'Artículo agregado al carrito correctamente',
                    usuario: usuarioActualizado,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al agregar el artículo al carrito',
                    error: err.message,
                });
            }
        });
    }
    obtenerIdPorEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui+ obtenerIdPorEmail");
            try {
                // Obtén la dirección de correo electrónico desde la solicitud
                const email = req.params.email;
                // Busca al usuario por su dirección de correo electrónico
                const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
                console.log("MetodoEspía: obtenerIdPorEmail ");
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
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener el ID del usuario',
                    error: err.message,
                });
            }
        });
    }
    obtenerRolPorEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui+ obtenerRolPorEmail");
            try {
                // Obtén la dirección de correo electrónico desde la solicitud
                const email = req.params.email;
                // Busca al usuario por su dirección de correo electrónico
                const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
                console.log("MetodoEspía: obtenerRolPorEmail");
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
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener el rol del usuario',
                    error: err.message,
                });
            }
        });
    }
    cambiarContrasena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui+ cambiarContrasena");
            try {
                // Obtén el ID del usuario y las contraseñas desde la solicitud
                const { email, contrasenaActual, nuevaContrasena } = req.body;
                console.log("email " + email + " contrasenaActual " + contrasenaActual + " nuevaContrasena " + nuevaContrasena);
                // Busca al usuario por su ID
                const userDB = yield usuario_modelo_1.Usuario.findOne({ email });
                if (!userDB) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado',
                    });
                }
                const nuevaContrasenaValida = yield bcryptjs_1.default.compare(nuevaContrasena, userDB.password);
                if (nuevaContrasenaValida) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'La nueva contraseña debe ser diferente a la actual',
                    });
                }
                // Verifica que la contraseña actual sea correcta
                const contrasenaValida = yield bcryptjs_1.default.compare(contrasenaActual, userDB.password);
                if (!contrasenaValida) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Contraseña actual incorrecta',
                    });
                }
                // Encripta la nueva contraseña
                const nuevaContrasenaEncriptada = yield bcryptjs_1.default.hash(nuevaContrasena, 10);
                // Actualiza la contraseña del usuario en la base de datos
                userDB.password = nuevaContrasenaEncriptada;
                yield userDB.save();
                const tokenUser = token_1.default.generaToken({
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
                    favoritos: userDB.favoritos,
                    carrito: userDB.carrito,
                    compras: userDB.compras,
                    rol: userDB.rol,
                    cp: userDB.cp
                });
                res.status(200).json({
                    ok: true,
                    token: tokenUser,
                    usuario: userDB
                });
            }
            catch (err) {
                console.error('Error al cambiar la contraseña:', err);
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error interno del servidor',
                });
            }
        });
    }
    eliminarDelCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui+ eliminarDelCarrito");
            try {
                const titulo = req.body.titulo;
                const email = req.body.email;
                console.log(email);
                const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
                console.log("MetodoEspía:  eliminarDelCarrito");
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
                const usuarioActualizado = yield usuario.save();
                res.status(200).json({
                    ok: true,
                    mensaje: 'Artículo eliminado del carrito correctamente',
                    usuario: usuarioActualizado,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al eliminar el artículo del carrito',
                    error: err.message,
                });
            }
        });
    }
    moverCarritoACompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui+ moverCarritoACompra");
            const email = req.body.email;
            console.log(email);
            try {
                // Buscar al usuario por su email
                const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
                console.log(usuario);
                if (!usuario) {
                    return {
                        ok: false,
                        mensaje: 'Usuario no encontrado',
                    };
                }
                // Actualizar el array de compras con los nuevos elementos y vaciar el carrito
                usuario.carrito.forEach((articulo) => {
                    const index = usuario.carrito.findIndex((item) => item === articulo); // Encuentra el índice del artículo
                    if (index !== -1) {
                        usuario.compras.push(articulo); // Agrega el artículo a la lista de compras
                        usuario.carrito.splice(index, 1); // Elimina el artículo del carrito
                    }
                });
                //usuario.carrito =[{}];
                // Guardar los cambios en la base de datos
                yield usuario.save();
                return {
                    ok: true,
                    mensaje: 'Carrito movido a compras correctamente',
                    usuario: usuario,
                };
            }
            catch (err) {
                return {
                    ok: false,
                    mensaje: 'Error al mover el carrito a compras',
                    error: err.message,
                };
            }
        });
    }
    agregarAFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("empieza agregar a favs");
            try {
                // Obtén el email del usuario y el título del artículo del cuerpo de la solicitud
                const titulo = typeof req.body.titulo === 'string' ? req.body.titulo : '';
                const email = typeof req.body.email === 'string' ? req.body.email : '';
                console.log(email + "  " + titulo);
                const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
                console.log(usuario);
                if (!usuario) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado',
                    });
                }
                const libro = yield articulo_modelo_1.Articulo.findOne({ titulo });
                console.log(libro);
                if (!libro) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'El libro no es válido',
                    });
                }
                const elemento = {
                    titulo: libro.titulo,
                    img: libro.img,
                    ISBN: libro.ISBN,
                    enviado: false
                };
                console.log("elemento" + elemento);
                // Agrega el nuevo artículo al array "carrito" del usuario
                usuario.favoritos.push(elemento);
                console.log("elemento" + usuario.favoritos);
                // Guarda los cambios en la base de datos
                const usuarioActualizado = yield usuario.save();
                //console.log("usuarioActualizado"+usuarioActualizado.titulo)
                res.status(200).json({
                    ok: true,
                    mensaje: 'Artículo agregado a favoritos correctamente',
                    token: token_1.default.generaToken(usuarioActualizado),
                    usuario: usuarioActualizado
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al agregar a favoritos al carrito',
                    error: err.message,
                });
            }
        });
    }
    eliminarDeFavoritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui+ eliminarDeFavoritos");
            try {
                const titulo = req.body.titulo;
                const email = req.body.email;
                console.log(email);
                console.log(titulo);
                const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
                if (!usuario) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado',
                    });
                }
                // Busca el artículo en el carrito del usuario por su ID y elimínalo
                const index = usuario.favoritos.findIndex((articulo) => articulo.titulo === titulo);
                console.log(usuario.nombre);
                console.log(usuario.favoritos);
                console.log(titulo + titulo);
                console.log(index + "index");
                if (index === -1) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'El artículo no se encuentra en el carrito del usuario',
                    });
                }
                console.log("usuario.favoritos" + usuario.favoritos);
                usuario.favoritos.splice(index, 1);
                console.log("usuario.favoritos after eiminar" + usuario.favoritos);
                // Guarda los cambios en la base de datos
                const usuarioActualizado = yield usuario.save();
                res.status(200).json({
                    ok: true,
                    mensaje: 'Artículo eliminado del carrito correctamente',
                    usuario: usuarioActualizado,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al eliminar el artículo del carrito',
                    error: err.message,
                });
            }
        });
    }
    setEnviado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Pasa por aqi¡");
            const email = req.body.email;
            console.log(req.body.email);
            console.log(req.params.email);
            console.log("Paso por aqui");
            // Busca al usuario por su dirección de correo electrónico
            const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
            if (!usuario) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Usuario no encontrado',
                });
            }
            usuario.compras.forEach((compra) => {
                compra.enviado = true;
            });
            usuario.save();
            res.status(200).json({
                ok: true,
                mensaje: 'Se ha cambiado a enviado',
                //token: Token.generaToken(usuario),
                usuario: usuario,
            });
        });
    }
    cambiarRolAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Paso por aqui+ cambiarRolAdmin");
            try {
                // Obtén el email del usuario desde la solicitud
                const email = req.params.email;
                // Busca al usuario por su dirección de correo electrónico
                const usuario = yield usuario_modelo_1.Usuario.findOne({ email });
                console.log("MetodoEspía:  cambiarRolAdmin");
                if (!usuario) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado',
                    });
                }
                // Cambia el rol del usuario a 'Admin'
                usuario.rol = 'Admin';
                // Guarda los cambios en la base de datos
                const usuarioActualizado = yield usuario.save();
                res.status(200).json({
                    ok: true,
                    mensaje: 'Rol del usuario actualizado a Admin',
                    usuario: usuarioActualizado,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cambiar el rol del usuario a Admin',
                    error: err.message,
                });
            }
        });
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
    newUser(req, res) {
        let pwdPlana = req.body.pwd;
        const hash = bcrypt.hashSync(pwdPlana, 10);
        const nuevoUsuario = {
            usuario: req.body.usuario,
            email: req.body.email,
            pwd: hash,
            telefono: req.body.telefono
        };
        usuario_modelo_1.Usuario.create(nuevoUsuario, (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    status: "fail",
                    message: "Error al crear el usuario",
                    err
                });
            }
            else {
                return res.status(200).json({
                    status: "ok",
                    message: "Usuario creado correctamente ",
                    usuarioDB
                });
            }
        });
    }
    getEmail(req, res) {
        let email = req.body.usuario.email;
        let usuarioQueMando = new usuario_modelo_1.Usuario();
        usuarioQueMando = req.body.usuario.usuario;
        usuarioQueMando._id = req.body.usuario._id;
        return res.status(200).json({
            status: 'ok',
            message: 'el usuario extiste y su email es: ' + email,
            token: token_1.default.generaToken(usuarioQueMando)
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
exports.default = usuarioController;
