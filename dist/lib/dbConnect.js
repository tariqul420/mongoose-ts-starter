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
const mongoose_1 = __importDefault(require("mongoose"));
// Using a simpler approach with a type declaration for global
const mongooseGlobal = global;
const cached = mongooseGlobal.mongoose || { conn: null, promise: null };
if (!mongooseGlobal.mongoose) {
    mongooseGlobal.mongoose = cached;
}
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const MONGODB_URI = (_a = process.env.MONGODB_DATABASE_URL) === null || _a === void 0 ? void 0 : _a.replace('<db_password>', process.env.MONGODB_DATABASE_PASSWORD || '');
        if (!MONGODB_URI) {
            throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
        }
        if (cached.conn) {
            return cached.conn;
        }
        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };
            cached.promise = mongoose_1.default.connect(MONGODB_URI, opts).then((mong) => {
                return mong;
            });
        }
        try {
            cached.conn = yield cached.promise;
        }
        catch (e) {
            cached.promise = null;
            throw e;
        }
        return cached.conn;
    });
}
exports.default = dbConnect;
