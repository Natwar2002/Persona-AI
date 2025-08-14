import express from "express";
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import ExpertAI from "./config/geminiCongif.js";
import { Hitesh_Choudhary, Piyush_Garg } from "./config/persona.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket, io) => {
    socket.on('MessageFromClient', async (data) => {
        try {
            let person = data.expert === "hitesh" ? Hitesh_Choudhary : Piyush_Garg;

            const response = await ExpertAI(person, data.content);
            const res = JSON.parse(response);

            socket.emit('MessageFromServer', {
                expert: data?.expert,
                content: res?.response
            });
        } catch (error) {
            console.log(error);
            socket.emit('MessageFromServer', {
                expert: data?.expert,
                content: "Something went wrong..."
            });
        }
    });
})

server.listen(3000, async () => {
    try {
        console.log('server is running on port http://localhost:3000');
    } catch (error) {
        console.log('Error', error);
    }
})