import Router from 'koa-router';
import gameStore from './store';
import {broadcast} from "../utils";

export const router = new Router();

router.get('/', async (ctx) => {
    const response = ctx.response;
    try {
        response.body = await gameStore.find({userId: ctx.state.user.data._id}, 0, 10000);
    }catch(e){
        console.log(e);
    }
    response.status = 200; // ok
});

router.get('/offset=:offset&size=:size', async (ctx) => {
    const response = ctx.response;
    response.body = await gameStore.find({userId: ctx.state.user.data._id}, Number(ctx.params.offset), Number(ctx.params.size));
    response.status = 200; // ok
});

router.get('/:id', async (ctx) => {
    const userId = ctx.state.user.data._id;
    const game = await gameStore.findOne(Number(ctx.params.id));
    const response = ctx.response;
    if (game) {
        if (game.userId === userId) {
            response.body = game;
            response.status = 200; // ok
        } else {
            response.body = {message: "Forbidden"};
            response.status = 403; // forbidden
        }
    } else {
        response.body = {message: "Not Found"};
        response.status = 404; // not found
    }
});

const creategame = async (ctx, game, response) => {
    console.log(ctx.header);
    try {
        const userId = ctx.state.user.data._id;
        game.userId = userId;
        response.body = await gameStore.insert(game);
        response.status = 201; // created
        broadcast(userId, {event: 'created', payload: game});
    } catch (err) {
        response.body = {message: err.message};
        response.status = 400; // bad request
    }
};

router.post('/', async ctx => await creategame(ctx, ctx.request.body, ctx.response));

router.put('/:id', async (ctx) => {
    const game = ctx.request.body;
    const id = Number(ctx.params.id);
    const response = ctx.response;
    const userId = ctx.state.user.data._id;
    game.userId = userId;
    const updatedCount = await gameStore.update(id, game);
    if (updatedCount === 1) {
        response.body = game;
        response.status = 200; // ok
        broadcast(userId, {event: 'updated', payload: game});
    } else {
        response.body = {message: 'Resource no longer exists'};
        response.status = 405; // method not allowed
    }
});

router.del('/:id', async (ctx) => {
    const userId = ctx.state.user.data._id;
    const game = await gameStore.findOne(Number(ctx.params.id));
    console.log(ctx.state.user.data);
    console.log(game);
    if (game) {
        if (userId !== game.userId) {
            ctx.response.body = {message: 'Forbidden'};
            ctx.response.status = 403; // forbidden
        } else {
            await gameStore.remove(Number(ctx.params.id));
            ctx.response.body = game;
            ctx.response.status = 204; // no content
            broadcast(userId, {event: 'deleted', payload: game});
        }
    } else {
        ctx.response.body = {message: 'Resource no longer exists'};
        ctx.response.status = 405;
    }
});
