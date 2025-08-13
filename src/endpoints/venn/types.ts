export type Content = any;

export type Sqon = {
  op: string;
  content: Content;
  [key: string]: any;
};

export type VennOutput = {
  operation: string;
  count: number;
  sqon: Sqon;
};

export type VennEntityOutput = {
  operation: string;
  entityCount: number;
  entitySqon: Sqon;
};

export type VennOutputReformattedElement = VennEntityOutput & {
  setId?: string;
};

export type VennOutputReformatted = {
  summary: (VennOutputReformattedElement & { qbSqon: Sqon })[];
  operations: VennOutputReformattedElement[];
};
