"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importStar(require("body-parser"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const rootRouter_1 = __importDefault(require("./routes/rootRouter"));
const error_handlers_1 = require("./middleware/error-handlers");
const not_found_error_1 = require("./errors/not-found-error");
const app = (0, express_1.default)();
exports.app = app;
const whitelist = [
    "http://localhost:3012",
    "http://localhost:3011",
    "https://supervised-client.vercel.app",
    "https://supervised-client.vercel.app/",
    "https://supervised-prod.vercel.app/auth",
    "https://supervised-prod.vercel.app/",
    "http://localhost:3013"
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};
// io.on("connection", (socket: any) => {
//   console.log("A user connected");
//   socket.on("eventName", (data: any) => {
//     console.log("Received data:", data);
//   });
// });
app.use("public/uploads/documents", express_1.default.static("public/uploads/documents"));
app.use("uploads/docs", express_1.default.static("uploads/docs"));
app.use((0, cors_1.default)(corsOptions));
app.set("trust proxy", true);
app.use(body_parser_1.default.json());
app.use((0, body_parser_1.json)());
// app.use(
//   cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
// );
app.use(rootRouter_1.default);
app.all("*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(new not_found_error_1.NotFoundError());
}));
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new not_found_error_1.NotFoundError();
}));
app.use(error_handlers_1.errorHandler);
//# sourceMappingURL=app.js.map