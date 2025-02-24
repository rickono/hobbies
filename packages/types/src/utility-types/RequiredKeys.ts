export type RequiredKeys<
  T extends object,
  RequiredKeys extends keyof T = never,
> = Required<Pick<T, RequiredKeys>> & Partial<Omit<T, RequiredKeys>>;
