/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {CuServer} from "./CuServer";
import {CuSocket} from "./CuSocket";

const server: CuServer = new CuServer({port: 8080});

server.onError = async (error: Error): Promise<void> => {

};

server.onConnection = async (socket: CuSocket): Promise<void> => {

};

server.onMessage = async (data: Buffer, socket: CuSocket): Promise<void> => {

};
