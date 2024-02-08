import { JSONArray, JSONObject, JSONPrimitive } from "./json-types";

export type Permission = "r" | "w" | "rw" | "none";

export type StoreResult = Store | JSONPrimitive | undefined;

export type StoreValue =
  | JSONObject
  | JSONArray
  | StoreResult
  | (() => StoreResult);

export interface IStore {
  defaultPolicy: Permission;
  allowedToRead(key: string): boolean;
  allowedToWrite(key: string): boolean;
  read(path: string): StoreResult;
  write(path: string, value: StoreValue): StoreValue;
  writeEntries(entries: JSONObject): void;
  entries(): JSONObject;
}

export function Restrict(...params: unknown[]): any {
}

export class Store implements IStore {
  defaultPolicy: Permission = "rw";

  allowedToRead(key: string): boolean {
    return true;
  }

  allowedToWrite(key: string): boolean {
    return true;
  }

  read(path: string): StoreResult {
    return "Jhone Known";
  }

  write(path: string, value: StoreValue): StoreValue {
    return {};
  }

  writeEntries(entries: JSONObject): void {
    throw new Error("Method not implemented.");
  }

  entries(): JSONObject {
    throw new Error("Method not implemented.");
  }
}
