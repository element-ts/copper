/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as Crypto from "crypto";
import {CuSocket} from "./CuSocket";

export class CuConnectionManager {

	private _map: Map<string, CuSocket>;

	public constructor() {

		this._map = new Map<string, CuSocket>();

	}

	public add(socket: CuSocket): string {

		let id: string = Crypto.randomBytes(16).toString("hex");
		while (this._map.has(id)) id = Crypto.randomBytes(16).toString("hex");
		this._map.set(id, socket);
		socket.setId(id);

		return id;

	}

	public get(id: string): CuSocket | undefined {
		return this._map.get(id);
	}

	public remove(id: string): void {
		this._map.delete(id);
	}

	public connections(): IterableIterator<CuSocket> {
		return this._map.values();
	}

	public size(): number {
		return this._map.size;
	}

}
