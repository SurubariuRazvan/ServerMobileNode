import Koa from 'koa';
import WebSocket from 'ws';
import Router from 'koa-router';
import bodyParser from "koa-bodyparser";
import {exceptionHandler, initWss, jwtConfig, timingLogger} from './utils';
import {router as gameRouter} from './games';
import {router as authRouter} from './auth';
import jwt from 'koa-jwt';
import cors from '@koa/cors';
import * as path from "path";
import * as http from "http";
import * as https from "https";

const fs = require('fs');

const privateKey = fs.readFileSync(path.join(__dirname, './credentials') + "/privkey.pem", 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, './credentials') + "/cert.pem", 'utf8');
const ca = fs.readFileSync(path.join(__dirname, './credentials') + "/chain.pem", 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const appHttp = new Koa();
const app = new Koa();
const serverHttp = http.createServer(appHttp.callback());
const server = https.createServer(credentials, app.callback());
// const server = http.createServer(app.callback());
const wss = new WebSocket.Server({server});
initWss(wss);

appHttp.use(cors());
appHttp.use(timingLogger);
appHttp.use(exceptionHandler);
appHttp.use(bodyParser());

const publicHttp = new Router();
publicHttp.all('*', (ctx) => {
    ctx.response.status = 301;
    console.log(JSON.stringify(ctx.path));
    ctx.response.redirect('https://jderu.cf' + ctx.path);
})
appHttp.use(publicHttp.routes())
serverHttp.listen(80);
console.log('started on port 80');

app.use(cors());
app.use(timingLogger);
app.use(exceptionHandler);
app.use(bodyParser());

const prefix = '/api';

// public
const publicApiRouter = new Router({prefix});
publicApiRouter
    .use('/auth', authRouter.routes());
app
    .use(publicApiRouter.routes())
    .use(publicApiRouter.allowedMethods());

app.use(jwt(jwtConfig));

// protected
const protectedApiRouter = new Router({prefix});
protectedApiRouter
    .use('/games', gameRouter.routes());

app
    .use(protectedApiRouter.routes())
    .use(protectedApiRouter.allowedMethods());

server.listen(3000);
console.log('started on port 3000');

