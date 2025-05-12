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
exports.verifyAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const User = mongoose_1.default.model('User', userSchema_1.default);
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }
    // Verify Token
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (error, decoded) => {
        if (error) {
            return res.status(401).send({ error: 'Unauthorized access' });
        }
        req.user = decoded;
        next();
    });
});
exports.verifyToken = verifyToken;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    if (!email) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }
    try {
        const user = yield User.findOne({ email });
        const isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin';
        if (!user || !isAdmin) {
            return res.status(403).send({ message: 'Forbidden access. Only admins have access!' });
        }
        next();
    }
    catch (err) {
        const error = err;
        return res.status(500).send({ error: 'Server error', details: error.message });
    }
});
exports.verifyAdmin = verifyAdmin;
