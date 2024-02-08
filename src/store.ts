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

export function Restrict(permission?: Permission): any {
  return function (target: any, key: string | symbol) {
    const isReadable = permission === "r" || permission === "rw";
    const isWritable = permission === "w" || permission === "rw";

    let value = target[key];
    Object.defineProperty(target, key, {
      enumerable: isReadable,
      configurable: isWritable,
      get: () => {
        if (isReadable) {
          return value;
        }
        throw new Error();
      },
      set: (newValue: any) => {
        value = newValue;
      },
    });
  };
}

export class Store implements IStore {
  defaultPolicy: Permission = "rw";

  allowedToRead(key: string): boolean {
    return (
      Object.getOwnPropertyDescriptor(this, key)?.enumerable ||
      this.defaultPolicy === "r" ||
      this.defaultPolicy === "rw"
    );
  }

  allowedToWrite(key: string): boolean {
    return (
      Object.getOwnPropertyDescriptor(this, key)?.configurable ||
      this.defaultPolicy === "w" ||
      this.defaultPolicy === "rw"
    );
  }

  read(path: string): StoreResult {
    if (this.allowedToRead(path)) {
      return "Jhone Known";
    }
    throw new Error();
  }

  write(path: string, value: StoreValue): StoreValue {
    if (this.allowedToWrite(path)) {
      return {};
    }
    throw new Error();
  }

  writeEntries(entries: JSONObject): void {
    throw new Error("Method not implemented.");
  }

  entries(): JSONObject {
    throw new Error("Method not implemented.");
  }
}
