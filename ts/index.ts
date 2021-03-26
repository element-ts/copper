/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as express from "express";
import * as mongodb from "mongodb";
import {OStandardType, OType} from "@element-ts/oxygen";

const app = express();

// Create new object in collection.
app.post("/*", async (req, res) => {
	res.send(req.params[0]);
});

// Query object in collection/
app.get("/*", async (req, res) => {

});

app.listen(3000);

class CuType {
	private value: number;
	public static readonly string: CuType = new CuType(0);
	public static readonly number: CuType = new CuType(1);
	public static readonly boolean: CuType = new CuType(2);
	private constructor(value: number) { this.value = value; }
}

interface Meta {
	id: string;
	updatedAt: number;
	createdAt: number;
	ownerId: string;
}

interface Req {

}

class Collection<T = any> {
	private constructor() {}

	public string(name: string, required: boolean = false, defaultValue: string = ""): Collection<T> { return this; }
	public number(name: string, required: boolean = false, defaultValue: number = 0): Collection<T> { return this; }
	public boolean(name: string, required: boolean = false, defaultValue: boolean = false): Collection<T> { return this; }
	public list(name: string, type: CuType): Collection<T> { return this; }

	public auth(auth: Auth): Collection<T> { return this; }

	public beforeCreate(handler: (doc: T, req: Req) => void): Collection<T> { return this; }
	public afterCreate(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }
	public beforeUpdate(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }
	public afterUpdate(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }
	public beforeDelete(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }
	public afterDelete(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }

	public static init<T = any>(value: string): Collection<T> {return new Collection<T>(); }
}

class Copper {

	private constructor() {}

	public server(port: number): Copper {
		return this;
	}

	public database(host: string, port: number, database: string): Copper {
		return this;
	}

	public defaultAuth(auth: Auth): Copper { return this; }

	public collection(collection: Collection): Copper {return this; }

	public start(): void {}

	public static init(): Copper {
		return new Copper();
	}
}

class Auth {

	private constructor() {

	}

	public publicQuery(): Auth { return this; }
	public publicFetch(): Auth { return this; }
	public publicRead(): Auth { return this; }
	public publicWrite(): Auth { return this; }
	public publicCreate(): Auth { return this; }
	public publicUpdate(): Auth { return this; }
	public publicDelete(): Auth { return this; }

	public authenticated(): Auth { return this; }
	public authenticatedQuery(): Auth { return this; }
	public authenticatedFetch(): Auth { return this; }
	public authenticatedRead(): Auth { return this; }
	public authenticatedWrite(): Auth { return this; }
	public authenticatedCreate(): Auth { return this; }
	public authenticatedUpdate(): Auth { return this; }
	public authenticatedDelete(): Auth { return this; }

	public admin(): Auth { return this; }
	public adminQuery(): Auth { return this; }
	public adminFetch(): Auth { return this; }
	public adminRead(): Auth { return this; }
	public adminWrite(): Auth { return this; }
	public adminCreate(): Auth { return this; }
	public adminUpdate(): Auth { return this; }
	public adminDelete(): Auth { return this; }

	public owner(): Auth { return this; }
	public ownerQuery(): Auth { return this; }
	public ownerFetch(): Auth { return this; }
	public ownerRead(): Auth { return this; }
	public ownerWrite(): Auth { return this; }
	public ownerCreate(): Auth { return this; }
	public ownerUpdate(): Auth { return this; }
	public ownerDelete(): Auth { return this; }

	public no(): Auth { return this; }
	public noQuery(): Auth { return this; }
	public noFetch(): Auth { return this; }
	public noRead(): Auth { return this; }
	public noWrite(): Auth { return this; }
	public noCreate(): Auth { return this; }
	public noUpdate(): Auth { return this; }
	public noDelete(): Auth { return this; }

	public reset(): Auth { return this; }

	public static init(): Auth { return new Auth(); }
}

Copper
	.init()
	.server(3000)
	.database("localhost", 27017, "CopperTest")
	.defaultAuth(
		Auth
			.init()
			.admin()
	)
	.collection(
		Collection
			.init<string>("User")
			.string("firstName")
			.string("lastName")
			.string("email", true)
			.number("age")
			.boolean("isAdmin", false, false)
			.list("favoriteBooks", CuType.string)
			.beforeCreate((doc, req) => {
				console.log("Will be created!");
			})
			.afterCreate((doc, meta, req) => {
				console.log(meta.id + " created!");
			})
			.beforeUpdate((doc, meta, req) => {
				console.log("Will be updated!");
			})
			.afterUpdate((doc, meta, req) => {
				console.log("Was updated!");
			})
			.beforeDelete((doc, meta, req) => {
				console.log("Will be deleted!");
			})
			.afterDelete((doc, meta, req) => {
				console.log("Will be deleted!");
			})
			.auth(
				Auth
					.init()
					.publicCreate()
					.admin()
					.owner()
			)
	)
	.collection(
		Collection
			.init<string>("Message")
			.string("fromId", true)
			.string("content", true)
			.list("to", CuType.string)
			.beforeCreate((doc, req) => {
				console.log("Will be created!");
			})
			.afterCreate((doc, meta, req) => {
				console.log(meta.id + " created!");
			})
			.beforeUpdate((doc, meta, req) => {
				console.log("Will be updated!");
			})
			.afterUpdate((doc, meta, req) => {
				console.log("Was updated!");
			})
			.beforeDelete((doc, meta, req) => {
				console.log("Will be deleted!");
			})
			.afterDelete((doc, meta, req) => {
				console.log("Will be deleted!");
			})
	)
	.start();
