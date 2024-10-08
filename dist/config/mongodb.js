"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://errahulsingh1282:c$9589345197@cluster0.uxtyn0i.mongodb.net/Project_Management_App?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
    console.log("connected to db...");
})
    .catch((err) => {
    console.log(err);
});
