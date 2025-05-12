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
// const mongoose = require('mongoose');
// import mongoose from 'mongoose';
// const express = require('express');
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// const cors = require('cors');
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
const morgan_1 = __importDefault(require("morgan"));
// const jwt = require('jsonwebtoken');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userHandler_1 = __importDefault(require("./router/userHandler"));
// const userHandler = require('./router/userHandler');
const dbConnect_1 = __importDefault(require("./lib/dbConnect"));
// const dbConnect = require('./lib/dbConnect');
// Express app initialization
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
// Middleware
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
// Connect to MongoDB
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, dbConnect_1.default)();
            // Start the server after successful DB connection
            app.listen(port, () => {
                console.log(`☘️  You successfully connected to Server: ${port}`);
            });
        }
        catch (err) {
            console.error('Failed to start server:', err);
            process.exit(1); // Exit if DB connection fails
        }
    });
}
startServer();
// Create a JWT token
app.post('/jwt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const token = jsonwebtoken_1.default.sign(userInfo, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '1d' });
        res
            .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
            .send({ success: true });
    }
    catch (err) {
        const error = err;
        res.status(500).send({
            error: 'There was a server-side error',
            details: error.message,
        });
    }
}));
// Logout route
app.get('/logout', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        })
            .send({ success: true });
    }
    catch (err) {
        const error = err;
        res.status(500).send({
            error: 'There was a server-side error',
            details: error.message,
        });
    }
}));
// Application routes
app.use('/user', userHandler_1.default);
// Default route
app.get('/', (_req, res) => {
    res.send('This Server For MyAwesomeApp Website ❤️');
});
