export type BaseType =
  | number
  | string
  | symbol
  | bigint
  | boolean
  | Date
  | Set<any>
  | Map<any, any>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends BaseType ? T[P] : DeepPartial<T[P]>;
};
