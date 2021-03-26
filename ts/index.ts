/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as express from "express";
import * as mongodb from "mongodb";
import {OObjectTypeDefinition, OStandardType, OType} from "@element-ts/oxygen";

const app = express();

// Create new object in collection.
app.post("/*", async (req, res) => {
	res.send(req.params[0]);
});

// Query object in collection/
app.get("/*", async (req, res) => {

});

app.listen(3000);

interface Meta {
	id: string;
	updatedAt: number;
	createdAt: number;
	ownerId: string;
}

interface Req {

}

class DataStore {
	private constructor() {}
	public limit(bytes: number): DataStore { return this; }
	public auth(auth: Auth): DataStore { return this; }
	public beforeSave(): DataStore { return this; }
	public afterSave(): DataStore { return this; }
	public beforeFetch(): DataStore { return this; }
	public afterFetch(): DataStore { return this; }
	public beforeDelete(): DataStore { return this; }
	public afterDelete(): DataStore { return this; }
	public static init(path: string): DataStore { return new DataStore(); }
}

class CopperServer {

	private constructor() {}

	public server(port: number): CopperServer {
		return this;
	}

	public database(host: string, port: number, database: string): CopperServer {
		return this;
	}

	public enableAnonymousSession(): CopperServer { return this; }

	public defaultAuth(auth: Auth): CopperServer { return this; }

	public collection(collection: Collection): CopperServer {return this; }

	public cloudFunction(cloudFunction: CloudFunction<any, any>): CopperServer { return this; }

	public dataStore(dataStore: DataStore): CopperServer { return this; }

	public start(): void {}

	public groups(...groups: Group[]): CopperServer { return this; }

	public static init(port: number): CopperServer {
		return new CopperServer();
	}
}

class Auth {

	private constructor() {

	}

	public publicQuery(): Auth { return this; }
	public publicFetch(): Auth { return this; }
	public publicRead(): Auth { return this; }

	public anonymous(): Auth { return this; }
	public anonymousQuery(): Auth { return this; }
	public anonymousFetch(): Auth { return this; }
	public anonymousRead(): Auth { return this; }
	public anonymousWrite(): Auth { return this; }
	public anonymousCreate(): Auth { return this; }
	public anonymousUpdate(): Auth { return this; }
	public anonymousDelete(): Auth { return this; }

	public authenticated(): Auth { return this; }
	public authenticatedQuery(): Auth { return this; }
	public authenticatedFetch(): Auth { return this; }
	public authenticatedRead(): Auth { return this; }
	public authenticatedWrite(): Auth { return this; }
	public authenticatedCreate(): Auth { return this; }
	public authenticatedUpdate(): Auth { return this; }
	public authenticatedDelete(): Auth { return this; }

	public group(group: string): Auth { return this; }
	public groupQuery(group: string): Auth { return this; }
	public groupFetch(group: string): Auth { return this; }
	public groupRead(group: string): Auth { return this; }
	public groupWrite(group: string): Auth { return this; }
	public groupCreate(group: string): Auth { return this; }
	public groupUpdate(group: string): Auth { return this; }
	public groupDelete(group: string): Auth { return this; }

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

	public static init(): Auth { return new Auth(); }
}

class Collection<T = any> {
	private constructor() {}

	public property<P>(name: string, type: OType<P>, defaultValue?: P): Collection<T> { return this; }
	public string(name: string, required: boolean = false, defaultValue: string = ""): Collection<T> { return this; }
	public number(name: string, required: boolean = false, defaultValue: number = 0): Collection<T> { return this; }
	public boolean(name: string, required: boolean = false, defaultValue: boolean = false): Collection<T> { return this; }
	public list<P>(name: string, ...types: OType<P>[]): Collection<T> { return this; }
	public object<P>(name: string, type: OObjectTypeDefinition<P>): Collection<T> { return this; }

	public auth(auth: Auth): Collection<T> { return this; }

	public beforeCreate(handler: (doc: T, req: Req) => void): Collection<T> { return this; }
	public afterCreate(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }
	public beforeUpdate(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }
	public afterUpdate(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }
	public beforeDelete(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }
	public afterDelete(handler: (doc: T, meta: Meta, req: Req) => void): Collection<T> { return this; }

	public static init<T = any>(value: string): Collection<T> {return new Collection<T>(); }
}

class CloudFunction<P, R> {
	private constructor() {}
	public handler(handler: (param: P, meta: Meta) => Promise<R>): CloudFunction<P, R> { return this; }
	public static init<P, R>(name: string, paramType: OType<P>, returnType: OType<R>): CloudFunction<P, R> { return new CloudFunction(); }
}

class Group {
	private constructor() {}
	public joinByDefault(): Group { return this; }
	public static init(name: string): Group { return new Group(); }
}

CopperServer
	.init(3000)
	.database("localhost", 27017, "CopperTest")
	.enableAnonymousSession()
	.defaultAuth(
		Auth
			.init()
			.group("admin")
	)
	.dataStore(
		DataStore
			.init("/tmp")
			.auth(
				Auth
					.init()
					.group("admin")
			)
			.limit(10_000_000)
			.beforeSave()
			.afterSave()
			.beforeFetch()
			.afterFetch()
			.beforeDelete()
			.afterDelete()
	)
	.cloudFunction(
		CloudFunction
			.init("email", OStandardType.string, OStandardType.string)
			.handler(async (p, m) => {
				return "";
			})
	)
	.groups(
		Group
			.init("admin"),
		Group
			.init("normal")
			.joinByDefault()
	)
	.collection(
		Collection
			.init<string>("User")
			.string("firstName")
			.string("lastName")
			.string("email", true)
			.number("age")
			.boolean("isAdmin", false, false)
			.list("favoriteBooks", OStandardType.string)
			.object("options", {
				darkMode: OStandardType.boolean,
				timeout: OStandardType.number
			})
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
					.authenticatedCreate()
					.group("admin")
					.owner()
			)
	)
	.collection(
		Collection
			.init<string>("Message")
			.string("fromId", true)
			.string("content", true)
			.list("to", OStandardType.string)
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


export class Object {

	public constructor(collection: string, owner: User) {

	}

	public get(): void {}
	public set(): void {}
	public setAuth(auth: Auth): void {}
	public increment(key: string, value: number): void {}
	public decrement(key: string, value: number): void {}
	public addTo(key: string, value: number): void {}
	public removeFrom(key: string, value: number): void {}

	public save(): void {}
	public delete(): void {}

}

class Copper {

	private constructor() {
	}

	public auth(user: User): void {}

	public object(collection: string): Object {
		throw "";
	}

	public async signUp(email: string, password: string): Promise<User> { return new User(); }
	public async signIn(email: string, password: string): Promise<User> { return new User(); }
	public async token(token: string): Promise<User> { return new User(); }
	public async anonymous(): Promise<AnonymousUser> { return new AnonymousUser(); }

	public static async init(host: string, port: number): Promise<Copper> {
		return new Copper();
	}
}

class File {

	public constructor(data: Buffer) {

	}

	public data(): Buffer { return Buffer.alloc(0); }
	public getId(): string { return ""; }
	public getOwnerId(): string { return ""; }
	public getSize(): number { return 0; }

	public async upload(): Promise<void> {}

	public static async fetch(id: string): Promise<File> { return new File(Buffer.alloc(0)); }
}

export class User {

	private salt: string = "";
	private password: string = "";

	public token(): string { return ""; }
	public id(): string { return ""; }
	public async delete(password: string): Promise<void> {}
	public async logout(): Promise<void> {}
	public async encrypt(data: string): Promise<string> { return ""; }
	public async decrypt(data: string): Promise<string> { return ""; }

	public static async signUp(email: string, password: string): Promise<User> { return new User(); }
	public static async signIn(email: string, password: string): Promise<User> { return new User(); }
	public static async token(token: string): Promise<User> { return new User(); }
}

export class AnonymousUser extends User {

	public constructor() {
		super();
	}

	public async delete(): Promise<void> {
		await super.delete("");
	}

	public static async anonymous(): Promise<AnonymousUser> { return new AnonymousUser(); }

}

const api = await Copper.init("localhost", 3000);
const u = await api.signIn("efwewf", "wef");


const book = api.object("Book");
book.set();
