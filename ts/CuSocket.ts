/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as WS from "ws";
import * as HTTP from "http";

export class CuSocket {

	private _id: string | undefined;
	private _socket: WS;
	private _headers: HTTP.IncomingMessage;

	public constructor(socket: WS, headers: HTTP.IncomingMessage) {

		this._socket = socket;
		this._headers = headers;


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

	public async send(data: Buffer | object | string): Promise<void> {

	}

}
