declare const producerIdBrand: unique symbol;
export type ProducerId = number & {
  [producerIdBrand]: "ProducerId";
};

export function ProducerId(id: number): ProducerId {
  return id as ProducerId;
}

ProducerId.NULL = ProducerId(0);
