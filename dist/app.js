"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 2050;
app.get("/", (req, res) => {
    res.send("Hit the home page, homie :)");
});
app.listen(port, err => {
    if (err) {
        console.error(err);
    }
    console.log(`Listening @ http://localhost:${port} 🚪`);
});
//# sourceMappingURL=app.js.map