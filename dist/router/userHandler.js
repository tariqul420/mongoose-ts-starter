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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = require("../middleware/middleware");
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const router = express_1.default.Router();
const User = mongoose_1.default.model('User', userSchema_1.default);
// get a user role
router.get('/role/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const projection = {
            _id: 0,
            role: 1,
        };
        const result = yield User.findOne({ email }, projection);
        res.send(result);
    }
    catch (err) {
        const error = err;
        res.status(500).send({
            error: 'There was a server-side error',
            details: error.message,
        });
    }
}));
// post a user
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if email already exists
        const existingUser = yield User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({
                error: 'Email already exists',
            });
        }
        // If not, create the new user
        const newUser = new User(req.body);
        yield newUser.save();
        res.status(200).send({
            message: 'User inserted successfully!',
        });
    }
    catch (err) {
        const error = err;
        res.status(500).send({
            error: 'There was a server-side error',
            details: error.message,
        });
    }
}));
// update a user
router.patch('/update/:email', middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const updatedUser = req.body;
        const updateDoc = {
            $set: {
                name: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name,
                photo: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.photo,
            },
        };
        yield User.updateOne({ email }, updateDoc);
        res.status(200).send({
            message: 'User update successfully!',
        });
    }
    catch (err) {
        const error = err;
        res.status(500).send({
            error: 'There was a server-side error',
            details: error.message,
        });
    }
}));
exports.default = router;
