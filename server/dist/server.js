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
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const client_1 = __importDefault(require("./client/client"));
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    if (ctx.method == "OPTIONS") {
        ctx.body = 200;
    }
    else {
        yield next();
    }
}));
router.get("/", (ctx) => {
    ctx.body = "hello,world";
});
router.get("/eduPaperCut", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(ctx.query.image);
    ctx.body = yield client_1.default.eduPaperCut(ctx.query.image);
}));
router.get("/eduPaperStructed", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(ctx.query.image);
    ctx.body = yield client_1.default.eduPaperStructed(ctx.query.image);
}));
router.get("/advanced", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(ctx.query.image);
    ctx.body = yield client_1.default.advanced(ctx.query.image);
}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(9001, function () {
    console.log("server is running");
});
