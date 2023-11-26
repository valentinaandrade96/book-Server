"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.port = parseInt(process.env.PORT || '3300');
        this.app = (0, express_1.default)();
    }
    start(callback) {
        this.app.listen(this.port, callback);
    }
}
exports.Server = Server;
