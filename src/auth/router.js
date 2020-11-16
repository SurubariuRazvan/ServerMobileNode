import Router from 'koa-router';
import userStore from './store';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../utils';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export const router = new Router();

const createToken = (user) => {
    return jwt.sign({
        "data": {
            "username": user.username,
            "_id": user._id
        }
    }, jwtConfig.secret, {expiresIn: 1000 * 60 * 60});
};

router.post('/signup', async (ctx) => {
    const user = ctx.request.body;
    const response = ctx.response;
    try {
        user.password = await bcrypt.hash(user.password, saltRounds);
        response.body = {token: createToken(await userStore.insert(user))};
        response.status = 201; // created
    } catch (err) {
        response.body = {issue: [{error: err.message}]};
        response.status = 400; // bad request
    }
});

router.post('/login', async (ctx) => {
    const credentials = ctx.request.body;
    const response = ctx.response;
    const user = await userStore.findOne(credentials.username);
    if (await bcrypt.compare(credentials.password, user.password)) {
        response.body = {token: createToken(user), _id: user._id};
        response.status = 201; // created
    } else {
        response.body = {issue: [{error: 'Invalid credentials'}]};
        response.status = 400; // bad request
    }
});


