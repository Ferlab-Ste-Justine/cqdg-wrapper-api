import { NextFunction, Request, Response } from 'express';
import NodeCache from 'node-cache';

export const STATISTICS_CACHE_ID = 'statistics';

export const verifyCache =
  (cacheId: string, cache: NodeCache) => (_req: Request, res: Response, next: NextFunction) => {
    try {
      if (cache.has(cacheId)) {
        return res.status(200).json(cache.get(cacheId));
      }
      next();
    } catch (err) {
      throw new Error('[verifyCache]', err);
    }
  };
