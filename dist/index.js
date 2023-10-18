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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const __CONSTANTS__1 = require("./__CONSTANTS__");
const mongodb_1 = require("mongodb");
const port = 6001;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_KEY) {
        throw new Error("jwt key dose not exist");
    }
    try {
        const client = yield new mongodb_1.MongoClient(__CONSTANTS__1.MONGO_URI);
        yield client.connect();
    }
    catch (error) {
        console.error("Stufff", error);
    }
    app_1.app.listen(port, () => {
        console.log(`Main Route on ${port}!!!!`);
    });
});
start();
//# sourceMappingURL=index.js.map