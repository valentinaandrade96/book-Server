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
exports.verificaToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const usuario_modelo_1 = require("../modelos/usuario.modelo"); // Asegúrate de importar tu modelo de Usuario aquí
dotenv_1.default.config();
const verificaToken = (req, res, next) => {
    // Obtener el token del encabezado 'x-token'
    const token = req.header('x-token');
    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no proporcionado',
        });
    }
    // Verificar el token
    jsonwebtoken_1.default.verify(token, process.env.CLAVE_SECRETA || '', (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no válido',
            });
        }
        try {
            // Buscar al usuario en la base de datos utilizando el ID del token decodificado
            const usuario = yield usuario_modelo_1.Usuario.findById(decoded.usuario._id);
            if (!usuario) {
                return res.status(401).json({
                    ok: false,
                    mensaje: 'Usuario no encontrado',
                });
            }
            // Si la verificación es exitosa, el usuario está autenticado
            req.body.usuario = usuario;
            next();
        }
        catch (error) {
            console.error('Error al buscar usuario en la base de datos:', error);
            return res.status(500).json({
                ok: false,
                mensaje: 'Error interno del servidor',
            });
        }
    }));
};
exports.verificaToken = verificaToken;
