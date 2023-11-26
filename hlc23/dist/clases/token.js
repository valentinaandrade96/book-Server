"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() {
    }
    static generaToken(payLoad) {
        return jsonwebtoken_1.default.sign({
            usuario: payLoad
        }, Token.claveSecreta, {
            expiresIn: Token.caducidad
        });
    }
    static compareToken(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, Token.claveSecreta, (err, decoded) => {
                if (err) {
                    if (err.name == 'TokenExpiredError') {
                        reject('Sesión caducada');
                    }
                    else {
                        resolve('token invalido');
                    }
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
Token.data = dotenv_1.default.config();
Token.claveSecreta = Token.data.parsed.CLAVE_SECRETA;
Token.caducidad = '1y';
exports.default = Token;
