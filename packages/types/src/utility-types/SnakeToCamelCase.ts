// export type FirstCharacterAndRest<T extends string> = T extends `${infer First}${infer Rest}` ? [First, Rest] : [never, never];
// export type SnakeToCamelCase<T extends string> = T extends '' ? '' : ;

export type SnakeToCamelCase<T extends string> =
  T extends `${infer First}_${infer Next}${infer Rest}`
    ? `${First}${Uppercase<Next>}${SnakeToCamelCase<Rest>}`
    : T;

export type SnakeToCamelCaseKeys<T extends object> = {
  [K in keyof T as K extends string ? SnakeToCamelCase<K> : K]: T[K];
};
