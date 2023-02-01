import Koa from "koa";
import Router from "koa-router";
import Client from "./client/client";

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

router.get("/", (ctx) => {
  ctx.body = "hello,world";
});

router.get("/eduPaperCut", async (ctx, next) => {
  // console.log(ctx.query.image);
  ctx.body = await Client.eduPaperCut(ctx.query.image);
});

router.get("/eduPaperStructed", async (ctx, next) => {
  // console.log(ctx.query.image);
  ctx.body = await Client.eduPaperStructed(ctx.query.image);
});

router.get("/advanced", async (ctx, next) => {
  // console.log(ctx.query.image);
  ctx.body = await Client.advanced(ctx.query.image);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(9001, function () {
  console.log("server is running");
  
});
