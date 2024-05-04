"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const employee_1 = __importDefault(require("./routes/employee"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/ping", (_req, res) => {
    console.log("someone ping here!!");
    res.send("pong");
});
app.use("/api/employee", employee_1.default);
app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
});
