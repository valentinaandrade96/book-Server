"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./clases/server");
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const usuario_rutas_1 = __importDefault(require("./rutas/usuario.rutas"));
const articulo_rutas_1 = __importDefault(require("./rutas/articulo.rutas"));
const descuento_rutas_1 = __importDefault(require("./rutas/descuento.rutas"));
const compras_rutas_1 = __importDefault(require("./rutas/compras.rutas"));
const miServidor = new server_1.Server();
const url = process.env.MONGO_URL || '';
miServidor.app.use(body_parser_1.default.urlencoded({ limit: '5mb', extended: true }));
miServidor.app.use(body_parser_1.default.json({ limit: '5mb' }));
console.log("url " + url);
miServidor.app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log("error", err);
        throw err;
    }
    else {
        console.log('Conectado a la base de datos');
    }
});
miServidor.app.use('/usuario', usuario_rutas_1.default);
miServidor.app.use('/articulo', articulo_rutas_1.default);
miServidor.app.use('/descuentos', descuento_rutas_1.default);
miServidor.app.use('/compras', compras_rutas_1.default);
miServidor.start(() => {
    console.log('Servidor iniciado en el puerto ' + miServidor.port);
});
