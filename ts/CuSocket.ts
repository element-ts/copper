/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as WS from "ws";
import * as HTTP from "http";
import {PromReject, PromResolve} from "@elijahjcobb/prom-type";

export class CuSocket {

	private _id: string | undefined;
	private readonly _socket: WS;
	private readonly _originMessage: HTTP.IncomingMessage;

	public constructor(socket: WS, originMessage: HTTP.IncomingMessage) {

		this._socket = socket;
		this._originMessage = originMessage;

	}

	public setId(value: string): void {

		this._id = value;

	}

	public getId(): string {

		if (this._id === undefined) throw new Error("CuSocket does not have an id.");
		return this._id;

	}

	public hasId(): boolean {

		return this._id !== undefined;

	}

	public getHeaders(): HTTP.IncomingHttpHeaders {
		return this._originMessage.headers;
	}

	public getOriginMessage(): HTTP.IncomingMessage {
		return this._originMessage;
	}

	public getBearerToken(): string | undefined {
		const auth: string | undefined = this._originMessage.headers.authorization;
		if (!auth) return undefined;
		return auth.split(" ")[1];
	}

	public send(data: Buffer | object | string): Promise<void> {

		const message: Buffer | undefined = CuSocket.castToBuffer(data);
		if (message === undefined) throw new Error("Could not cast data to buffer.");

		return new Promise(((resolve: PromResolve<void>, reject: PromReject) => {
			this._socket.send(data, (err: Error | undefined) => {
				if (err) reject(err);
				else resolve();
			});
		}));

	}

	public close(): void {
		this._socket.close();
		this._id = undefined;
	}

	private static castToBuffer(data: Buffer | object | string): Buffer | undefined {
		if (Buffer.isBuffer(data)) return data;
		if (typeof data === "string") return Buffer.from(data);
		if (typeof data === "object") return Buffer.from(JSON.stringify(data));
		return;
	}

}
