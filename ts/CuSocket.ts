/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as WS from "ws";
import * as HTTP from "http";
import {PromReject, PromResolve} from "@elijahjcobb/prom-type";

export enum CuSocketConnectionState {
	CONNECTING,
	OPEN,
	CLOSING,
	CLOSED
}

export class CuSocket {

	private readonly _id: string;
	private readonly _socket: WS;
	private readonly _originMessage: HTTP.IncomingMessage;

	public constructor(socket: WS, id: string, originMessage: HTTP.IncomingMessage) {

		this._socket = socket;
		this._id = id;
		this._originMessage = originMessage;

	}

	public getId(): string {

		return this._id;

	}

	public getHeaders(): HTTP.IncomingHttpHeaders {
		return this._originMessage.headers;
	}

	public getOriginMessage(): HTTP.IncomingMessage {
		return this._originMessage;
	}

	public getProtocol(): string | undefined {

		const protocol: string[] | string | undefined = this._originMessage.headers["sec-webSocket-protocol"];
		if (!protocol) return undefined;
		if (typeof protocol === "string") return protocol;

		return protocol[0];

	}

	public getConnectionState(): CuSocketConnectionState {

		return this._socket.OPEN;

	}

	public isOpen(): boolean {

		return this.getConnectionState() === CuSocketConnectionState.OPEN;

	}

	public send(data: Buffer | object | string): Promise<void> {

		if (!this.isOpen()) throw new Error("Socket is not open. Please wait until socket is open.");
		const message: Buffer | undefined = CuSocket.castToBuffer(data);
		if (message === undefined) throw new Error("Could not cast data to buffer.");

		return new Promise((resolve: PromResolve<void>, reject: PromReject): void => {
			this._socket.send(data, (err: Error | undefined) => {
				if (err) reject(err);
				else resolve();
			});
		});

	}

	public close(): void {
		this._socket.close();
	}

	private static castToBuffer(data: Buffer | object | string): Buffer | undefined {

		if (Buffer.isBuffer(data)) return data;
		if (typeof data === "string") return Buffer.from(data);
		if (typeof data === "object") return Buffer.from(JSON.stringify(data));

		return;

	}

}
