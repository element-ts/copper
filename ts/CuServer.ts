/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as WS from "ws";
import * as HTTP from "http";
import {CuSocket} from "./CuSocket";
import {CuConnectionManager} from "./CuConnectionManager";
import {Neon} from "@element-ts/neon";
import {PromResolve} from "@elijahjcobb/prom-type";

export interface CuServerOptions {
	debug?: boolean;
}

export class CuServer {

	private _logger: Neon;
	private _server: WS.Server;
	private _connections: CuConnectionManager;
	public onMessage: ((data: Buffer, socket: CuSocket) => Promise<void>) | undefined;
	public onConnection: ((socket: CuSocket) => Promise<void>) | undefined;
	public onError: ((error: Error) => Promise<void>) | undefined;

	public constructor(config?: WS.ServerOptions & CuServerOptions) {

		this._logger = new Neon();
		this._connections = new CuConnectionManager();
		this._server = new WS.Server(config);
		this._server.on("connection", this.handleConnection.bind(this));
		this._server.on("error", this.handleError.bind(this));

	}

	private handleConnection(connection: WS, headers: HTTP.IncomingMessage): void {

		const socket: CuSocket = new CuSocket(connection, headers);
		const id: string = this._connections.add(socket);
		connection.on("close", (): void => this._connections.remove(id));
		if (this.onConnection) this.onConnection(socket).catch(this.handleError);
		connection.on("message", (data: WS.Data): void => this.handleMessage(data, socket));

	}

	private handleMessage(data: WS.Data, socket: CuSocket): void {

		const message: Buffer | undefined = CuServer.castIncomingMessage(data);
		if (!message) return this.handleError(new Error("Could not cast incoming message to a Buffer."));
		if (this.onMessage) this.onMessage(message, socket).catch(this.handleError);

	}

	private handleError(error: Error): void {

		this._logger.err(error);
		if (this.onError) this.onError(error).catch(this._logger.err);

	}

	public close(): void {
		for (const socket of this.connections()) socket.close();
		this._server.close();
	}

	public kill(socketId: string): void;
	public kill(socket: CuSocket): void;
	public kill(value: string | CuSocket): void {
		const socket: CuSocket | undefined = (value instanceof CuSocket) ? value : this._connections.get(value);
		if (socket === undefined) return;
		this._connections.remove(socket.getId());
		socket.close();
	}

	public broadcast(data: Buffer | object | string): Promise<void> {
		return new Promise<void>(((resolve: PromResolve<void>): void => {

			const size1: number = this._connections.size();
			const iter: IterableIterator<CuSocket> = this._connections.connections();
			const size2: number = this._connections.size();
			let size: number = size2;
			if (size2 !== size1) size = (size1 < size2) ? size1 : size2;

			let i: number = 0;
			for (const socket of iter) {

				socket.send(data).then((): void => {
					i++;
					if (i === size) resolve();
				});

			}

		}));
	}

	public connections(): IterableIterator<CuSocket> {
		return this._connections.connections();
	}

	public connectionCount(): number {
		return this._connections.size();
	}

	private static castIncomingMessage(data: WS.Data): Buffer | undefined {
		if (Buffer.isBuffer(data)) return data;
		if (typeof data === "string") return Buffer.from(data);
		return undefined;
	}

}
