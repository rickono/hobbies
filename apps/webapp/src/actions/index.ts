"use server";

import { query } from "@rono/db-legacy";

export type QueryObject = typeof query;

/**
 * Recursively extracts all valid method paths from the query object.
 * Example output:
 *   "coffee.roaster.getAll"
 *   "coffee.process.get"
 */
export type ExtractQueryPaths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends (...args: any) => any
    ? `${Prefix}${K}` // If it's a function, return the full path
    : T[K] extends object
      ? ExtractQueryPaths<T[K], `${Prefix}${K}.`> // If it's an object, recurse
      : never;
}[keyof T & string];

/** Valid method paths inferred from `query` */
export type ValidQueryPaths = ExtractQueryPaths<QueryObject>;

/**
 * Given a dot-separated string (e.g., "coffee.roaster.getAll"),
 * this type extracts the actual function type from the query object.
 */
export type QueryFunction<
  T,
  Path extends string,
> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? QueryFunction<T[Key], Rest> // ✅ Correctly pass down the type
    : never
  : Path extends keyof T
    ? T[Path] extends (...args: infer Args) => infer Ret
      ? (...args: Args) => Promise<Awaited<Ret>> // ✅ Preserve async return
      : never
    : never;

/** Main function to dynamically call queries with type safety */
export async function clientQuery<TPath extends ValidQueryPaths>(
  path: TPath,
  ...args: Parameters<QueryFunction<QueryObject, TPath>> // ✅ Now resolves correctly
): Promise<Awaited<ReturnType<QueryFunction<QueryObject, TPath>>>> {
  // Convert "coffee.roaster.getAll" into ["coffee", "roaster", "getAll"]
  const parts = path.split(".");

  // Traverse the `query` object dynamically
  let method: any = query;
  for (const part of parts) {
    if (!method[part]) throw new Error(`Invalid query path: ${path}`);
    method = method[part];
  }

  // Ensure the resolved method is a function
  if (typeof method !== "function") {
    throw new Error(`Invalid query function: ${path}`);
  }

  return method(...args);
}
