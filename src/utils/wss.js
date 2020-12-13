import WebSocket from "ws";
import jwt from "jsonwebtoken";
import {jwtConfig} from "./constants";

let wss;

export const initWss = value => {
    wss = value;
    wss.on('connection', ws => {
        ws.on('message', message => {
            const {type, payload: {token}} = JSON.parse(message);
            if (type !== 'authorization') {
                ws.close();
                return;
            }
            try {
                ws.user = jwt.verify(token, jwtConfig.secret);
            } catch (err) {
                ws.close();
            }
        })
    });
};

export const broadcast = (userId, data) => {
    if (!wss) {
        return;
    }
    wss.clients.forEach(client => {
        console.log(client.user);
        if (client.readyState === WebSocket.OPEN && userId === client.user.data._id) {
            console.log(`broadcast sent to ${client.user.data.username}`);
            client.send(JSON.stringify(data));
        }
    });
};
