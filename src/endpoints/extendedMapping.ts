import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getExtendedMappingByIndex } from '#src/utils';

export const getExtendedMapping = async (req: Request, res: Response) => {
  const graphqlIndex = req.params.index;
  const extendedMapping = getExtendedMappingByIndex(graphqlIndex);

  return res.status(StatusCodes.OK).send({
    extendedMapping,
  });
};
