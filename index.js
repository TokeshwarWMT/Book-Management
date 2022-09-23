"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_1 = __importDefault(require("./routes/route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', route_1.default);
let uri = process.env.MONGODB_URL;
try {
    mongoose_1.default.connect(uri)
        .then(() => console.log('MongoDB connection successful..'))
        .catch(error => console.log(error));
}
catch (error) {
    console.log(error);
}
;
app.listen(process.env.PORT, () => {
    console.log(`Express App is running on ${process.env.PORT}`);
});
